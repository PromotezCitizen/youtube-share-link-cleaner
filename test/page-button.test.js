const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(
  path.join(__dirname, "..", "page-button.js"),
  "utf8"
);

test("page button is limited to regular YouTube watch pages", () => {
  assert.match(source, /url\.pathname === "\/watch"/);
  assert.match(source, /url\.searchParams\.has\("v"\)/);
  assert.doesNotMatch(source, /\/shorts/);
});

test("page button cleans and copies the current URL from its click handler", () => {
  assert.match(source, /navigator\.clipboard\.writeText\(shortenCopiedYouTubeUrl\(window\.location\.href\)\)/);
  assert.match(source, /button\.addEventListener\("click"/);
  assert.match(source, /yt-navigate-finish/);
});
