const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "page-button.js"), "utf8");

class FakeElement {
  constructor(tagName) {
    this.tagName = tagName.toLowerCase();
    this.children = [];
    this.parentElement = null;
    this.attributes = new Map();
    this.textContent = "";
    this.style = { cssText: "" };
    this.visible = true;
  }

  get nextElementSibling() {
    if (!this.parentElement) return null;
    return this.parentElement.children[this.parentElement.children.indexOf(this) + 1] ?? null;
  }

  append(...nodes) {
    for (const node of nodes) {
      node.remove();
      node.parentElement = this;
      this.children.push(node);
    }
  }

  insertBefore(node, reference) {
    node.remove();
    node.parentElement = this;
    const index = reference ? this.children.indexOf(reference) : -1;
    this.children.splice(index < 0 ? this.children.length : index, 0, node);
  }

  remove() {
    if (!this.parentElement) return;
    const siblings = this.parentElement.children;
    siblings.splice(siblings.indexOf(this), 1);
    this.parentElement = null;
  }

  attachShadow() {
    this.shadow = new FakeElement("shadow-root");
    return this.shadow;
  }

  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  addEventListener() {}
  checkVisibility() { return this.visible; }
  getClientRects() { return this.visible ? [{}] : []; }

  querySelectorAll(selector) {
    const matches = [];
    const visit = (node) => {
      for (const child of node.children) {
        if (selector === "button" && child.tagName === "button") matches.push(child);
        visit(child);
      }
    };
    visit(this);
    return matches;
  }

  closest(selector) {
    let node = this;
    while (node) {
      if (node.tagName === selector) return node;
      node = node.parentElement;
    }
    return null;
  }
}

function createPageHarness(language = "ko") {
  const root = new FakeElement("html");
  root.lang = language;
  let actionBar = new FakeElement("div");
  actionBar.id = "top-level-buttons-computed";
  root.append(actionBar);
  const documentListeners = new Map();
  const observers = [];
  const timers = [];
  const document = {
    documentElement: root,
    createElement: (tagName) => new FakeElement(tagName),
    createElementNS: (_namespace, tagName) => new FakeElement(tagName),
    querySelector: (selector) => selector === "#top-level-buttons-computed" ? actionBar : null,
    querySelectorAll: (selector) => root.querySelectorAll(selector),
    getElementById: (id) => {
      const find = (node) => node.id === id ? node : node.children.map(find).find(Boolean);
      return find(root) ?? null;
    },
    addEventListener: (name, listener) => documentListeners.set(name, listener)
  };
  const window = {
    location: { href: "https://www.youtube.com/watch?v=abc123" },
    requestAnimationFrame: (callback) => { callback(); return 0; },
    setTimeout: (callback) => { timers.push(callback); return timers.length; },
    addEventListener() {}
  };
  const context = vm.createContext({
    URL,
    document,
    window,
    navigator: { clipboard: { writeText: async () => {} } },
    MutationObserver: class {
      constructor(callback) { observers.push(callback); }
      observe() {}
    },
    console,
    globalThis: { __YOUTUBE_SHARE_SI_REMOVER__: { shortenCopiedYouTubeUrl: (url) => url } }
  });

  vm.runInContext(source, context);
  return {
    get actionBar() { return actionBar; },
    root,
    documentListeners,
    observers,
    timers,
    window,
    replaceActionBar() {
      actionBar.remove();
      actionBar = new FakeElement("div");
      actionBar.id = "top-level-buttons-computed";
      root.append(actionBar);
      return actionBar;
    }
  };
}

function addShareAction(actionBar) {
  const renderer = new FakeElement("ytd-button-renderer");
  const button = new FakeElement("button");
  button.setAttribute("aria-label", "공유");
  button.textContent = "공유";
  renderer.append(button);
  actionBar.append(renderer);
  return renderer;
}

test("inserts the page button beside Share on a watch page", () => {
  const page = createPageHarness();
  const shareAction = addShareAction(page.actionBar);

  page.observers[0]([{ type: "childList", addedNodes: [shareAction] }]);

  const host = page.actionBar.children[1];
  assert.equal(host.id, "youtube-share-link-cleaner-page-button");
  assert.equal(host.style.cssText.includes("margin-inline-start: 6px !important"), true);
  assert.equal(host.shadow.children[0].textContent.includes("inline-size: 118px"), true);
  assert.equal(host.shadow.children[1].children[1].textContent, "정리해 복사");
});

test("reserves enough fixed width for the English page button", () => {
  const page = createPageHarness("en");
  const shareAction = addShareAction(page.actionBar);
  shareAction.children[0].setAttribute("aria-label", "Share");
  shareAction.children[0].textContent = "Share";

  page.observers[0]([{ type: "childList", addedNodes: [shareAction] }]);

  const host = page.actionBar.children[1];
  assert.equal(host.getAttribute("data-language"), "en");
  assert.equal(host.shadow.children[0].textContent.includes("inline-size: 152px"), true);
  assert.equal(host.shadow.children[1].children[1].textContent, "Copy clean link");
});

test("re-inserts the page button after YouTube re-renders the action bar", () => {
  const page = createPageHarness();
  const shareAction = addShareAction(page.actionBar);
  page.observers[0]([{ type: "childList", addedNodes: [shareAction] }]);
  page.actionBar.children[1].remove();

  page.observers[0]([{ type: "childList", addedNodes: [] }]);

  assert.equal(page.actionBar.children[1].id, "youtube-share-link-cleaner-page-button");
});

test("re-inserts the page button when YouTube replaces the entire action bar", () => {
  const page = createPageHarness();
  const initialShare = addShareAction(page.actionBar);
  page.observers[0]([{ type: "childList", addedNodes: [initialShare] }]);
  const replacementShare = addShareAction(page.replaceActionBar());

  page.documentListeners.get("yt-rendererstamper-finished")();
  for (const timer of page.timers) timer();

  assert.equal(page.actionBar.children[1].id, "youtube-share-link-cleaner-page-button");
  assert.equal(page.actionBar.children[0], replacementShare);
});

test("ignores the hidden stale Share action after YouTube SPA navigation", () => {
  const page = createPageHarness();
  const staleShare = addShareAction(page.actionBar);
  page.observers[0]([{ type: "childList", addedNodes: [staleShare] }]);

  page.documentListeners.get("yt-navigate-start")();
  staleShare.children[0].visible = false;
  const currentActionBar = new FakeElement("div");
  const currentShare = addShareAction(currentActionBar);
  page.root.append(currentActionBar);
  page.window.location.href = "https://www.youtube.com/watch?v=next456";

  page.documentListeners.get("yt-navigate-finish")();
  for (const timer of page.timers) timer();

  assert.equal(staleShare.parentElement.children.some((node) => node.id === "youtube-share-link-cleaner-page-button"), false);
  assert.equal(currentActionBar.children[0], currentShare);
  assert.equal(currentActionBar.children[1].id, "youtube-share-link-cleaner-page-button");
});

test("removes the page button after navigation away from a regular watch page", () => {
  const page = createPageHarness();
  const shareAction = addShareAction(page.actionBar);
  page.observers[0]([{ type: "childList", addedNodes: [shareAction] }]);
  page.window.location.href = "https://www.youtube.com/shorts/abc123";

  page.documentListeners.get("yt-navigate-finish")();

  assert.equal(page.actionBar.children.some((node) => node.id === "youtube-share-link-cleaner-page-button"), false);
});
