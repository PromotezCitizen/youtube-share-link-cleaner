# YouTube Share Link Cleaner

English | [한국어](README.ko.md)

A Chrome extension that removes `si` from YouTube share links and optionally shortens Shorts links.

![YouTube Share Link Cleaner icon](icons/icon-128.png)

## Features

- Removes only the `si` parameter from YouTube share links.
- Preserves timestamps (`t`), playlists (`list`), and other useful parameters.
- Provides a popup toggle to enable or disable automatic cleaning instantly.
- Optionally changes shared Shorts and live URLs to `youtu.be/VIDEO_ID`.
- Adds a **Copy clean link** button to regular YouTube video pages.
- Displays its interface in Korean or English based on Chrome's UI language.
- Uses no external servers, user accounts, advertising, or analytics.

## Example

When you copy this URL:

```text
https://youtu.be/dQw4w9WgXcQ?si=share-value&t=42
```

the extension places this cleaned URL on the clipboard:

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

The extension does not inject scripts into unrelated websites and does not modify URLs copied from ordinary web pages outside YouTube.

## Enable or disable cleaning

1. Select the extensions button in the Chrome toolbar.
2. Select **YouTube Share Link Cleaner**.
3. Turn **Clean automatically** on or off.

The setting is stored on the current device and applies immediately to open YouTube tabs. Automatic cleaning is enabled by default.

## Copy from a video page

On regular YouTube video pages, the extension adds a **Copy clean link** button beside YouTube's action buttons. In the popup, turn on **Shorten Shorts and live links** to change shared `/shorts/VIDEO_ID` and `/live/VIDEO_ID` URLs to `youtu.be/VIDEO_ID` while preserving useful parameters such as timestamps.

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

Use YouTube's regular **Share** and **Copy** buttons after installation. Pin the extension to the Chrome toolbar for quick access to its setting.

After changing the extension code, reload it from `chrome://extensions`. If a content script changed, refresh existing YouTube tabs as well.

## Install from GitHub

Chrome does not install an extension directly from a GitHub page. GitHub distribution uses Chrome's manual developer-mode installation:

1. On the repository page, select **Code → Download ZIP**. A versioned ZIP on the optional [Releases page](https://github.com/PromotezCitizen/youtube-share-link-cleaner/releases) can be used instead when one is available.
2. Download the ZIP and extract it to a permanent folder. Do not select the ZIP file itself.
3. Open `chrome://extensions` in Chrome and enable **Developer mode**.
4. Select **Load unpacked** and choose the extracted folder containing `manifest.json`.
5. Refresh any YouTube tabs that were already open.

When a newer archive is available, download and extract it, then use the reload button on the extension card. Refresh YouTube tabs after updating. Chrome may show a developer-mode warning for extensions installed this way. The Chrome Web Store is the normal installation method for end users; GitHub installation is intended for personal use, testing, and users who accept manual updates. A GitHub Release is optional and is useful only when you want versioned downloads and release notes.

## Privacy and data handling

- The extension does not collect personal information.
- It does not store browsing history, shared URLs, page content, or clipboard content.
- It does not transmit user data to external servers or third parties.
- It contains no advertising, analytics, or tracking code.
- A URL that YouTube attempts to copy is processed momentarily and only on the user's device to remove `si`.
- A regular video page URL is processed only after selecting **Copy clean link**, then copied in its cleaned form. It is never retained or transmitted.
- `chrome.storage.local` stores only the automatic-cleaning and optional Shorts-shortening preferences.

Chrome removes the extension's local setting when the extension is uninstalled.

See the full [Privacy Policy](PRIVACY.md) for details.

## Permission

The extension requests only the `storage` permission to remember the automatic-cleaning and optional Shorts-shortening preferences on the current device.

## Development and testing

Run the tests with Node.js 18 or later:

```bash
npm test
```

The tests cover URL-cleaning rules, manifest configuration, locale resources, referenced icon files, and their actual image dimensions.

## Chrome Web Store release

- Store listing copy, permission justifications, privacy declarations, and the submission checklist: [`CHROMEWEBSTORE.md`](CHROMEWEBSTORE.md)
- Privacy policy: [`PRIVACY.md`](PRIVACY.md)
- Store graphics: `store-assets/`

Regenerate the store graphics and create the clean submission ZIP with:

```bash
npm run assets:store
npm run package:store
```

The ZIP is written to `dist/` and contains only files required by the extension. Documentation, tests, store graphics, and development scripts are excluded.

## Support

Use [GitHub Issues](https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues) for bug reports, feature requests, and questions. Include the type of YouTube page and an example copied URL when possible. Remove any information you do not want to share publicly before posting.

This extension is not affiliated with or endorsed by YouTube or Google.
