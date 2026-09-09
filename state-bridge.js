(function installStateBridge() {
  "use strict";

  const channel = "youtube-share-link-cleaner";
  const settingKey = "enabled";

  function announceState(enabled) {
    window.postMessage(
      {
        channel,
        type: "STATE_CHANGED",
        enabled
      },
      window.location.origin
    );
  }

  async function publishStoredState() {
    try {
      const settings = await chrome.storage.local.get({ [settingKey]: true });
      announceState(settings[settingKey] !== false);
    } catch (error) {
      console.error("[YouTube Share Link Cleaner] 설정을 읽지 못했습니다.", error);
      announceState(true);
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
    if (areaName !== "local" || !(settingKey in changes)) {
      return;
    }

    announceState(changes[settingKey].newValue !== false);
  });

  void publishStoredState();
})();
