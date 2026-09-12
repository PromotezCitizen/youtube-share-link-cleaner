(function installPopup() {
  "use strict";

  function getMessage(key, fallback) {
    return chrome.i18n.getMessage(key) || fallback;
  }

  function localizeDocument() {
    document.documentElement.lang = chrome.i18n.getUILanguage() || "en";

    for (const element of document.querySelectorAll("[data-i18n]")) {
      const message = chrome.i18n.getMessage(element.dataset.i18n);
      if (message) {
        element.textContent = message;
      }
    }
  }

  localizeDocument();

  const toggle = document.querySelector("#enabled");
  const status = document.querySelector("#status");
  const shortsToggle = document.querySelector("#shorten-shorts");
  const shortsStatus = document.querySelector("#shorts-status");
  const errorMessage = document.querySelector("#error");

  function renderState(enabled) {
    errorMessage.hidden = true;
    status.dataset.enabled = String(enabled);
    status.textContent = enabled
      ? getMessage("enabledState", "On")
      : getMessage("disabledState", "Off");
  }

  function renderShortsState(shortenShorts) {
    shortsStatus.dataset.enabled = String(shortenShorts);
    shortsStatus.textContent = shortenShorts
      ? getMessage("enabledState", "On")
      : getMessage("disabledState", "Off");
  }

  function renderError(key, fallback) {
    errorMessage.textContent = getMessage(key, fallback);
    errorMessage.hidden = false;
  }

  async function loadState() {
    try {
      const { enabled = true, shortenShorts = false } = await chrome.storage.local.get({
        enabled: true,
        shortenShorts: false
      });
      toggle.checked = enabled;
      shortsToggle.checked = shortenShorts;
      renderState(enabled);
      renderShortsState(shortenShorts);
    } catch (error) {
      console.error("Unable to load the extension setting.", error);
      renderError("loadError", "Could not load the setting.");
    } finally {
      toggle.disabled = false;
      shortsToggle.disabled = false;
    }
  }

  toggle.addEventListener("change", async () => {
    const nextValue = toggle.checked;
    const previousValue = !nextValue;
    toggle.disabled = true;

    try {
      await chrome.storage.local.set({ enabled: nextValue });
      renderState(nextValue);
    } catch (error) {
      console.error("Unable to save the extension setting.", error);
      toggle.checked = previousValue;
      renderState(previousValue);
      renderError("saveError", "Could not save the setting. Try again.");
    } finally {
      toggle.disabled = false;
    }
  });

  shortsToggle.addEventListener("change", async () => {
    const nextValue = shortsToggle.checked;
    const previousValue = !nextValue;
    shortsToggle.disabled = true;

    try {
      await chrome.storage.local.set({ shortenShorts: nextValue });
      renderShortsState(nextValue);
    } catch (error) {
      console.error("Unable to save the Shorts link setting.", error);
      shortsToggle.checked = previousValue;
      renderShortsState(previousValue);
      renderError("saveError", "Could not save the setting. Try again.");
    } finally {
      shortsToggle.disabled = false;
    }
  });

  void loadState();
})();
