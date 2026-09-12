# YouTube Share Link Cleaner

English | [한국어](README.ko.md)

A Chrome extension that removes `si` from YouTube share links and optionally shortens Shorts and live links.

![YouTube Share Link Cleaner icon](icons/icon-128.png)

## Features

- Removes only `si`. Timestamps (`t`), playlists (`list`), and other parameters stay.
- A popup toggle turns `si` removal on or off.
- A second toggle turns shared Shorts and live URLs into `youtu.be/VIDEO_ID`.
- Adds a **Copy clean link** button to regular video pages.
- Korean or English, following Chrome's UI language.
- No servers, accounts, ads, or analytics.

## Example

When you copy this URL:

```text
https://youtu.be/dQw4w9WgXcQ?si=share-value&t=42
```

the clipboard gets:

```text
https://youtu.be/dQw4w9WgXcQ?t=42
```

The video ID and `t=42` remain unchanged. If `si` is the only query parameter, the now-unnecessary `?` is removed as well.

## About the `si` parameter

YouTube has not publicly documented the exact purpose of the `si` parameter. It appears to be an identifier added when a link is created through YouTube's sharing interface, but this is an inference rather than an official definition.

This extension removes only `si`. It does not change the video ID or user-selected timestamp and playlist information required for the intended playback behavior.

## Scope

The extension's scripts run only on:

```text
https://youtube.com/*
https://*.youtube.com/*
```

Within YouTube's share dialog and copy flows, it can clean URLs for these hosts:

- `youtu.be`
- `youtube.com`
- YouTube subdomains, including `www.youtube.com`

It does not run on other sites and does not touch URLs copied elsewhere.

## Enable or disable cleaning

1. Select the extensions button in the Chrome toolbar.
2. Select **YouTube Share Link Cleaner**.
3. Turn **Remove si** on or off.

The setting is stored on the current device and applies immediately to open YouTube tabs. **Remove si** is on by default.

## Copy from a video page

Regular video pages get a **Copy clean link** button next to Share. It copies the current page URL as `youtu.be/VIDEO_ID` without `si`. In the popup, **Shorten Shorts & live** does the same for shared `/shorts/VIDEO_ID` and `/live/VIDEO_ID` URLs; timestamps and other parameters stay.

## Languages

The popup, extension name, and description follow Chrome's UI language.

- Korean: `_locales/ko/messages.json`
- English: `_locales/en/messages.json`
- Unsupported UI languages: English fallback

## Install manually in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose the `youtube-share-link-cleaner` project directory.
5. Refresh any YouTube tabs that were already open.

Then use YouTube's **Share** and **Copy** buttons as usual. Pin the extension to the toolbar if you change the settings often.

After changing the extension code, reload it from `chrome://extensions`. If a content script changed, refresh existing YouTube tabs as well.

## Install from GitHub

Chrome cannot install directly from GitHub, so this is a manual developer-mode install:

1. On the repository page, select **Code**, then **Download ZIP**. A versioned ZIP from the [Releases page](https://github.com/PromotezCitizen/youtube-share-link-cleaner/releases) works too when one exists.
2. Download the ZIP and extract it to a permanent folder. Do not select the ZIP file itself.
3. Open `chrome://extensions` in Chrome and enable **Developer mode**.
4. Select **Load unpacked** and choose the extracted folder containing `manifest.json`.
5. Refresh any YouTube tabs that were already open.

For a newer version, download and extract again, press the reload button on the extension card, and refresh YouTube tabs. Chrome may warn about developer-mode extensions. The Chrome Web Store is the normal way to install; GitHub is for personal use, testing, and manual updates.

## Privacy and data handling

- No personal information is collected.
- Browsing history, shared URLs, page content, and clipboard content are not stored.
- Nothing is sent to servers or third parties.
- No advertising, analytics, or tracking code.
- The URL YouTube is about to copy is rewritten on your device and then forgotten.
- **Copy clean link** reads the page URL only when pressed, copies the cleaned form, and keeps nothing.
- `chrome.storage.local` holds only the two on/off settings.

Uninstalling removes those settings.

See the full [Privacy Policy](PRIVACY.md) for details.

## Permission

Only `storage`, used to keep the two on/off settings on this device.

## Development and testing

Run the tests with Node.js 18 or later:

```bash
npm test
```

Tests cover the URL rules, the manifest, locale files, and icon files and sizes.

## Chrome Web Store release

- Store listing copy, permission justifications, privacy declarations, and the submission checklist: [`CHROMEWEBSTORE.md`](CHROMEWEBSTORE.md)
- Privacy policy: [`PRIVACY.md`](PRIVACY.md)
- Store graphics: `store-assets/` (English and Korean overview images included)
- Final localized screenshots: `store-assets/screenshots/en/` and `store-assets/screenshots/ko/`

Regenerate the store graphics and create the clean submission ZIP with:

```bash
npm run assets:store
npm run package:store
```

The ZIP lands in `dist/` with only the files the extension needs; docs, tests, graphics, and scripts are left out.

## Support

Bug reports, feature requests, and questions go to [GitHub Issues](https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues). Say which kind of YouTube page it was and include a copied URL if you can, minus anything you would rather not post publicly.

This extension is not affiliated with or endorsed by YouTube or Google.
