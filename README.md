# 모바일 청첩장 템플릿 | Wedding Invitation Template

React + TypeScript로 제작된 모바일 웨딩 청첩장 웹 애플리케이션 템플릿입니다.  
`src/const.ts` 파일만 수정하면 신랑·신부 정보, 날짜, 장소 등을 손쉽게 커스터마이징할 수 있습니다.

**라이브 데모:** https://juhonamnam.github.io/wedding-invitation

> 실제 결혼식을 위해 직접 제작된 청첩장으로, 결혼식 이후 전화번호·계좌번호 등 개인정보와 웨딩 사진은 제거된 상태입니다. 갤러리 이미지는 AI 생성 사진으로 대체되었습니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 커버 섹션 | 신랑·신부 이름과 결혼식 날짜를 표시하는 메인 화면 |
| 모시는 글 | 결혼식 초대 문구 |
| 달력 | 결혼식 날짜를 달력으로 시각화 (공휴일 표시 포함) |
| 사진 갤러리 | 웨딩 사진을 슬라이드 형태로 표시 |
| 오시는 길 | 네이버 지도 임베드 + 네이버·카카오·티맵 길찾기 연동 |
| 축의금 / 연락처 | 신랑·신부 양가의 계좌번호 및 전화번호 표시 |
| 참석 의사 전달 | 하객이 참석 여부를 서버로 전송 |
| 방명록 | 하객이 축하 메시지를 작성·조회·삭제 (서버 연동 또는 오프라인 JSON 모드) |
| 카카오톡 공유 | 카카오톡 공유하기 버튼으로 초대장 링크 전송 |
| 배경 애니메이션 | 꽃잎 내리기 등의 배경 효과 |
| 반응형 디자인 | 모바일 기준으로 설계, 데스크톱에서도 정상 표시 |

---

## 기술 스택

- **프레임워크:** React 19 + TypeScript
- **번들러:** Vite
- **스타일:** SASS (`.scss`)
- **날짜 처리:** Day.js (한국어 로캘, 타임존 지원)
- **지도:** 네이버 지도 Maps API
- **공유:** 카카오 SDK (Share, Navi)
- **배포:** GitHub Pages (GitHub Actions 자동 배포)

---

## 프로젝트 구조

```
src/
├── const.ts              # 커스터마이징 핵심 파일 (날짜, 이름, 장소, 계좌 등)
├── env.ts                # 환경변수 추출
├── App.tsx               # 루트 컴포넌트 (섹션 조합)
├── component/
│   ├── cover/            # 메인 커버 섹션
│   ├── invitation/       # 모시는 글
│   ├── calendar/         # 결혼식 날짜 달력
│   ├── gallery/          # 사진 갤러리
│   ├── location/         # 오시는 길 + 지도 + 내비게이션
│   ├── information/      # 축의금 · 연락처 · 참석 의사
│   ├── guestbook/        # 방명록 (작성 · 조회 · 삭제 · 페이지네이션)
│   ├── shareButton/      # 카카오톡 공유 버튼
│   ├── bgEffect/         # 배경 애니메이션 효과
│   ├── modal/            # 공통 모달 컴포넌트
│   ├── button/           # 공통 버튼 컴포넌트
│   ├── lazyDiv/          # 지연 렌더링 래퍼
│   └── store/            # 카카오 · 네이버 SDK 전역 상태
└── images/               # 커버 및 갤러리 이미지
```

---

## 시작하기

### 사전 요구사항

- Node.js (`.nvmrc`에 명시된 버전)

### 설치 및 실행

```bash
# 1. 저장소 복제
git clone https://github.com/juhonamnam/wedding-invitation.git
cd wedding-invitation

# 2. 의존성 설치
npm install

# 3. 환경변수 파일 생성
cp .env.example .env

# 4. 개발 서버 실행
npm run dev
```

---

## 환경변수 설정 (`.env`)

| 변수명 | 필수 | 설명 |
|--------|------|------|
| `VITE_NAVER_MAP_CLIENT_ID` | 권장 | 네이버 지도 표시용 Client ID. [Naver Cloud Platform](https://www.ncloud.com/)에서 발급 (Dynamic Map API) |
| `VITE_KAKAO_SDK_JS_KEY` | 권장 | 카카오톡 공유·내비 기능용 JavaScript Key. [Kakao Developers](https://developers.kakao.com/)에서 발급 |
| `VITE_SERVER_URL` | 선택 | 방명록·참석 의사 전달 기능을 위한 백엔드 URL (예: `http://localhost:8080/api`). 서버 소스: [wedding-invitation-server](https://github.com/juhonamnam/wedding-invitation-server) |
| `VITE_STATIC_ONLY` | 선택 | `true`로 설정 시 서버 연동 기능(방명록 작성·참석 전달)을 비활성화하여 순수 정적 페이지로 운영 |

> `VITE_SERVER_URL`을 설정하지 않으면 방명록은 `src/component/guestbook/offlineGuestBook.json`의 데이터를 읽기 전용으로 표시합니다. 결혼식 후 아카이브 용도로 활용 가능합니다.

---

## 커스터마이징

### 1. 웨딩 정보 수정 — `src/const.ts`

| 상수 | 설명 |
|------|------|
| `WEDDING_DATE` | 결혼식 날짜 및 시간 (`dayjs.tz(...)`) |
| `HOLIDAYS` | 당월 공휴일 날짜 배열 (달력 표시용) |
| `LOCATION` / `LOCATION_ADDRESS` | 예식장 이름 및 주소 |
| `WEDDING_HALL_POSITION` | 지도용 좌표 `[경도, 위도]` |
| `NMAP_PLACE_ID` / `KMAP_PLACE_ID` | 네이버·카카오 지도 장소 ID |
| `BRIDE_*` / `GROOM_*` | 신부·신랑 이름, 부모님 정보 |
| `BRIDE_INFO` / `GROOM_INFO` | 신부·신랑 측 전화번호 및 계좌번호 |

### 2. 이미지 교체

- `src/images/cover.png` — 커버 이미지
- `src/images/image1.png` ~ `image12.png` — 갤러리 이미지 (총 12장)
- `public/preview_image.png` — 카카오톡 공유 시 미리보기 이미지

> 원본 웨딩 사진은 고해상도인 경우가 많으므로 **가로·세로 1000px 내외**로 리사이징 후 교체를 권장합니다.

### 3. 문구 수정

- `src/component/invitation/` — 모시는 글
- `src/component/location/` — 오시는 길 안내 문구
- `src/component/information/` — 식사 안내 문구

### 4. 스타일 수정

- 각 컴포넌트 폴더의 `index.scss` 파일을 수정합니다.
- 루트 `font-size`가 화면 크기에 따라 동적으로 조절되므로 가능한 `rem` 단위를 사용하세요.

---

## 배포

### GitHub Pages (권장)

1. 저장소를 본인 GitHub 계정으로 **Fork**
2. `package.json`의 `homepage` 필드를 본인 GitHub Pages URL로 수정
3. 저장소 **Settings > Actions > General** 에서 Workflow permissions를 `Read and write permissions`로 변경
4. **Settings > Pages** 에서 배포 소스를 `GitHub Actions`로 설정
5. **Settings > Secrets and variables > Actions** 에서 환경변수 추가:
   - Secrets: `VITE_NAVER_MAP_CLIENT_ID`, `VITE_KAKAO_SDK_JS_KEY`
   - Variables: `VITE_SERVER_URL`, `VITE_STATIC_ONLY`
6. `main` 브랜치에 push 하면 자동 배포

### 기타 정적 호스팅 플랫폼

```bash
npm run build   # build/ 디렉토리에 정적 파일 생성
```

생성된 `build/` 디렉토리를 Netlify, Vercel, S3 등 원하는 플랫폼에 업로드합니다.

---

## 업데이트 내역

### 2025.10.07 — v0.1.1

- TypeScript 타입 에러 수정
- 웨딩 날짜 포맷 개선 (분 단위가 있을 경우 표시)
- `src/const.ts` 사용법 주석 보강
- 일부 의존성 버전 상향 (React2Shell 취약점 선제 대응)

### 2025.09.11 — v0.1.0

- CRA → Vite 마이그레이션
- `yarn` → `npm` 전환
- `index.html`, `manifest.json` 등 `src/const.ts` 상수가 반영되지 않던 문제 개선
- `VITE_STATIC_ONLY` 환경변수로 서버 의존 기능 비활성화 지원
- GitHub Actions 환경변수명에 `VITE_` 접두사 누락 문제 수정
- Naver Map API 최신 업데이트 반영

---

## 라이선스

MIT License — 자유롭게 사용·수정·배포 가능합니다.
