(function installSanitizer(root) {
  "use strict";

  function isYouTubeHost(hostname) {
    const normalizedHostname = hostname.toLowerCase();

    return (
      normalizedHostname === "youtu.be" ||
      normalizedHostname === "youtube.com" ||
      normalizedHostname.endsWith(".youtube.com")
    );
  }

  function sanitizeYouTubeUrl(value) {
    if (typeof value !== "string") {
      return value;
    }

    const whitespaceMatch = value.match(/^(\s*)(\S+)(\s*)$/);
    if (!whitespaceMatch) {
      return value;
    }

    const [, leadingWhitespace, candidate, trailingWhitespace] = whitespaceMatch;

    let url;
    try {
      url = new URL(candidate);
    } catch {
      return value;
    }

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      !isYouTubeHost(url.hostname) ||
      !url.searchParams.has("si")
    ) {
      return value;
    }

    url.searchParams.delete("si");
    return `${leadingWhitespace}${url.toString()}${trailingWhitespace}`;
  }

  function shortenDirectYouTubeUrl(value) {
    if (typeof value !== "string") {
      return value;
    }

    const whitespaceMatch = value.match(/^(\s*)(\S+)(\s*)$/);
    if (!whitespaceMatch) {
      return value;
    }

    const [, leadingWhitespace, candidate, trailingWhitespace] = whitespaceMatch;
    let url;

    try {
      url = new URL(candidate);
    } catch {
      return value;
    }

    const directLinkMatch = url.pathname.match(/^\/(?:shorts|live)\/([^/]+)\/?$/);
    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      !isYouTubeHost(url.hostname) ||
      !directLinkMatch
    ) {
      return value;
    }

    url.protocol = "https:";
    url.hostname = "youtu.be";
    url.port = "";
    url.pathname = `/${directLinkMatch[1]}`;
    return `${leadingWhitespace}${url.toString()}${trailingWhitespace}`;
  }

  function shortenCopiedYouTubeUrl(value) {
    if (typeof value !== "string") {
      return value;
    }

    const whitespaceMatch = value.match(/^(\s*)(\S+)(\s*)$/);
    if (!whitespaceMatch) {
      return value;
    }

    const [, leadingWhitespace, candidate, trailingWhitespace] = whitespaceMatch;

    let url;
    try {
      url = new URL(candidate);
    } catch {
      return value;
    }

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      !isYouTubeHost(url.hostname)
    ) {
      return value;
    }

    if (url.pathname === "/watch") {
      const videoId = url.searchParams.get("v");

      if (videoId) {
        url.protocol = "https:";
        url.hostname = "youtu.be";
        url.port = "";
        url.pathname = `/${videoId}`;
        url.searchParams.delete("v");
      }
    } else {
      const directLinkMatch = url.pathname.match(/^\/(?:shorts|live)\/([^/]+)\/?$/);

      if (directLinkMatch) {
        url.protocol = "https:";
        url.hostname = "youtu.be";
        url.port = "";
        url.pathname = `/${directLinkMatch[1]}`;
      }
    }

    url.searchParams.delete("si");
    return `${leadingWhitespace}${url.toString()}${trailingWhitespace}`;
  }

  const api = Object.freeze({
    sanitizeYouTubeUrl,
    shortenDirectYouTubeUrl,
    shortenCopiedYouTubeUrl
  });

  Object.defineProperty(root, "__YOUTUBE_SHARE_SI_REMOVER__", {
    value: api,
    configurable: false,
    enumerable: false,
    writable: false
  });

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
})(globalThis);
