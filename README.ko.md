# YouTube Share Link Cleaner

[English](README.md) | 한국어

YouTube 공유 링크의 `si`를 제거하고, 일반 동영상·Shorts 페이지에 정리 링크 복사 버튼을 추가하는 Chrome 확장 프로그램입니다.

![YouTube Share Link Cleaner 아이콘](icons/icon-128.png)

## 주요 기능

- YouTube 공유 링크에서 `si` 파라미터만 자동으로 제거합니다.
- 시작 시간(`t`), 재생목록(`list`)과 같은 다른 정보는 유지합니다.
- 확장 프로그램 팝업에서 자동 정리를 즉시 켜거나 끌 수 있습니다.
- 일반 YouTube 동영상과 Shorts 페이지에 정리 링크 복사 버튼을 추가합니다.
- Chrome UI 언어에 맞춰 한국어 또는 영어로 표시됩니다.
- 외부 서버, 사용자 계정, 분석 도구를 사용하지 않습니다.

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

다른 웹사이트에는 스크립트를 삽입하지 않으며, 일반 웹페이지에서 복사하는 URL에는 관여하지 않습니다.

## 켜기 및 끄기

1. Chrome 도구 모음의 확장 프로그램 버튼을 누릅니다.
2. **YouTube Share Link Cleaner**를 선택합니다.
3. **자동으로 정리** 토글을 켜거나 끕니다.

설정은 현재 기기에 저장되며 열려 있는 YouTube 탭에도 즉시 적용됩니다. 기본값은 켜짐입니다.

## 동영상 페이지에서 바로 복사

일반 YouTube 동영상 페이지에서는 YouTube의 동작 버튼 옆에 **정리해 복사** 버튼이 추가됩니다. Shorts 페이지에서는 오른쪽 세로 동작 메뉴에 작은 **복사** 버튼이 추가됩니다. 팝업을 열지 않고 눌러 현재 링크의 `si`를 제거하고 짧게 만든 뒤 복사할 수 있습니다.

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

Chrome은 GitHub 페이지에서 확장 프로그램을 바로 설치하지 않습니다. GitHub에서 배포하는 파일은 Chrome의 개발자 모드로 수동 설치해야 합니다.

1. 저장소 페이지에서 **Code → Download ZIP**을 선택합니다. 버전별 ZIP이 올라온 경우에는 선택 사항인 [Releases 페이지](https://github.com/PromotezCitizen/youtube-share-link-cleaner/releases)에서 받아도 됩니다.
2. ZIP을 다운로드하고 계속 사용할 폴더에 압축을 풉니다. ZIP 파일 자체를 선택하면 안 됩니다.
3. Chrome에서 `chrome://extensions`를 열고 **개발자 모드**를 켭니다.
4. **압축해제된 확장 프로그램을 로드합니다**를 누르고 `manifest.json`이 들어 있는 압축 해제 폴더를 선택합니다.
5. 이미 열려 있던 YouTube 탭을 새로고침합니다.

새 압축 파일이 나오면 내려받아 압축을 푼 뒤 확장 프로그램 카드의 새로고침 버튼을 누릅니다. 업데이트 후 YouTube 탭도 새로고침하세요. 이 방식으로 설치한 확장 프로그램은 Chrome에 개발자 모드 경고가 표시될 수 있습니다. 일반 사용자는 Chrome 웹 스토어 설치를 권장하며, GitHub 설치는 개인 사용·테스트 또는 수동 업데이트를 감수할 수 있는 사용자를 위한 방법입니다. GitHub Release는 버전별 다운로드와 변경사항을 제공하고 싶을 때만 선택적으로 만들면 됩니다.

## 개인정보 및 데이터 처리

- 개인정보를 수집하지 않습니다.
- 방문 기록, 공유 URL, 페이지 내용 또는 클립보드 내용을 저장하지 않습니다.
- 사용자 데이터를 외부 서버나 제3자에게 전송하지 않습니다.
- 광고, 분석 도구 또는 추적 코드를 포함하지 않습니다.
- YouTube 페이지가 복사하려는 URL은 `si`를 제거하기 위해 사용자의 기기 안에서만 순간적으로 처리됩니다.
- 일반 동영상 페이지에서 **정리해 복사**를 누를 때만 현재 URL을 기기 안에서 처리한 뒤 정리된 값으로 복사합니다. 해당 값은 보관하거나 전송하지 않습니다.
- `chrome.storage.local`에는 자동 정리 기능의 켜짐/꺼짐 값만 저장됩니다.

확장 프로그램을 제거하면 Chrome이 해당 확장 프로그램의 로컬 설정도 함께 제거합니다.

자세한 내용은 [개인정보 처리방침](PRIVACY.md)을 확인해 주세요.

## 권한

이 확장 프로그램이 요청하는 권한은 `storage` 하나입니다. 자동 정리 토글 상태를 현재 기기에 저장하는 용도로만 사용합니다.

## 개발 및 테스트

Node.js 18 이상에서 다음 명령을 실행합니다.

```bash
npm test
```

테스트는 URL 처리 규칙, manifest 구성, 다국어 리소스, 아이콘 파일과 실제 이미지 크기를 확인합니다.

## Chrome 웹 스토어 배포

- 스토어 문구, 권한 설명, 개인정보 입력 내용 및 제출 점검표: [`CHROMEWEBSTORE.md`](CHROMEWEBSTORE.md)
- 개인정보 처리방침: [`PRIVACY.md`](PRIVACY.md)
- 스토어 이미지: `store-assets/`

스토어 이미지를 다시 만들고 제출용 ZIP을 생성하려면 다음 명령을 실행합니다.

```bash
npm run assets:store
npm run package:store
```

ZIP은 `dist/`에 생성되며 확장 프로그램 실행에 필요한 파일만 포함합니다. 문서, 테스트, 스토어 이미지 및 개발 스크립트는 제외됩니다.

## 문의 및 오류 제보

기능 제안, 오류 제보 및 문의는 [GitHub Issues](https://github.com/PromotezCitizen/youtube-share-link-cleaner/issues)를 이용해 주세요. 문제를 재현할 수 있는 YouTube 화면 종류와 복사된 URL 예시를 함께 남기면 확인에 도움이 됩니다. URL에 공개하고 싶지 않은 정보가 있다면 제거한 뒤 첨부하세요.

이 확장 프로그램은 YouTube 또는 Google과 제휴 관계가 없으며 이들의 보증을 받지 않았습니다.
