#!/usr/bin/env node
/*eslint-env node*/
"use strict";
const { exec } = require("child_process");
const handler = require("serve-handler");
const http = require("http");

/**
 *
 * @param {string} cmd A string representing a shell command.
 */
class ShellCommand {
  constructor(cmd) {
    this._cmd = cmd;
  }
  get cmd() {
    return this._cmd;
  }
  run() {
    return new Promise((resolve, reject) => {
      const childProcess = exec(this.cmd, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
      childProcess.stdout.pipe(process.stdout);
      childProcess.stderr.pipe(process.stderr);
    });
  }
}

/**
 * Spins up a local HTTP server and checks the spec.
 * If there are any errors or warnings, the app exits with 1.
 */
async function validate() {
  const server = http.createServer((request, response) =>
    handler(request, response)
  );
  server.listen(5000, () => {});
  const url = `http://localhost:5000/index.html?githubToken=${
    // This "AUTHENTICATE" is a GitHub token https://github.com/settings/tokens
    // It needs to be set set on TravisCI itself, via the in the settings
    // or using Travis' encrypt.
    process.env.AUTHENTICATE
  }`;
  // -e is stop on errors, -w is stop on warnings
  const cmd = `npx respec2html -e -w --timeout 30 --src ${url} --out /dev/null`;
  try {
    await new ShellCommand(cmd).run();
  } catch (err) {
    process.exit(1);
  }
  process.exit(0);
}

validate();
