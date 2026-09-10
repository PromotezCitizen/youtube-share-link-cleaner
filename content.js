(function installYouTubeShareCleaner() {
  "use strict";

  const { sanitizeYouTubeUrl, shortenShortsYouTubeUrl } = globalThis.__YOUTUBE_SHARE_SI_REMOVER__;
  const stateChannel = "youtube-share-link-cleaner";
  const textFieldSelector = "input, textarea";
  const originalFieldValues = new WeakMap();

  let isEnabled = false;
  let shouldShortenShorts = false;
  let fullScanFrame = 0;
  let nodeScanFrame = 0;
  const queuedNodes = new Set();

  function setFieldValue(field, value) {
    const prototype =
      field instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

    if (descriptor?.set) {
      descriptor.set.call(field, value);
    } else {
      field.value = value;
    }
  }

  function cleanShareUrl(value) {
    const withoutSi = sanitizeYouTubeUrl(value);
    return shouldShortenShorts ? shortenShortsYouTubeUrl(withoutSi) : withoutSi;
  }

  function cleanField(field) {
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
      return;
    }

    const cleanedValue = cleanShareUrl(field.value);
    if (cleanedValue !== field.value) {
      originalFieldValues.set(field, field.value);
      setFieldValue(field, cleanedValue);
    }
  }

  function cleanFieldsInside(node) {
    if (!(node instanceof Element)) {
      return;
    }

    if (node.matches(textFieldSelector)) {
      cleanField(node);
    }

    for (const field of node.querySelectorAll(textFieldSelector)) {
      cleanField(field);
    }
  }

  function cleanAllFields() {
    for (const field of document.querySelectorAll(textFieldSelector)) {
      cleanField(field);
    }
  }

  function restoreAllFields() {
    for (const field of document.querySelectorAll(textFieldSelector)) {
      const originalValue = originalFieldValues.get(field);

      if (originalValue !== undefined) {
        setFieldValue(field, originalValue);
        originalFieldValues.delete(field);
      }
    }
  }

  function requestFullScan() {
    if (!isEnabled || fullScanFrame) {
      return;
    }

    fullScanFrame = window.requestAnimationFrame(() => {
      fullScanFrame = 0;

      if (isEnabled) {
        cleanAllFields();
      }
    });
  }

  function scheduleFieldCleaning() {
    requestFullScan();

    for (const delay of [50, 200, 500]) {
      window.setTimeout(requestFullScan, delay);
    }
  }

  function queueNodeScan(node) {
    if (!isEnabled || !(node instanceof Element)) {
      return;
    }

    queuedNodes.add(node);

    if (nodeScanFrame) {
      return;
    }

    nodeScanFrame = window.requestAnimationFrame(() => {
      nodeScanFrame = 0;

      for (const queuedNode of queuedNodes) {
        cleanFieldsInside(queuedNode);
      }

      queuedNodes.clear();
    });
  }

  function getSelectedText() {
    const activeElement = document.activeElement;

    if (
      (activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement) &&
      activeElement.selectionStart !== null &&
      activeElement.selectionEnd !== null
    ) {
      return activeElement.value.slice(
        activeElement.selectionStart,
        activeElement.selectionEnd
      );
    }

    return document.getSelection()?.toString() ?? "";
  }

  function patchClipboardWriteText() {
    const clipboardPrototype = globalThis.Clipboard?.prototype;
    const originalWriteText = clipboardPrototype?.writeText;

    if (typeof originalWriteText !== "function") {
      return;
    }

    try {
      Object.defineProperty(clipboardPrototype, "writeText", {
        configurable: true,
        writable: true,
        value(text) {
          const value = isEnabled ? cleanShareUrl(text) : text;
          return originalWriteText.call(this, value);
        }
      });
    } catch {
      // The copy-event and input fallbacks below still cover legacy copy flows.
    }
  }

  patchClipboardWriteText();

  document.addEventListener(
    "copy",
    (event) => {
      if (!isEnabled || !event.clipboardData) {
        return;
      }

      const selectedText = getSelectedText();
      const cleanedText = cleanShareUrl(selectedText);

      if (cleanedText === selectedText) {
        return;
      }

      event.preventDefault();
      event.clipboardData.setData("text/plain", cleanedText);
    },
    true
  );

  document.addEventListener("click", scheduleFieldCleaning, true);

  window.addEventListener("message", (event) => {
    if (
      event.source !== window ||
      event.origin !== window.location.origin ||
      event.data?.channel !== stateChannel ||
      event.data?.type !== "STATE_CHANGED"
    ) {
      return;
    }

    const nextEnabledState = event.data.enabled === true;
    isEnabled = nextEnabledState;
    shouldShortenShorts = isEnabled && event.data.shortenShorts === true;

    if (isEnabled) {
      requestFullScan();
    } else {
      if (fullScanFrame) {
        window.cancelAnimationFrame(fullScanFrame);
        fullScanFrame = 0;
      }

      if (nodeScanFrame) {
        window.cancelAnimationFrame(nodeScanFrame);
        nodeScanFrame = 0;
      }

      queuedNodes.clear();
      restoreAllFields();
    }
  });

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "attributes") {
        queueNodeScan(record.target);
        continue;
      }

      for (const addedNode of record.addedNodes) {
        queueNodeScan(addedNode);
      }
    }
  });

  observer.observe(document, {
    attributes: true,
    attributeFilter: ["value"],
    childList: true,
    subtree: true
  });

  window.postMessage(
    {
      channel: stateChannel,
      type: "REQUEST_STATE"
    },
    window.location.origin
  );
})();
