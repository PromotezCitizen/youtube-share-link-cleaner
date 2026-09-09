const test = require("node:test");
const assert = require("node:assert/strict");

const { sanitizeYouTubeUrl } = require("../sanitize-url.js");

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
