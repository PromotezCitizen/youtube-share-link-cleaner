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
  const errorMessage = document.querySelector("#error");
  const cleanClipboardButton = document.querySelector("#clean-clipboard");
  const copyCurrentPageButton = document.querySelector("#copy-current-page");
  const clipboardResult = document.querySelector("#clipboard-result");

  function renderState(enabled) {
    errorMessage.hidden = true;
    status.dataset.enabled = String(enabled);
    status.textContent = enabled
      ? getMessage("enabledState", "On")
      : getMessage("disabledState", "Off");
  }

  function renderError(key, fallback) {
    errorMessage.textContent = getMessage(key, fallback);
    errorMessage.hidden = false;
  }

  function renderClipboardResult(key, fallback, state) {
    clipboardResult.textContent = getMessage(key, fallback);
    clipboardResult.dataset.state = state;
    clipboardResult.hidden = false;
  }

  async function cleanCopiedLink() {
    cleanClipboardButton.disabled = true;
    clipboardResult.hidden = true;

    try {
      const copiedText = await navigator.clipboard.readText();
      const cleanedText = globalThis.__YOUTUBE_SHARE_SI_REMOVER__.shortenCopiedYouTubeUrl(
        copiedText
      );

      if (!copiedText.trim()) {
        renderClipboardResult("clipboardEmpty", "Copy a YouTube link first.", "error");
        return;
      }

      if (cleanedText === copiedText) {
        renderClipboardResult(
          "clipboardUnsupported",
          "No supported YouTube link found in the clipboard.",
          "error"
        );
        return;
      }

      await navigator.clipboard.writeText(cleanedText);
      renderClipboardResult("clipboardSuccess", "Copied link cleaned.", "success");
    } catch (error) {
      console.error("Unable to clean the copied link.", error);
      renderClipboardResult(
        "clipboardError",
        "Could not access the clipboard. Allow clipboard access and try again.",
        "error"
      );
    } finally {
      cleanClipboardButton.disabled = false;
    }
  }

  async function copyCurrentPageLink() {
    copyCurrentPageButton.disabled = true;
    clipboardResult.hidden = true;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab?.url || !globalThis.__YOUTUBE_SHARE_SI_REMOVER__.isYouTubeUrl(tab.url)) {
        renderClipboardResult(
          "currentPageUnsupported",
          "Open a YouTube page to copy its link.",
          "error"
        );
        return;
      }

      const cleanedUrl = globalThis.__YOUTUBE_SHARE_SI_REMOVER__.shortenCopiedYouTubeUrl(
        tab.url
      );
      await navigator.clipboard.writeText(cleanedUrl);
      renderClipboardResult("currentPageSuccess", "Current page link copied.", "success");
    } catch (error) {
      console.error("Unable to copy the current page link.", error);
      renderClipboardResult(
        "currentPageError",
        "Could not access the current page. Try again.",
        "error"
      );
    } finally {
      copyCurrentPageButton.disabled = false;
    }
  }

  async function loadState() {
    try {
      const { enabled = true } = await chrome.storage.local.get({ enabled: true });
      toggle.checked = enabled;
      renderState(enabled);
    } catch (error) {
      console.error("Unable to load the extension setting.", error);
      renderError("loadError", "Could not load the setting.");
    } finally {
      toggle.disabled = false;
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

  cleanClipboardButton.addEventListener("click", () => {
    void cleanCopiedLink();
  });

  copyCurrentPageButton.addEventListener("click", () => {
    void copyCurrentPageLink();
  });

  void loadState();
})();
