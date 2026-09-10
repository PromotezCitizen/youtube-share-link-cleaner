const test = require("node:test");
const assert = require("node:assert/strict");

const {
  sanitizeYouTubeUrl,
  shortenDirectYouTubeUrl,
  shortenCopiedYouTubeUrl
} = require("../sanitize-url.js");

test("removes si from a youtu.be share URL", () => {
  assert.equal(
    sanitizeYouTubeUrl("https://youtu.be/dQw4w9WgXcQ?si=tracking-value"),
    "https://youtu.be/dQw4w9WgXcQ"
  );
});

test("keeps useful YouTube parameters and fragments", () => {
  assert.equal(
    sanitizeYouTubeUrl(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&si=tracking-value&t=42#details"
    ),
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42#details"
  );
});

test("removes every si parameter", () => {
  assert.equal(
    sanitizeYouTubeUrl("https://youtube.com/shorts/example?si=one&si=two"),
    "https://youtube.com/shorts/example"
  );
});

test("preserves surrounding whitespace", () => {
  assert.equal(
    sanitizeYouTubeUrl("  https://youtu.be/example?si=value\n"),
    "  https://youtu.be/example\n"
  );
});

test("does not modify non-YouTube or malformed text", () => {
  assert.equal(
    sanitizeYouTubeUrl("https://example.com/watch?si=value"),
    "https://example.com/watch?si=value"
  );
  assert.equal(sanitizeYouTubeUrl("not a URL?si=value"), "not a URL?si=value");
});

test("does not remove similarly named parameters", () => {
  assert.equal(
    sanitizeYouTubeUrl("https://youtu.be/example?sierra=value"),
    "https://youtu.be/example?sierra=value"
  );
});

test("handles punctuation, empty values, and encoded delimiters without manual splitting", () => {
  assert.equal(
    sanitizeYouTubeUrl(
      "https://youtu.be/example?si=a.b_-&list=one%26two&si=&t=4"
    ),
    "https://youtu.be/example?list=one%26two&t=4"
  );
});

test("shortens a copied YouTube watch URL and preserves useful parameters", () => {
  assert.equal(
    shortenCopiedYouTubeUrl(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&si=share-value&t=42&list=PL123#details"
    ),
    "https://youtu.be/dQw4w9WgXcQ?t=42&list=PL123#details"
  );
});

test("shortens a watch URL even when it has no si parameter", () => {
  assert.equal(
    shortenCopiedYouTubeUrl("https://m.youtube.com/watch?v=dQw4w9WgXcQ&t=42"),
    "https://youtu.be/dQw4w9WgXcQ?t=42"
  );
});

test("cleans si from short YouTube URLs and shortens Shorts URLs", () => {
  assert.equal(
    shortenCopiedYouTubeUrl("https://youtu.be/dQw4w9WgXcQ?si=value&t=42"),
    "https://youtu.be/dQw4w9WgXcQ?t=42"
  );
  assert.equal(
    shortenCopiedYouTubeUrl("https://youtube.com/shorts/example?si=value"),
    "https://youtu.be/example"
  );
});

test("shortens a YouTube Shorts URL while preserving useful parameters", () => {
  assert.equal(
    shortenCopiedYouTubeUrl("https://www.youtube.com/shorts/dQw4w9WgXcQ?si=value&t=42"),
    "https://youtu.be/dQw4w9WgXcQ?t=42"
  );
});

test("shortens a YouTube live URL while preserving useful parameters", () => {
  assert.equal(
    shortenCopiedYouTubeUrl("https://www.youtube.com/live/dQw4w9WgXcQ?si=value&t=42"),
    "https://youtu.be/dQw4w9WgXcQ?t=42"
  );
});

test("shortens Shorts and live URLs for the automatic direct-link option", () => {
  assert.equal(
    shortenDirectYouTubeUrl("https://www.youtube.com/shorts/dQw4w9WgXcQ?si=value&t=42"),
    "https://youtu.be/dQw4w9WgXcQ?si=value&t=42"
  );
  assert.equal(
    shortenDirectYouTubeUrl("https://www.youtube.com/live/dQw4w9WgXcQ?si=value&t=42"),
    "https://youtu.be/dQw4w9WgXcQ?si=value&t=42"
  );
  assert.equal(
    shortenDirectYouTubeUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ&si=value"),
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&si=value"
  );
});

test("leaves unsupported copied text unchanged", () => {
  assert.equal(
    shortenCopiedYouTubeUrl("https://example.com/watch?v=dQw4w9WgXcQ&si=value"),
    "https://example.com/watch?v=dQw4w9WgXcQ&si=value"
  );
  assert.equal(shortenCopiedYouTubeUrl("not a URL"), "not a URL");
});
