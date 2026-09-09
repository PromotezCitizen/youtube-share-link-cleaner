const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(
  path.join(__dirname, "..", "page-button.js"),
  "utf8"
);

test("page button supports regular YouTube watch and Shorts pages", () => {
  assert.match(source, /url\.pathname === "\/watch"/);
  assert.match(source, /url\.searchParams\.has\("v"\)/);
  assert.match(source, /\^\\\/shorts\\\//);
  assert.match(source, /ytd-reel-video-renderer\[is-active\]/);
  assert.match(source, /ytd-reel-player-overlay-renderer #actions/);
  assert.match(source, /ytd-reel-player-overlay-renderer #action-bar/);
  assert.match(source, /ytd-shorts #actions/);
});

test("page button cleans and copies the current URL from its click handler", () => {
  assert.match(source, /navigator\.clipboard\.writeText\(shortenCopiedYouTubeUrl\(window\.location\.href\)\)/);
  assert.match(source, /button\.addEventListener\("click"/);
  assert.match(source, /yt-navigate-finish/);
});

test("page button replaces an inactive page's existing action when YouTube navigates", () => {
  assert.match(source, /existingHost\.dataset\.pageKind === pageKind/);
  assert.match(source, /existingHost\.parentElement === buttonTarget/);
  assert.match(source, /existingHost\.remove\(\)/);
});

test("page button has a visible Shorts fallback when YouTube omits its action container", () => {
  assert.match(source, /const useShortsFallback = pageKind === "shorts" && !actionBar/);
  assert.match(source, /buttonTarget = actionBar \?\? \(useShortsFallback \? document\.body : null\)/);
  assert.match(source, /positionShortsFallback\(host\)/);
});
