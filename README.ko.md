# YouTube Share Link Cleaner

[English](README.md) | 한국어

YouTube 공유 링크의 `si`를 제거하고, 원하면 Shorts·라이브 링크도 짧게 만드는 Chrome 확장 프로그램입니다.

![YouTube Share Link Cleaner 아이콘](icons/icon-128.png)

## 주요 기능

- `si`만 뺍니다. 시작 시간(`t`), 재생목록(`list`) 등 다른 파라미터는 그대로입니다.
- 팝업 토글로 `si` 제거를 켜고 끕니다.
- 두 번째 토글을 켜면 공유되는 Shorts·라이브 URL이 `youtu.be/VIDEO_ID`가 됩니다.
- 일반 동영상 페이지에 **정리해 복사** 버튼을 붙입니다.
- Chrome UI 언어에 따라 한국어 또는 영어로 표시됩니다.
- 서버, 계정, 광고, 분석 도구를 쓰지 않습니다.

## 변환 예시

다음 링크를 복사하면:

```text
https://youtu.be/dQw4w9WgXcQ?si=share-value&t=42
```

클립보드에는 아래와 같이 저장됩니다.

```text
https://youtu.be/dQw4w9WgXcQ?t=42
```

URL의 영상 ID와 `t=42`는 유지되고 `si`만 제거됩니다. `si`가 유일한 쿼리 파라미터라면 불필요해진 `?`도 URL에서 사라집니다.

## `si` 파라미터에 관하여

YouTube는 `si` 파라미터의 정확한 용도를 공식적으로 공개하지 않았습니다. YouTube의 공유 기능으로 링크를 만들 때 추가되는 식별 값으로 추정되지만, 이 설명은 공식적으로 확인된 정의가 아닙니다.

이 확장 프로그램은 재생에 필요한 영상 ID나 사용자가 선택한 시작 시간·재생목록 정보는 변경하지 않고 `si`만 제거합니다.

## 동작 범위

확장 프로그램 스크립트는 다음 범위에서만 실행됩니다.

```text
https://youtube.com/*
https://*.youtube.com/*
```

YouTube 페이지의 공유 창이나 복사 동작에서 만들어진 다음 호스트의 URL을 정리할 수 있습니다.

- `youtu.be`
- `youtube.com`
- `www.youtube.com`을 포함한 `youtube.com`의 하위 도메인

다른 사이트에서는 동작하지 않고, 다른 곳에서 복사한 URL은 건드리지 않습니다.

## 켜기 및 끄기

1. Chrome 도구 모음의 확장 프로그램 버튼을 누릅니다.
2. **YouTube Share Link Cleaner**를 선택합니다.
3. **si 제거** 토글을 켜거나 끕니다.

설정은 현재 기기에 저장되며 열려 있는 YouTube 탭에도 즉시 적용됩니다. 기본값은 켜짐입니다.

## 동영상 페이지에서 바로 복사

일반 동영상 페이지에는 공유 버튼 옆에 **정리해 복사** 버튼이 붙습니다. 누르면 현재 페이지 URL을 `si` 없는 `youtu.be/VIDEO_ID`로 복사합니다. 팝업의 **Shorts·라이브 줄이기**는 공유되는 `/shorts/VIDEO_ID`, `/live/VIDEO_ID` URL에 같은 일을 하며, 시작 시간 등 다른 파라미터는 그대로 둡니다.

## 언어

팝업과 확장 프로그램 이름·설명은 Chrome의 UI 언어를 따릅니다.

- 한국어: `_locales/ko/messages.json`
- 영어: `_locales/en/messages.json`
- 지원하지 않는 언어: 영어로 표시

## Chrome에 직접 설치하기

1. 주소창에 `chrome://extensions`를 입력합니다.
2. 오른쪽 위의 **개발자 모드**를 켭니다.
3. **압축해제된 확장 프로그램을 로드합니다**를 누릅니다.
4. 이 프로젝트 폴더(`youtube-share-link-cleaner`)를 선택합니다.
5. 이미 열려 있던 YouTube 탭을 새로고침합니다.

이후 YouTube의 **공유** 버튼과 **복사** 버튼을 평소처럼 사용하면 됩니다. 자주 설정을 바꾸려면 확장 프로그램을 Chrome 도구 모음에 고정하세요.

코드를 수정한 뒤에는 `chrome://extensions`에서 확장 프로그램의 새로고침 버튼을 누릅니다. 콘텐츠 스크립트를 수정했다면 열려 있던 YouTube 탭도 새로고침해야 합니다.

## GitHub에서 설치하기

Chrome은 GitHub에서 바로 설치하지 못하므로, 개발자 모드로 직접 설치합니다.

1. 저장소 페이지에서 **Code**, **Download ZIP** 순으로 누릅니다. [Releases 페이지](https://github.com/PromotezCitizen/youtube-share-link-cleaner/releases)에 버전별 ZIP이 있으면 그것을 받아도 됩니다.
2. ZIP을 다운로드하고 계속 사용할 폴더에 압축을 풉니다. ZIP 파일 자체를 선택하면 안 됩니다.
3. Chrome에서 `chrome://extensions`를 열고 **개발자 모드**를 켭니다.
4. **압축해제된 확장 프로그램을 로드합니다**를 누르고 `manifest.json`이 들어 있는 압축 해제 폴더를 선택합니다.
5. 이미 열려 있던 YouTube 탭을 새로고침합니다.

새 버전이 나오면 다시 내려받아 압축을 풀고, 확장 프로그램 카드의 새로고침 버튼을 누른 뒤 YouTube 탭을 새로고침합니다. 이 방식은 Chrome이 개발자 모드 경고를 띄울 수 있습니다. 일반 설치는 Chrome 웹 스토어로 하고, GitHub 설치는 개인 사용·테스트·수동 업데이트용입니다.

## 개인정보 및 데이터 처리

- 개인정보를 수집하지 않습니다.
- 방문 기록, 공유 URL, 페이지 내용, 클립보드 내용을 저장하지 않습니다.
- 서버나 제3자에게 아무것도 보내지 않습니다.
- 광고, 분석, 추적 코드가 없습니다.
- YouTube가 복사하려는 URL은 기기 내에서 고쳐 쓴 뒤 버립니다.
- **정리해 복사**는 누를 때만 페이지 URL을 읽어 정리된 형태로 복사하고, 남기지 않습니다.
- `chrome.storage.local`에는 켜짐/꺼짐 설정 두 개만 있습니다.

확장 프로그램을 지우면 이 설정도 같이 지워집니다.

자세한 내용은 [개인정보 처리방침](PRIVACY.md)을 확인해 주세요.

## 권한

`storage` 하나뿐이며, 두 켜짐/꺼짐 설정을 이 기기에 두는 데 씁니다.

## 개발 및 테스트

Node.js 18 이상에서 다음 명령을 실행합니다.

```bash
npm test
```

테스트는 URL 처리 규칙, manifest 구성, 다국어 리소스, 아이콘 파일과 실제 이미지 크기를 확인합니다.

## Chrome 웹 스토어 배포

- 스토어 문구, 권한 설명, 개인정보 입력 내용 및 제출 점검표: [`CHROMEWEBSTORE.md`](CHROMEWEBSTORE.md)
- 개인정보 처리방침: [`PRIVACY.md`](PRIVACY.md)
- 스토어 이미지: `store-assets/` (영문·한글 대문 이미지 포함)
- 최종 현지화 캡처: `store-assets/screenshots/en/`, `store-assets/screenshots/ko/`

스토어 이미지를 다시 만들고 제출용 ZIP을 생성하려면 다음 명령을 실행합니다.

```bash
npm run assets:store
npm run package:store
```

ZIP은 `dist/`에 생기며 확장 프로그램에 필요한 파일만 들어갑니다. 문서, 테스트, 이미지, 스크립트는 빠집니다.

## 문의 및 오류 제보

기능 제안, 오류 제보, 문의는 [GitHub Issues](https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues)에 남겨 주세요. 어떤 YouTube 화면이었는지와 복사된 URL을 같이 적으면 확인이 빠릅니다. 공개하고 싶지 않은 부분은 지우고 올리세요.

이 확장 프로그램은 YouTube 또는 Google과 제휴 관계가 없으며 이들의 보증을 받지 않았습니다.
