# Chrome Web Store Listing — YouTube Share Link Cleaner

> Last updated: 2026-09-13
> Extension version: 1.6.8

Source text for the Chrome Web Store Developer Dashboard. Sections marked internal are not part of the public listing.

## Store Listing — English

**Extension name**

YouTube Share Link Cleaner

**Short description**

Removes si from YouTube shares and lets you copy clean video links.

**Detailed description**

Removes the `si` query parameter from links created by YouTube's Share and Copy controls. Can also shorten shared Shorts and live links to `youtu.be`.

FEATURES
- Removes only `si`. Video IDs, timestamps, playlists, and other parameters stay as they are.
- Works inside YouTube's own Share and Copy controls.
- Two independent toggles: `si` removal and Shorts/live shortening.
- Shortening turns `/shorts/VIDEO_ID` and `/live/VIDEO_ID` into `youtu.be/VIDEO_ID`.
- Adds a Copy clean link button to regular video pages.
- English and Korean, following Chrome's interface language.

HOW TO USE
1. Install the extension and refresh any YouTube tabs that were already open.
2. Open a video and use YouTube's Share and Copy buttons as usual.
3. With **Remove si** on (the default), the copied link has no `si`. Other parameters are kept.
4. Turn on **Shorten Shorts & live** to get `youtu.be/VIDEO_ID` instead of `/shorts/VIDEO_ID` or `/live/VIDEO_ID`. This works whether or not Remove si is on.
5. On a regular video page, **Copy clean link** next to the Share button copies the current page link in cleaned form.

PRIVACY
Share links are rewritten on your device and never stored or sent anywhere. Copy clean link reads only the current page URL, and only when you press it. The extension collects no personal information, browsing history, or page content, and uses no analytics, ads, accounts, or servers. The only stored data is the two on/off settings, kept on the current device.

PERMISSIONS
storage: keeps the two on/off settings on this device. YouTube site access: needed to rewrite links in YouTube's share dialog and to add the Copy clean link button.

SUPPORT
For bug reports, suggestions, and questions, visit:
https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues

This extension is not affiliated with or endorsed by YouTube or Google.

Version 1.6.8

**Category**

Productivity

**Single purpose**

Clean YouTube share links: remove `si`, optionally shorten Shorts and live links, and copy a clean link from regular video pages.

**Primary language**

English

## 스토어 등록 정보 — 한국어

**확장 프로그램 이름**

YouTube 공유 링크 정리

**짧은 설명**

YouTube 공유 링크의 `si`를 제거하고 정리된 동영상 링크를 복사합니다.

**상세 설명**

YouTube의 공유·복사 버튼으로 만들어지는 링크에서 `si` 파라미터를 뺍니다. 원하면 Shorts·라이브 링크를 `youtu.be` 주소로 줄입니다.

주요 기능
- `si`만 뺍니다. 영상 ID, 시작 시간, 재생목록 등 다른 파라미터는 그대로 둡니다.
- YouTube의 공유·복사 버튼 안에서 동작합니다.
- `si` 제거와 Shorts·라이브 줄이기는 각각 따로 켜고 끕니다.
- 줄이기를 켜면 `/shorts/VIDEO_ID`, `/live/VIDEO_ID`가 `youtu.be/VIDEO_ID`가 됩니다.
- 일반 동영상 페이지에 정리해 복사 버튼을 붙입니다.
- Chrome 언어에 따라 한국어 또는 영어로 표시됩니다.

사용 방법
1. 설치한 뒤 이미 열려 있던 YouTube 탭을 새로고침합니다.
2. 영상을 열고 평소처럼 공유·복사 버튼을 씁니다.
3. **si 제거**가 켜져 있으면(기본값) 복사된 링크에 `si`가 없습니다. 다른 파라미터는 그대로입니다.
4. **Shorts·라이브 줄이기**를 켜면 `/shorts/VIDEO_ID`, `/live/VIDEO_ID` 대신 `youtu.be/VIDEO_ID`가 복사됩니다. si 제거와는 따로 동작합니다.
5. 일반 동영상 페이지에서는 공유 버튼 옆 **정리해 복사**를 누르면 현재 페이지 링크가 정리된 형태로 복사됩니다.

개인정보
공유 링크는 기기 내에서 고쳐 쓸 뿐 저장하거나 어디로도 보내지 않습니다. 정리해 복사는 버튼을 눌렀을 때 현재 페이지 주소만 읽습니다. 개인정보, 방문 기록, 페이지 내용을 수집하지 않고, 분석·광고·계정·서버를 쓰지 않습니다. 저장하는 것은 두 개의 켜짐/꺼짐 설정뿐이며 현재 기기에만 남습니다.

권한
storage: 두 켜짐/꺼짐 설정을 이 기기에 보관합니다. YouTube 사이트 접근: 공유 창의 링크를 고쳐 쓰고 정리해 복사 버튼을 붙이는 데 필요합니다.

지원
오류 제보, 기능 제안 및 문의:
https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues

이 확장 프로그램은 YouTube 또는 Google과 제휴 관계가 없으며 이들의 보증을 받지 않았습니다.

버전 1.6.8

**카테고리**

생산성

**단일 목적**

YouTube 공유 링크를 정리합니다. `si`를 제거하고, 원하면 Shorts·라이브 링크를 줄이며, 일반 동영상 페이지에서 정리된 링크를 복사합니다.

## Permissions Justification

### `storage`

**한국어**

두 켜짐/꺼짐 설정(`si` 제거, Shorts·라이브 줄이기)을 현재 기기에 저장하는 데만 씁니다. 공유 URL, 페이지 내용, 클립보드 내용, 방문 기록은 저장하지 않습니다.

**English**

Stores the two on/off settings (`si` removal, Shorts/live shortening) on the current device. Nothing else is stored: no share URLs, page content, clipboard content, or browsing history.

### YouTube site access (`https://*.youtube.com/*`)

Declared through content script match patterns in `manifest.json`, not `host_permissions`. The dashboard may still ask for a justification.

**한국어**

YouTube 공유 화면에서 생성되는 URL의 `si` 파라미터를 제거하기 위해 `youtube.com`에서만 실행됩니다. 방문 기록이나 URL을 저장 또는 전송하지 않습니다.

**English**

Runs only on `youtube.com` to remove the `si` parameter from URLs created by YouTube's sharing interface. It does not store or transmit browsing history or URLs.

## Privacy & Data Use

### Dashboard answers

Follow the wording of the current dashboard form. The extension rewrites a YouTube share URL locally and does not collect, keep, or send it.

| Data category | Handling | Storage | Off-device transmission | Third-party sharing | Purpose |
|---|---|---|---|---|---|
| Personally identifiable information | None | No | No | No | - |
| Health information | None | No | No | No | - |
| Financial and payment information | None | No | No | No | - |
| Authentication information | None | No | No | No | - |
| Personal communications | None | No | No | No | - |
| Location | None | No | No | No | - |
| Web history | Not collected or recorded | No | No | No | - |
| User activity | Copy and click events only trigger the local feature; they are not collected or recorded | No | No | No | - |
| Website content | A YouTube share URL, or the current video page URL when the user presses the copy button, rewritten on-device and not kept | No | No | No | Remove `si` and copy a shortened video link |

If the form asks whether the extension **collects or uses/handles** data, disclose **Website content** with the core-functionality purpose only, and note that processing is local. If it asks whether data is **collected or transmitted off-device**, answer **No**. The stored on/off settings are not personal information.

### Limited-use certifications

- [x] Data is not sold to third parties.
- [x] Data is not used or transferred for purposes unrelated to the extension's single purpose.
- [x] Data is not used or transferred to determine creditworthiness or for lending purposes.
- [x] Data is not used for personalized advertising or profiling.
- [x] Data is not made available for human review.

### Privacy policy URL

Once `PRIVACY.md` is on the public `main` branch:

https://github.com/PromotezCitizen/youtube-share-link-cleaner/blob/main/PRIVACY.md

Open it in a private window before submitting to confirm it is public.

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|---|---:|---|---|
| Store icon | 128×128 | Ready | `icons/icon-128.png` |
| English overview | 1280×800 | Ready | `store-assets/screenshot-1.png` |
| Korean overview | 1280×800 | Ready | `store-assets/screenshot-1-ko.png` |
| Korean real-use screenshots | 7 × 1280×800 | Ready | `store-assets/screenshots/ko/` |
| English real-use screenshots | 7 × 1280×800 | Ready | `store-assets/screenshots/en/` |
| Small promotional tile | 440×280 | Ready | `store-assets/small-promo-tile.png` |

The two overview images share one layout. Each screenshot folder holds seven manual captures: the copy button with its copied-link callout, the watch-page share dialog with cleaning on and off, and the four Shorts toggle combinations. Check each capture for personal browser UI before uploading. The promotional tile uses only the extension's own icon.

## Distribution

**Visibility:** Public
**Regions:** All regions

## Developer Information

**Publisher name:** PromotezCitizen
**Contact email:** Enter and verify the email used for the Chrome Web Store developer account.
**Support URL:** https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues
**Homepage URL:** https://github.com/PromotezCitizen/youtube-share-link-cleaner

The contact email is the only value not in this repository.

### Developer account setup

1. Register at the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/). Google charges a one-time registration fee, currently listed as USD 5; the dashboard shows the exact amount before payment.
2. Use an email account you check regularly. The account email cannot be changed later without creating a new account and transferring the item.
3. Add and verify the public contact email in the dashboard.
4. Turn on two-step verification for the Google Account before publishing.
5. Complete the Trader/Non-Trader declaration. This is a legal classification the publisher must choose.
6. No physical address is needed unless the extension adds purchases, paid features, or subscriptions.

Official references:

- https://developer.chrome.com/docs/webstore/register
- https://developer.chrome.com/docs/webstore/set-up-account/
- https://developer.chrome.com/docs/webstore/program-policies/two-step-verification
- https://developer.chrome.com/docs/webstore/program-policies/trader-verification-faq

## Version History

| Version | Date | Changes | Status |
|---|---|---|---|
| 1.6.8 | 2026-09-13 | Renames the automatic-cleaning toggle to the more explicit **Remove si** label in Korean and English. | Feature branch |
| 1.6.7 | 2026-09-12 | Makes automatic `si` removal and Shorts/live URL shortening independent settings in every toggle combination. | Feature branch |
| 1.6.6 | 2026-09-12 | Restores Shorts and live URL paths when direct-link shortening is turned off while continuing to remove `si` when automatic cleaning remains enabled. | Feature branch |
| 1.6.5 | 2026-09-12 | Keeps the regular-video clean-copy button available when opening a video from another YouTube page. | Feature branch |
| 1.6.4 | 2026-09-12 | Anchors the regular-video clean-copy button to the rendered Share action instead of a single YouTube action-bar ID. | Feature branch |
| 1.6.3 | 2026-09-12 | Moves the regular-video clean-copy button to an isolated document-idle content script so it remains independent of YouTube's page-script lifecycle. | Feature branch |
| 1.6.2 | 2026-09-12 | Places the regular-video clean-copy button after Share, restores it after YouTube re-renders controls, and stabilizes Korean and English button widths. | Feature branch |
| 1.6.1 | 2026-09-11 | Extends the optional direct-link shortening toggle to YouTube live URLs. | Feature branch |
| 1.6.0 | 2026-09-11 | Adds an optional Shorts-link shortening toggle for YouTube's share flow and removes the overlapping Shorts page button. | Feature branch |
| 1.5.4 | 2026-09-09 | Supports newer Shorts action-bar layouts and adds a visible fallback when YouTube does not expose an action container. | Feature branch |
| 1.5.3 | 2026-09-09 | Makes the Shorts copy button resilient to current action-menu layouts and YouTube SPA navigation from a regular video. | Feature branch |
| 1.5.2 | 2026-09-09 | Adds a compact direct clean-copy button to Shorts pages and shortens copied Shorts URLs. | Feature branch |
| 1.5.1 | 2026-09-09 | Removes the popup clipboard and current-tab actions, leaving one direct clean-copy action on regular video pages. Removes `clipboardRead`, `clipboardWrite`, and `tabs` permissions. | Feature branch |
| 1.5.0 | 2026-09-09 | Adds a direct **Copy clean link** button to regular YouTube video pages, excluding Shorts. | Feature branch |
| 1.4.1 | 2026-09-09 | Adds a popup action that copies a cleaned link for the current YouTube page. Adds the `tabs` permission to access the active tab URL only after that explicit user action. | Feature branch |
| 1.4.0 | 2026-09-09 | Adds an explicit popup action that reads the clipboard once on user request, removes `si`, and shortens supported copied YouTube watch links while preserving other parameters. Adds `clipboardRead` and `clipboardWrite` permissions. | Feature branch |
| 1.3.2 | 2026-09-09 | Initial Chrome Web Store submission: automatic `si` removal, preservation of other parameters, popup toggle, Korean and English localization, and local-only settings. | Draft |

## Submission Checklist

- [x] Manifest V3
- [x] Minimum required permission only (`storage`)
- [x] Site access limited to YouTube
- [x] No remotely hosted code
- [x] No analytics, advertising, tracking, authentication, or network transmission
- [x] English and Korean listing copy prepared
- [x] Single-purpose statement prepared
- [x] Permission and site-access justifications prepared
- [x] Privacy disclosures prepared
- [x] Privacy policy written
- [x] Refresh screenshots to show the current page button and toggle labels
- [x] Small promotional tile prepared
- [x] Store-only ZIP prepared
- [ ] Push `PRIVACY.md` and verify its public URL
- [ ] Register the Chrome Web Store developer account
- [ ] Verify the developer contact email
- [ ] Enable two-step verification on the developer account
- [ ] Upload the ZIP and complete the dashboard fields

## Internal Review Notes

- YouTube has not documented what `si` does. The listing calls it a query parameter, not a tracking parameter, on purpose.
- The extension is not affiliated with or endorsed by YouTube or Google.
- It changes only links in YouTube's own share and copy flow and does not run on other sites.
