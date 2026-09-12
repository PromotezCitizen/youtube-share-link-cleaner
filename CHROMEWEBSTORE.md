# Chrome Web Store Listing — YouTube Share Link Cleaner

> Last updated: 2026-09-12
> Extension version: 1.6.5

This file is the copy-and-paste source for the Chrome Web Store Developer Dashboard. Text marked as internal notes is not intended for the public listing.

## Store Listing — English

**Extension name**

YouTube Share Link Cleaner

**Short description**

Removes si from YouTube shares and lets you copy clean video links.

**Detailed description**

Remove the `si` query parameter from YouTube share links automatically when you use YouTube's share and copy controls. Optionally shorten shared Shorts links to `youtu.be` links.

FEATURES
• Removes only the `si` query parameter
• Preserves video IDs, timestamps, playlists, and other useful parameters
• Works with YouTube's regular Share and Copy controls
• Includes a simple on/off toggle
• Optionally shortens shared Shorts links from `/shorts/VIDEO_ID` to `youtu.be/VIDEO_ID`
• Adds a Copy clean link button to regular YouTube video pages
• Supports English and Korean based on Chrome's interface language

HOW TO USE
1. Install the extension and refresh any YouTube tabs that were already open.
2. Open a video on YouTube.
3. Use YouTube's Share and Copy buttons as usual.
4. The copied link will omit `si` while retaining other useful parameters.
5. Optionally turn on **Shorten Shorts links** to change shared Shorts URLs from `/shorts/VIDEO_ID` to `youtu.be/VIDEO_ID` while preserving useful parameters.
6. On a regular video page, select **Copy clean link** beside YouTube's action buttons to copy its cleaned current link.

PRIVACY
Share URLs are processed momentarily on your device and are never stored or transmitted. When the user selects a copy button on a video or Shorts page, only the current page URL is processed locally and copied. The extension does not collect personal information, browsing history, or page content. It uses no analytics, advertising, tracking, accounts, external servers, or third-party services. Only the automatic-cleaning on/off preference is stored on the current device.

PERMISSIONS
The storage permission remembers whether automatic cleaning is enabled on the current device. The extension runs only on YouTube pages so it can clean URLs produced by YouTube's sharing interface and provide clean-copy buttons on video and Shorts pages.

SUPPORT
For bug reports, suggestions, and questions, visit:
https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues

This extension is not affiliated with or endorsed by YouTube or Google.

Version 1.6.0

**Category**

Productivity

**Single purpose**

Remove `si` from YouTube share links and provide clean-copy actions on video and Shorts pages.

**Primary language**

English

## 스토어 등록 정보 — 한국어

**확장 프로그램 이름**

YouTube 공유 링크 정리

**짧은 설명**

YouTube 공유 링크의 `si`를 제거하고 정리된 동영상 링크를 복사합니다.

**상세 설명**

YouTube의 공유 및 복사 기능을 사용할 때 공유 링크에서 `si` 쿼리 파라미터를 자동으로 제거합니다. 원하면 공유되는 Shorts 링크도 `youtu.be` 형태로 짧게 바꿉니다.

주요 기능
• `si` 쿼리 파라미터만 제거합니다.
• 영상 ID, 시작 시간, 재생목록 및 그 밖의 유용한 파라미터는 유지합니다.
• YouTube의 일반적인 공유 및 복사 버튼에서 동작합니다.
• 간단한 켜기/끄기 토글을 제공합니다.
• 원하면 공유되는 Shorts 링크를 `/shorts/VIDEO_ID`에서 `youtu.be/VIDEO_ID`로 바꿉니다.
• 일반 YouTube 동영상 페이지에 정리 링크 복사 버튼을 추가합니다.
• Chrome 인터페이스 언어에 따라 한국어와 영어를 지원합니다.

사용 방법
1. 확장 프로그램을 설치한 뒤 이미 열려 있던 YouTube 탭을 새로고침합니다.
2. YouTube에서 영상을 엽니다.
3. 평소처럼 YouTube의 공유 및 복사 버튼을 사용합니다.
4. 복사된 링크에서는 `si`만 빠지고 다른 유용한 파라미터는 유지됩니다.
5. 원하면 **Shorts 링크 줄이기**를 켜서 공유되는 Shorts URL을 `/shorts/VIDEO_ID`에서 `youtu.be/VIDEO_ID`로 바꿉니다.
6. 일반 동영상 페이지에서는 YouTube 동작 버튼 옆의 **정리해 복사**를 눌러 정리된 현재 링크를 복사합니다.

개인정보
공유 URL은 사용자의 기기에서 순간적으로만 처리되며 저장되거나 전송되지 않습니다. 일반 동영상 또는 Shorts 페이지의 복사 버튼을 누르면 현재 페이지 URL만 기기 안에서 처리해 복사합니다. 개인정보, 방문 기록 또는 페이지 내용을 수집하지 않습니다. 분석, 광고, 추적, 사용자 계정, 외부 서버 또는 제3자 서비스를 사용하지 않습니다. 현재 기기에는 자동 정리 기능의 켜짐/꺼짐 설정만 저장합니다.

권한
저장소 권한은 현재 기기에서 자동 정리 기능의 켜짐/꺼짐 상태를 기억하는 데 사용합니다. 확장 프로그램은 YouTube 공유 화면에서 만들어지는 URL을 정리하고 일반 동영상 및 Shorts 페이지에 복사 버튼을 제공하기 위해 YouTube 페이지에서만 실행됩니다.

지원
오류 제보, 기능 제안 및 문의:
https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues

이 확장 프로그램은 YouTube 또는 Google과 제휴 관계가 없으며 이들의 보증을 받지 않았습니다.

버전 1.6.0

**카테고리**

생산성

**단일 목적**

YouTube 공유 링크에서 `si`를 제거하고 일반 동영상 및 Shorts 페이지에서 정리된 링크를 복사합니다.

## Permissions Justification

### `storage`

**한국어**

사용자가 선택한 자동 정리 켜짐/꺼짐 상태를 현재 기기에 저장하기 위해 사용합니다. 공유 URL, 페이지 내용, 클립보드 내용 및 방문 기록은 저장하지 않습니다.

**English**

Used to save the user's automatic-cleaning on/off preference on the current device. It does not store share URLs, page content, clipboard content, or browsing history.

### YouTube site access (`https://*.youtube.com/*`)

The access is declared through content script match patterns in `manifest.json`, not a separate `host_permissions` entry. The dashboard may still request a site-access justification.

**한국어**

YouTube 공유 화면에서 생성되는 URL의 `si` 파라미터를 제거하기 위해 `youtube.com`에서만 실행됩니다. 방문 기록이나 URL을 저장 또는 전송하지 않습니다.

**English**

Runs only on `youtube.com` to remove the `si` parameter from URLs created by YouTube's sharing interface. It does not store or transmit browsing history or URLs.

## Privacy & Data Use

### Dashboard answers

Use the wording of the current dashboard form. The extension handles a YouTube share URL locally, but does not collect, retain, or transmit it.

| Data category | Handling | Storage | Off-device transmission | Third-party sharing | Purpose |
|---|---|---|---|---|---|
| Personally identifiable information | None | No | No | No | — |
| Health information | None | No | No | No | — |
| Financial and payment information | None | No | No | No | — |
| Authentication information | None | No | No | No | — |
| Personal communications | None | No | No | No | — |
| Location | None | No | No | No | — |
| Web history | Not collected or recorded | No | No | No | — |
| User activity | Copy and click events only trigger the local feature; they are not collected or recorded | No | No | No | — |
| Website content | A YouTube share URL or the current video or Shorts page URL after the user selects a copy button is processed momentarily on-device | No | No | No | Remove `si` and copy a shortened video link |

If the dashboard asks whether the extension **collects or uses/handles** any data, disclose **Website content** and select only the purpose corresponding to core functionality. Explain that processing is local and momentary. If it asks specifically whether data is **collected or transmitted off-device**, answer **No**. Do not describe the locally stored Boolean preference as personal information.

### Limited-use certifications

- [x] Data is not sold to third parties.
- [x] Data is not used or transferred for purposes unrelated to the extension's single purpose.
- [x] Data is not used or transferred to determine creditworthiness or for lending purposes.
- [x] Data is not used for personalized advertising or profiling.
- [x] Data is not made available for human review.

### Privacy policy URL

After pushing `PRIVACY.md` to the public `main` branch, use:

https://github.com/PromotezCitizen/youtube-share-link-cleaner/blob/main/PRIVACY.md

Open this URL in a private browser window before submission and confirm that it is publicly accessible.

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|---|---:|---|---|
| Store icon | 128×128 | Ready | `icons/icon-128.png` |
| Screenshot 1 | 1280×800 | Needs update for v1.5.4 page buttons | `store-assets/screenshot-1.png` |
| Screenshot 2 — disabled | 1280×800 | Needs update for v1.5.4 popup | `store-assets/screenshot-2-disabled-real.jpg` |
| Screenshot 3 — enabled | 1280×800 | Needs update for v1.5.4 popup | `store-assets/screenshot-3-enabled-real.jpg` |
| Small promotional tile | 440×280 | Ready | `store-assets/small-promo-tile.png` |

Recapture at least one screenshot before uploading v1.5.4: it must show a clean-copy button on a regular video or Shorts page and a real cleaned result. Screenshots 2 and 3 can still show the automatic-cleaning disabled/enabled comparison. The captures use a browser window without a signed-in personal account. The promotional tile uses the extension's own icon and does not use YouTube or Google logos.

## Distribution

**Visibility:** Public
**Regions:** All regions

## Developer Information

**Publisher name:** PromotezCitizen
**Contact email:** Enter and verify the email used for the Chrome Web Store developer account.
**Support URL:** https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues
**Homepage URL:** https://github.com/PromotezCitizen/youtube-share-link-cleaner

The contact email is the only value that cannot be derived from this repository.

### Developer account setup

1. Register through the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/). Google requires a one-time registration fee; the dashboard shows the amount and local currency before payment. The current published materials refer to a USD 5 registration fee.
2. Use an email account that is checked regularly. The developer account email cannot be changed after account creation without creating another account and transferring the item.
3. Add and verify the public contact email in the dashboard.
4. Enable two-step verification on the owning Google Account before publishing.
5. Complete the required Trader/Non-Trader declaration. This is a legal classification the publisher must select; it cannot be determined from the extension code.
6. No physical address is required for this extension unless purchases, paid features, or subscriptions are introduced.

Official references:

- https://developer.chrome.com/docs/webstore/register
- https://developer.chrome.com/docs/webstore/set-up-account/
- https://developer.chrome.com/docs/webstore/program-policies/two-step-verification
- https://developer.chrome.com/docs/webstore/program-policies/trader-verification-faq

## Version History

| Version | Date | Changes | Status |
|---|---|---|---|
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
- [ ] Refresh required screenshots to show the v1.5.1 page button
- [x] Small promotional tile prepared
- [x] Store-only ZIP prepared
- [ ] Push `PRIVACY.md` and verify its public URL
- [ ] Register the Chrome Web Store developer account
- [ ] Verify the developer contact email
- [ ] Enable two-step verification on the developer account
- [ ] Upload the ZIP and complete the dashboard fields

## Internal Review Notes

- The exact purpose of YouTube's `si` parameter is not publicly documented. Store copy deliberately calls it an `si` query parameter rather than a tracking parameter.
- This extension is not affiliated with or endorsed by YouTube or Google.
- The extension changes only links involved in YouTube's own share/copy flow and does not operate on unrelated websites.
