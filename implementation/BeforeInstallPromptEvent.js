/*globals BeforeInstallPromptEvent, DOMException*/
"use strict";
const internalSlots = new WeakMap();
const installProcesses = [];
const AppBannerPromptOutcome = new Set([
  "accepted",
  "dismissed",
]);

class BeforeInstallPromptEvent extends Event {
  constructor(typeArg, eventInit) {
    // WebIDL Guard. Wont be in spec in spec as it's all handled by WebIDL.
    if (arguments.length === 0) {
      throw new TypeError("Not enough arguments. Expected at least 1.");
    }
    const initType = typeof eventInit;
    if (arguments.length === 2 && initType !== "undefined" && initType !== "object") {
      throw new TypeError("Value can't be converted to a dictionary.");
    }
    super(typeArg, Object.assign({ cancelable: true }, eventInit));

    if (eventInit && typeof eventInit.userChoice !== "undefined" && !AppBannerPromptOutcome.has(String(eventInit.userChoice))) {
      const msg = `The provided value '${eventInit.userChoice}' is not a valid` +
        "enum value of type AppBannerPromptOutcome.";
      throw new TypeError(msg);
    }
    // End WebIDL guard.
    const internal = {
      didPrompt: false,
    };

    internal.userChoice = new Promise((resolve) => {
      internal.userChoiceHandlers = {
        resolve,
      };
      if (eventInit && "userChoice" in eventInit) {
        resolve(eventInit.userChoice);
      }
    });
    internalSlots.set(this, internal);
  }
  prompt() {
    if (internalSlots.get(this).didPrompt) {
      const msg = ".prompt() can only be called once.";
      throw new DOMException(msg, "InvalidStateError");
    } else {
      internalSlots.get(this).didPrompt = true;
    }

    if (this.isTrusted === false) {
      const msg = "Untrusted events can't call prompt().";
      throw new DOMException(msg, "NotAllowedError");
    }

    if (this.defaultPrevented === false) {
      const msg = ".prompt() needs to be called after .preventDefault()";
      throw new DOMException(msg, "InvalidStateError");
    }

    (async function task() {
      const promptOutcome = await showInstallPrompt();
      internalSlots.get(this).userChoiceHandlers.resolve(promptOutcome);
    }.bind(this)())
  }

  get userChoice() {
    return internalSlots.get(this).userChoice;
  }
}

async function notifyBeforeInstallPrompt(element) {
  await trackReadyState();
  if (installProcesses.length) {
    return;
  }
  const event = new BeforeInstallPromptEvent("beforeinstallprompt");
  window.dispatchEvent(event);
  if (!event.defaultPrevented) {
    await showInstallPrompt(element);
  }
}

function trackReadyState() {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      return resolve();
    }
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        resolve();
      }
    });
  });
}

window.addEventListener("beforeinstallprompt", async function(event) {
  event.preventDefault();
  // Emulate blocking tasks
  await new Promise((res) => setTimeout(res, 1000));
  try {
    event.prompt();
  } catch (err) {
    console.error(err);
  }
  console.info(`user selected: ${await event.userChoice}`);
});

async function showInstallPrompt(button) {
  if (button) {
    button.disabled = true;
  }
  await Promise.all(installProcesses);
  const prompt = document.createElement("fieldset");
  prompt.id = "installprompt";
  prompt.innerHTML = `
    <h2>Add to Home screen</h2>
    <p>... the foo app ...</p>
    <button id="cancel">CANCEL</button>
    <button id="add">ADD</button>
  `;
  const cancel = prompt.querySelector("#cancel");
  const add = prompt.querySelector("#add");
  document.body.appendChild(prompt);
  const p = new Promise((resolve) => {
    add.addEventListener("click", () => {
      resolve("accepted");
      //emulate installation to home screen
      setTimeout(()=>{
        window.dispatchEvent(new Event("install"));
      }, 1000);
    });
    cancel.addEventListener("click", () => resolve("dismissed"));
  });
  cancel.onclick = add.onclick = function() {
    document.body.removeChild(prompt);
    installProcesses.splice(installProcesses.findIndex(item => item === p), 1);
    if (button) {
      button.disabled = false;
    }
  };
  installProcesses.push(p);
  return p;
}
