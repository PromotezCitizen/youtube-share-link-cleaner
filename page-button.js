(function installPageCopyButton() {
  "use strict";

  const { shortenCopiedYouTubeUrl } = globalThis.__YOUTUBE_SHARE_SI_REMOVER__;
  const hostId = "youtube-share-link-cleaner-page-button";
  let updateFrame = 0;

  function isKorean() { return document.documentElement.lang.toLowerCase().startsWith("ko"); }
  function copyLabel() { return isKorean() ? "정리해 복사" : "Copy clean link"; }
  function copiedLabel() { return isKorean() ? "복사됨" : "Copied"; }
  function failedLabel() { return isKorean() ? "다시 시도" : "Try again"; }

  function isWatchPage() {
    const url = new URL(window.location.href);
    return url.pathname === "/watch" && url.searchParams.has("v");
  }

  function isVisible(element) {
    if (typeof element.checkVisibility === "function") {
      return element.checkVisibility({ visibilityProperty: true });
    }

    return element.getClientRects().length > 0;
  }

  function getShareAction(root = document) {
    const localizedShareLabel = isKorean() ? "공유" : "Share";

    for (const button of root.querySelectorAll("button")) {
      const label = button.getAttribute("aria-label")?.trim();
      const text = button.textContent?.trim();

      if ((label === localizedShareLabel || text === localizedShareLabel) && isVisible(button)) {
        return button.closest("ytd-button-renderer") ?? button;
      }
    }

    return null;
  }

  function getActionBar() {
    const shareAction = getShareAction();
    return {
      actionBar: shareAction?.parentElement ?? null,
      shareAction
    };
  }

  function removeButton() {
    document.getElementById(hostId)?.remove();
  }

  function createButtonHost() {
    const host = document.createElement("span");
    host.id = hostId;
    host.setAttribute("data-language", isKorean() ? "ko" : "en");
    host.style.cssText = "display: inline-flex !important; margin-inline-start: 6px !important;";
    const shadow = host.attachShadow({ mode: "closed" });
    const style = document.createElement("style");
    style.textContent = `
      :host { display: inline-flex; align-items: center; }
      button { display: inline-flex; inline-size: 118px; box-sizing: border-box; min-block-size: 36px; align-items: center; justify-content: center; gap: 7px; padding: 0 14px; border: 0; border-radius: 18px; background: #f2f2f2; color: #0f0f0f; cursor: pointer; font: 500 14px / 20px Roboto, Arial, sans-serif; white-space: nowrap; }
      :host([data-language="en"]) button { inline-size: 152px; }
      button:hover { background: #e5e5e5; }
      button:focus-visible { outline: 3px solid #065fd4; outline-offset: 2px; }
      button:disabled { cursor: default; opacity: .72; }
      svg { inline-size: 18px; block-size: 18px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2; }
      @media (prefers-color-scheme: dark) { button { background: #272727; color: #f1f1f1; } button:hover { background: #3f3f3f; } }
      @media (prefers-reduced-motion: reduce) { button { transition: none; } }
    `;

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", copyLabel());
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("viewBox", "0 0 24 24");
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    iconPath.setAttribute("d", "M8 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2M14 4h6v6M20 4l-9 9");
    icon.append(iconPath);
    const label = document.createElement("span");
    label.textContent = copyLabel();
    button.append(icon, label);

    button.addEventListener("click", async () => {
      button.disabled = true;
      try {
        await navigator.clipboard.writeText(shortenCopiedYouTubeUrl(window.location.href));
        label.textContent = copiedLabel();
      } catch (error) {
        console.error("[YouTube Share Link Cleaner] Unable to copy the current link.", error);
        label.textContent = failedLabel();
      } finally {
        window.setTimeout(() => {
          button.disabled = false;
          label.textContent = copyLabel();
        }, 1400);
      }
    });

    shadow.append(style, button);
    return host;
  }

  function updateButton() {
    if (!isWatchPage()) {
      removeButton();
      return;
    }

    const { actionBar, shareAction } = getActionBar();
    if (!actionBar) return;

    const existingHost = document.getElementById(hostId);
    if (existingHost) {
      if (existingHost.parentElement === actionBar) {
        if (shareAction?.parentElement === actionBar && shareAction.nextElementSibling !== existingHost) {
          actionBar.insertBefore(existingHost, shareAction.nextElementSibling);
        }
        return;
      }
      existingHost.remove();
    }

    const host = createButtonHost();

    if (shareAction?.parentElement === actionBar) {
      actionBar.insertBefore(host, shareAction.nextElementSibling);
      return;
    }

    actionBar.append(host);
  }

  function scheduleUpdate() {
    if (updateFrame) return;
    updateFrame = window.requestAnimationFrame(() => {
      updateFrame = 0;
      updateButton();
    });
  }

  function scheduleStabilizedUpdates() {
    scheduleUpdate();

    for (const delay of [100, 500, 1000, 2000]) {
      window.setTimeout(scheduleUpdate, delay);
    }
  }

  document.addEventListener("yt-navigate-finish", scheduleStabilizedUpdates);
  document.addEventListener("yt-navigate-start", removeButton);
  document.addEventListener("yt-page-data-updated", scheduleStabilizedUpdates);
  document.addEventListener("yt-rendererstamper-finished", scheduleStabilizedUpdates);
  window.addEventListener("popstate", scheduleStabilizedUpdates);
  new MutationObserver(scheduleUpdate).observe(document.documentElement, { childList: true, subtree: true });
  scheduleUpdate();
})();
