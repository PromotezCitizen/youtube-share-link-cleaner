const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const sanitizerSource = fs.readFileSync(path.join(__dirname, "..", "sanitize-url.js"), "utf8");
const contentSource = fs.readFileSync(path.join(__dirname, "..", "content.js"), "utf8");

class FakeElement {
  matches() { return false; }
  querySelectorAll() { return []; }
}

class FakeInputElement extends FakeElement {
  constructor(value) {
    super();
    this.value = value;
    this.selectionStart = 0;
    this.selectionEnd = 0;
  }

  matches(selector) { return selector === "input, textarea"; }
}

class FakeTextAreaElement extends FakeInputElement {}

function createContentHarness(initialValue) {
  const field = new FakeInputElement(initialValue);
  const documentListeners = new Map();
  const windowListeners = new Map();
  const observerCallbacks = [];
  const origin = "https://www.youtube.com";
  const document = {
    activeElement: null,
    querySelectorAll: (selector) => selector === "input, textarea" ? [field] : [],
    addEventListener: (name, listener) => documentListeners.set(name, listener),
    getSelection: () => null
  };
  const window = {
    location: { origin },
    requestAnimationFrame: (callback) => { callback(); return 0; },
    cancelAnimationFrame() {},
    setTimeout: () => 1,
    addEventListener: (name, listener) => windowListeners.set(name, listener),
    postMessage() {}
  };
  const context = vm.createContext({
    URL,
    Element: FakeElement,
    HTMLInputElement: FakeInputElement,
    HTMLTextAreaElement: FakeTextAreaElement,
    document,
    window,
    navigator: {},
    MutationObserver: class {
      constructor(callback) { observerCallbacks.push(callback); }
      observe() {}
    },
    console
  });

  vm.runInContext(sanitizerSource, context);
  vm.runInContext(contentSource, context);

  return {
    field,
    announceState(enabled, shortenShorts) {
      windowListeners.get("message")({
        source: window,
        origin,
        data: {
          channel: "youtube-share-link-cleaner",
          type: "STATE_CHANGED",
          enabled,
          shortenShorts
        }
      });
    },
    notifyFieldChanged() {
      observerCallbacks[0]([{ type: "attributes", target: field }]);
    }
  };
}

for (const pathName of ["shorts", "live"]) {
  test(`turning off direct-link shortening restores the ${pathName} path but keeps si removed`, () => {
    const original = `https://www.youtube.com/${pathName}/abc123?si=token&t=5`;
    const page = createContentHarness(original);

    page.announceState(true, true);
    assert.equal(page.field.value, "https://youtu.be/abc123?t=5");

    page.announceState(true, false);
    assert.equal(page.field.value, `https://www.youtube.com/${pathName}/abc123?t=5`);

    page.announceState(false, false);
    assert.equal(page.field.value, original);
  });
}

test("tracks a new URL when YouTube reuses the same share input", () => {
  const page = createContentHarness("https://www.youtube.com/shorts/first?si=old");
  page.announceState(true, true);

  page.field.value = "https://www.youtube.com/live/second?si=new&t=10";
  page.notifyFieldChanged();
  assert.equal(page.field.value, "https://youtu.be/second?t=10");

  page.announceState(true, false);
  assert.equal(page.field.value, "https://www.youtube.com/live/second?t=10");
});

test("shortens a Shorts URL without removing si when only direct-link shortening is enabled", () => {
  const original = "https://www.youtube.com/shorts/abc123?si=token&t=5";
  const page = createContentHarness(original);

  page.announceState(false, true);
  assert.equal(page.field.value, "https://youtu.be/abc123?si=token&t=5");

  page.announceState(false, false);
  assert.equal(page.field.value, original);
});

test("recomputes the share URL from the original for all four toggle combinations", () => {
  const original = "https://www.youtube.com/shorts/abc123?si=token&t=5";
  const page = createContentHarness(original);

  page.announceState(true, true);
  assert.equal(page.field.value, "https://youtu.be/abc123?t=5");

  page.announceState(false, true);
  assert.equal(page.field.value, "https://youtu.be/abc123?si=token&t=5");

  page.announceState(true, false);
  assert.equal(page.field.value, "https://www.youtube.com/shorts/abc123?t=5");

  page.announceState(false, false);
  assert.equal(page.field.value, original);
});
