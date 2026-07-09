# 포트폴리오 수정 안내

이 문서는 포트폴리오 주인이 직접 내용을 수정할 때 어떤 파일을 열어야 하는지 안내합니다.

## 가장 많이 수정하는 파일

### 1. 소개 문구, 경력, 연락처 수정

열 파일:

```text
index.html
```

이 파일에서 수정할 수 있는 내용:

- 메인 첫 화면 문구
- 자기소개 문장
- 경력 / 이력
- 편집 역량 퍼센트
- Discord 아이디
- 이메일 주소
- Contact 섹션 문구

찾으면 좋은 문구:

```text
영상으로
Jimin
Career
O2 BLAST
POKER FACE
BELOSREA
jimin719
jimin0377@naver.com
```

예시:

```html
<p class="lead">게임·유튜브 콘텐츠 편집을 전문으로 하는 영상 편집자 Jimin의 포트폴리오입니다.</p>
```

위 문장을 바꾸면 메인 소개 문구가 바뀝니다.

## 2. 영상 목록, 카테고리, 조회수 수정

열 파일:

```text
js/main.js
```

이 파일에서 수정할 수 있는 내용:

- 포트폴리오 영상 추가
- 기존 영상 삭제
- YouTube 영상 ID 변경
- 카테고리 이름 변경
- 조회수 숫자 변경
- 카테고리 표시 순서 변경

### 카테고리 수정

`CATS` 부분을 수정합니다.

```js
const CATS = ["ALL","메이플스토리&랜드","DONGHAK","BELOSREA","POKER FACE","O2 BLAST"];
```

주의:

- `"ALL"`은 삭제하지 않는 것이 좋습니다.
- 새 카테고리를 만들면 영상 데이터의 `cat` 값도 같은 이름으로 맞춰야 합니다.

### 영상 추가 / 수정

`VIDEOS` 부분을 수정합니다.

```js
{cat:"DONGHAK", id:"zKo46LYb7J8", views:32000}
```

각 값의 의미:

- `cat`: 영상이 들어갈 카테고리
- `id`: YouTube 영상 ID
- `views`: 조회수 숫자

YouTube 영상 ID는 주소에서 확인할 수 있습니다.

예시:

```text
https://www.youtube.com/watch?v=zKo46LYb7J8
```

이 주소에서 영상 ID는 아래 부분입니다.

```text
zKo46LYb7J8
```

### 영상 하나 추가 예시

```js
{cat:"DONGHAK", id:"새로운영상ID", views:12000},
```

주의:

- 마지막 항목이 아니라면 줄 끝에 쉼표 `,`를 붙입니다.
- `cat` 이름은 `CATS`에 있는 카테고리 이름과 정확히 같아야 합니다.

## 3. 색상, 크기, 애니메이션, 반응형 디자인 수정

열 파일:

```text
css/styles.css
```

이 파일에서 수정할 수 있는 내용:

- 배경색
- 포인트 컬러
- 글자 크기
- 카드 디자인
- 버튼 디자인
- 모바일 화면 스타일
- 스크롤 등장 애니메이션
- hover 효과

주요 색상은 파일 위쪽의 `:root`에서 관리합니다.

```css
:root{
  --bg:#09090c;
  --text:#f2f2f5;
  --accent:#8c6bff;
  --accent-2:#c44bff;
}
```

예를 들어 포인트 컬러를 바꾸고 싶으면 `--accent`, `--accent-2` 값을 수정하면 됩니다.

## 4. README 수정

열 파일:

```text
README.md
```

이 파일은 GitHub 레포 첫 화면에 보이는 소개 문서입니다.

사이트 화면에는 직접 보이지 않습니다.

## 수정 후 확인 방법

수정 후에는 `index.html`을 브라우저로 열어서 확인합니다.

또는 터미널에서 아래 명령어로 간단한 미리보기 서버를 실행할 수 있습니다.

```bash
python3 -m http.server 8000
```

그 다음 브라우저에서 아래 주소를 엽니다.

```text
http://localhost:8000
```

## 수정할 때 주의할 점

- `index.html`, `js/main.js`, `css/styles.css` 파일 이름은 바꾸지 않는 것이 좋습니다.
- 따옴표 `" "`와 쉼표 `,`를 지우면 JavaScript가 동작하지 않을 수 있습니다.
- YouTube 영상 ID만 넣어야 하며 전체 주소를 `id`에 넣지 않습니다.
- 연락처를 바꿀 때는 `index.html`과 `js/main.js` 안의 연락처 문구를 함께 확인하는 것이 좋습니다.
- 디자인을 크게 바꾸기 전에는 파일을 복사해 백업해두면 안전합니다.
