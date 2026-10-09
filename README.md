# [○○전도회] 운영 안내 사이트

전도회 인수인계를 위한 안내 사이트입니다. 서버 없이 **JSON 파일만으로** 동작합니다.

- Vue 3 + Vite + TypeScript
- Vue Router, axios
- Tailwind CSS (v4)
- markdown-it + DOMPurify (메모·게시글 본문용)

## 실행

Node.js(LTS 버전)가 필요합니다.

```bash
npm install      # 처음 한 번
npm run dev      # 개발 서버 → http://localhost:5173
npm run build    # 배포용 파일 생성 → docs/
npm run preview  # 빌드 결과 미리보기
```

## 내용 수정하기 (코드 몰라도 됨)

모든 내용은 `public/data/` 폴더의 JSON 파일에 있습니다.

| 파일 | 내용 |
|---|---|
| `meetings.json` | 모임 안내 (월례회, 금요기도회, 기관별 찬양대회) |
| `posts.json` | 게시판 글 |
| `officers.json` | 올해 임원 |

`[ ]`로 표시된 부분은 실제 내용으로 바꿔 주세요.

### 새 모임 추가하기

`meetings.json`에 항목을 하나 복사해 붙여 넣고 `id`(영문, 주소에 사용)와 내용을 바꾸면
홈 카드와 상단 메뉴에 자동으로 추가됩니다.
모바일 하단 탭에는 **앞의 3개 모임만** 표시되니, 순서로 우선순위를 정하세요.

| 항목 | 설명 |
|---|---|
| `icon` | 하단 탭 아이콘: `calendar`, `flame`, `music`, `book` 중 하나 |
| `tone` | 배지 색: `regular`(남색, 정기 모임), `special`(호박색, 연간 행사) |
| `nextDate` | 다음 일정 `YYYY-MM-DD`. 미정이면 지우고 `nextDateText`에 글로 작성 |
| `memo` | 전임자 메모. 마크다운 사용 가능 (`**굵게**`, `- 목록`, `## 제목`) |

### 게시판 글 추가하기

`posts.json`에 항목을 추가합니다. `id`는 겹치지 않는 숫자, `category`는 `공지`, `인수인계`, `자료` 중 하나입니다.
최신 날짜 순으로 자동 정렬됩니다.

> JSON은 쉼표 하나만 빠져도 화면에 "데이터를 불러오지 못했습니다"가 뜹니다.
> 수정 후 문제가 생기면 쉼표와 따옴표를 먼저 확인하세요.

## 폴더 구조

```
public/
  data/            ← 내용(JSON)
src/
  api/             ← 데이터 불러오기 (axios). 나중에 API 서버로 바꿀 때 여기만 수정
  components/      ← 헤더, 하단 탭, 모임 카드, 게시글 줄 등
  views/           ← 홈, 모임 가이드, 게시판, 게시글
  style.css        ← Tailwind 테마 (색·폰트)
  types.ts         ← JSON 데이터 형식 정의
```

## 디자인 바꾸기

색과 폰트는 `src/style.css`의 `@theme` 한 곳에서 관리합니다.
예를 들어 `--color-brand-700` 값을 바꾸면 헤더·버튼 색이 모두 바뀝니다.

## 배포

이 저장소는 **GitHub Pages**(`/docs` 폴더 서빙)로 배포합니다.

1. `npm run build`를 실행하면 `docs/` 폴더에 배포용 파일이 생성됩니다.
2. `docs/` 폴더를 커밋하고 push합니다.
3. GitHub 저장소 **Settings → Pages**에서 Source를 `Deploy from a branch`,
   Branch를 `master` / 폴더를 `/docs`로 설정합니다.
4. 사이트는 `https://rasung82.github.io/mens-ministry/`에서 열립니다.

새로고침·직접 URL 접근 시 404를 막기 위해 라우터는 `createWebHashHistory`를 사용합니다
(URL이 `.../#/board` 형태가 됩니다). `vite.config.ts`의 `base`는 저장소 이름(`/mens-ministry/`)과
맞춰져 있으니, 저장소 이름을 바꾸면 함께 수정하세요.

> JSON(`public/data/*.json`)을 수정한 뒤에는 반드시 `npm run build`를 다시 실행해서
> `docs/` 폴더를 갱신하고 커밋해야 사이트에 반영됩니다.

## 주의

- 사이트는 링크를 아는 누구나 볼 수 있습니다. **임원 전화번호** 등 개인정보는
  `officers.json`의 `phone`을 비워 두거나, 호스팅의 접근 제한 기능(예: Cloudflare Access)을 함께 쓰세요.
- 체크리스트의 체크 표시는 화면에서만 동작하고 저장되지 않습니다.
- 나중에 API 서버가 생기면 `src/api/client.ts`의 `baseURL`과 `src/api/index.ts`의 경로만 바꾸면 됩니다.
