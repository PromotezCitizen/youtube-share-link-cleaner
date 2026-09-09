(function installPageCopyButton() {
  "use strict";

  const { shortenCopiedYouTubeUrl } = globalThis.__YOUTUBE_SHARE_SI_REMOVER__;
  const hostId = "youtube-share-link-cleaner-page-button";
  let updateFrame = 0;

  function isKorean() {
    return document.documentElement.lang.toLowerCase().startsWith("ko");
  }

  function copyLabel() {
    return isKorean() ? "정리해 복사" : "Copy clean link";
  }

  function shortsCopyLabel() {
    return isKorean() ? "복사" : "Copy";
  }

  function copiedLabel() {
    return isKorean() ? "복사됨" : "Copied";
  }

  function failedLabel() {
    return isKorean() ? "다시 시도" : "Try again";
  }

  function getPageKind() {
    const url = new URL(window.location.href);

    if (url.pathname === "/watch" && url.searchParams.has("v")) {
      return "watch";
    }

    if (/^\/shorts\/[^/]+\/?$/.test(url.pathname)) {
      return "shorts";
    }

    return null;
  }

  function createButtonHost(pageKind) {
    const host = document.createElement("span");
    host.id = hostId;
    host.dataset.pageKind = pageKind;

    const shadow = host.attachShadow({ mode: "closed" });
    const style = document.createElement("style");
    style.textContent = `
      :host { display: inline-flex; margin-inline-start: 12px; }
      button {
        display: inline-flex;
        min-block-size: 36px;
        align-items: center;
        gap: 7px;
        padding: 0 14px;
        border: 0;
        border-radius: 18px;
        background: #f2f2f2;
        color: #0f0f0f;
        cursor: pointer;
        font: 500 14px / 20px Roboto, Arial, sans-serif;
        white-space: nowrap;
      }
      button:hover { background: #e5e5e5; }
      button:focus-visible { outline: 3px solid #065fd4; outline-offset: 2px; }
      button:disabled { cursor: default; opacity: 0.72; }
      svg { inline-size: 18px; block-size: 18px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2; }
      @media (prefers-color-scheme: dark) {
        button { background: #272727; color: #f1f1f1; }
        button:hover { background: #3f3f3f; }
      }
      @media (prefers-reduced-motion: reduce) { button { transition: none; } }
      :host([data-page-kind="shorts"]) { margin: 8px 0 0; }
      :host([data-page-kind="shorts"]) button {
        inline-size: 52px;
        min-block-size: auto;
        flex-direction: column;
        gap: 4px;
        padding: 4px 0;
        background: transparent;
        color: inherit;
        font-size: 12px;
      }
      :host([data-page-kind="shorts"]) button:hover { background: transparent; }
      :host([data-page-kind="shorts"]) svg {
        box-sizing: content-box;
        padding: 10px;
        border-radius: 50%;
        background: #f2f2f2;
      }
      :host([data-page-kind="shorts"]) button:hover svg { background: #e5e5e5; }
      @media (prefers-color-scheme: dark) {
        :host([data-page-kind="shorts"]) svg { background: #272727; }
        :host([data-page-kind="shorts"]) button:hover svg { background: #3f3f3f; }
      }
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
    label.textContent = pageKind === "shorts" ? shortsCopyLabel() : copyLabel();
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
          label.textContent = pageKind === "shorts" ? shortsCopyLabel() : copyLabel();
        }, 1400);
      }
    });

    shadow.append(style, button);
    return host;
  }

  function updateButton() {
    const pageKind = getPageKind();

    if (!pageKind) {
      document.getElementById(hostId)?.remove();
      return;
    }

    const actionBar =
      pageKind === "watch"
        ? document.querySelector("#top-level-buttons-computed")
        : document.querySelector("ytd-reel-player-overlay-renderer #actions");
    if (!actionBar || document.getElementById(hostId)) {
      return;
    }

    actionBar.append(createButtonHost(pageKind));
  }

  function scheduleUpdate() {
    if (updateFrame) {
      return;
    }

    updateFrame = window.requestAnimationFrame(() => {
      updateFrame = 0;
      updateButton();
    });
  }

  document.addEventListener("yt-navigate-finish", scheduleUpdate);
  window.addEventListener("popstate", scheduleUpdate);

  new MutationObserver(scheduleUpdate).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  scheduleUpdate();
})();
