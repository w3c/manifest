#!/usr/bin/env node
/*eslint-env node*/
"use strict";
const { exec } = require("child_process");
const handler = require("serve-handler");
const http = require("http");

function toExecutable(cmd) {
  return {
    get cmd() {
      return cmd;
    },
    run() {
      return new Promise((resolve, reject) => {
        const childProcess = exec(cmd, (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
      });
    },
  };
}

async function validate() {
  const conf = { "public": "../" }
  const server = http.createServer((request, response) =>
    handler(request, response)
  );
  server.listen(5000, () => {});
  const url = `http://localhost:5000/index.html?githubToken=${process.env.AUTHENTICATE}`;
  const cmd = `npx respec2html -e -w --timeout 30 --src ${url} --out /dev/null`;
  const exe = toExecutable(cmd);
  try {
    await exe.run();
  } catch (err) {
    process.exit(1);
  }
  process.exit(0);
}

validate();
