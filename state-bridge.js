(function installStateBridge() {
  "use strict";

  const channel = "youtube-share-link-cleaner";
  const settingsDefaults = { enabled: true, shortenShorts: false };

  function announceState(settings) {
    window.postMessage(
      {
        channel,
        type: "STATE_CHANGED",
        enabled: settings.enabled !== false,
        shortenShorts: settings.shortenShorts === true
      },
      window.location.origin
    );
  }

  async function publishStoredState() {
    try {
      const settings = await chrome.storage.local.get(settingsDefaults);
      announceState(settings);
    } catch (error) {
      console.error("[YouTube Share Link Cleaner] 설정을 읽지 못했습니다.", error);
      announceState(settingsDefaults);
    }
  }

  window.addEventListener("message", (event) => {
    if (
      event.source !== window ||
      event.origin !== window.location.origin ||
      event.data?.channel !== channel ||
      event.data?.type !== "REQUEST_STATE"
    ) {
      return;
    }

    void publishStoredState();
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (
      areaName !== "local" ||
      (!("enabled" in changes) && !("shortenShorts" in changes))
    ) {
      return;
    }

    void publishStoredState();
  });

  void publishStoredState();
})();
