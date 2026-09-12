const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "manifest.json"), "utf8")
);
const packageJson = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")
);

test("uses Manifest V3 with only the storage permission", () => {
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.version, packageJson.version);
  assert.deepEqual(manifest.permissions, ["storage"]);
  assert.equal(manifest.host_permissions, undefined);
});

test("all scripts and the popup referenced by the manifest exist", () => {
  const referencedFiles = [
    manifest.action.default_popup,
    ...Object.values(manifest.icons),
    ...Object.values(manifest.action.default_icon),
    ...manifest.content_scripts.flatMap(({ js = [] }) => js)
  ];

  for (const referencedFile of referencedFiles) {
    assert.equal(
      fs.existsSync(path.join(projectRoot, referencedFile)),
      true,
      `${referencedFile} should exist`
    );
  }
});

test("runs URL cleaning in the main world and the page button in an isolated document-idle script", () => {
  const mainWorldScript = manifest.content_scripts.find(
    ({ world }) => world === "MAIN"
  );
  const pageButtonScript = manifest.content_scripts.find(
    ({ js = [] }) => js.includes("page-button.js")
  );

  assert.deepEqual(mainWorldScript.js, [
    "sanitize-url.js",
    "content.js"
  ]);
  assert.equal(mainWorldScript.run_at, "document_start");
  assert.deepEqual(pageButtonScript.js, ["sanitize-url.js", "page-button.js"]);
  assert.equal(pageButtonScript.world, undefined);
  assert.equal(pageButtonScript.run_at, "document_idle");
});

test("declares distinct PNG icon files at their actual dimensions", () => {
  for (const [declaredSize, relativePath] of Object.entries(manifest.icons)) {
    assert.match(relativePath, new RegExp(`icon-${declaredSize}\\.png$`));

    const png = fs.readFileSync(path.join(projectRoot, relativePath));
    assert.equal(png.toString("ascii", 1, 4), "PNG");
    assert.equal(png.readUInt32BE(16), Number(declaredSize));
    assert.equal(png.readUInt32BE(20), Number(declaredSize));
    assert.equal(manifest.action.default_icon[declaredSize], relativePath);
  }
});

test("popup uses external assets and an accessible checkbox", () => {
  const popupHtml = fs.readFileSync(
    path.join(projectRoot, manifest.action.default_popup),
    "utf8"
  );

  assert.match(popupHtml, /<html lang="en">/);
  assert.match(popupHtml, /<input[\s\S]*id="enabled"[\s\S]*type="checkbox"/);
  assert.match(popupHtml, /<label[\s\S]*for="enabled"/);
  assert.match(popupHtml, /<input[\s\S]*id="shorten-shorts"[\s\S]*type="checkbox"/);
  assert.match(popupHtml, /<label[\s\S]*for="shorten-shorts"/);
  assert.match(popupHtml, /<script src="\.\.\/sanitize-url\.js"><\/script>/);
  assert.match(popupHtml, /<script src="popup\.js"><\/script>/);
  assert.doesNotMatch(popupHtml, /\son[a-z]+\s*=/i);
});

test("extension metadata and popup strings are localized", () => {
  assert.equal(manifest.default_locale, "en");
  assert.match(manifest.name, /^__MSG_.+__$/);
  assert.match(manifest.description, /^__MSG_.+__$/);
  assert.match(manifest.action.default_title, /^__MSG_.+__$/);

  const localeDirectories = ["en", "ko"];
  const localeMessages = localeDirectories.map((locale) =>
    JSON.parse(
      fs.readFileSync(
        path.join(projectRoot, "_locales", locale, "messages.json"),
        "utf8"
      )
    )
  );
  const defaultKeys = Object.keys(localeMessages[0]).sort();

  for (const messages of localeMessages) {
    assert.deepEqual(Object.keys(messages).sort(), defaultKeys);
    for (const { message } of Object.values(messages)) {
      assert.equal(typeof message, "string");
      assert.notEqual(message.length, 0);
    }
  }
});
