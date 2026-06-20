# React → Vue 3 마이그레이션 진행 상황

## 완료된 작업

### 설정 파일
- [x] `package.json` — React 제거, Vue 3 / @vitejs/plugin-vue / vite-svg-loader / vue-tsc 추가
- [x] `vite.config.ts` — react() → vue(), svgr() → svgLoader()
- [x] `tsconfig.json` — @vue/tsconfig 기반으로 변경, jsx 제거
- [x] `eslint.config.js` — react 플러그인 → eslint-plugin-vue
- [x] `src/vite-env.d.ts` — SVG Vue 컴포넌트 타입 선언 추가

### 엔트리 포인트
- [x] `src/main.ts` — createApp(App).mount('#root') (기존 index.tsx 대체)
- [x] `src/App.vue` — 기존 App.tsx 변환 (ModalProvider 포함)

### 전역 상태 (Context API → Composable)
- [x] `src/component/store/index.ts` — useNaver(), useKakao() composable로 재작성
  - 기존: StoreContext + StoreProvider + hook.ts → 3개 파일
  - 변환: module-level ref + onMounted 스크립트 로딩 → 1개 파일

### 모달 시스템 (React Portal → Vue Teleport)
- [x] `src/component/modal/ModalProvider.vue` — 기존 provider.tsx 변환
  - focus trap, MutationObserver 포함
- [x] `src/component/modal/Modal.vue` — 기존 Modal.tsx 변환
  - createPortal → `<Teleport to=".modals-wrapper">`
  - `modalState: [boolean, setter]` → `v-model:open`

### 공통 컴포넌트
- [x] `src/component/button/Button.vue` — 기존 button/index.tsx 변환
- [x] `src/component/lazyDiv/LazyDiv.vue` — 기존 lazyDiv/index.tsx 변환
- [x] `src/component/bgEffect/BGEffect.vue` — 기존 bgEffect/index.tsx 변환

---

## 남은 작업

### 컨텐츠 컴포넌트 (미완료)
- [ ] `src/component/cover/Cover.vue`
- [ ] `src/component/invitation/Invitation.vue`
- [ ] `src/component/calendar/Calendar.vue`
- [ ] `src/component/shareButton/ShareButton.vue`
- [ ] `src/component/location/Location.vue`
- [ ] `src/component/location/Map.vue`

### 복잡한 컴포넌트 (미완료)
- [ ] `src/component/gallery/Gallery.vue` (캐러셀 드래그 로직 포함)
- [ ] `src/component/information/Information.vue`
- [ ] `src/component/information/Attendance.vue`
- [ ] `src/component/information/AttendanceFormModal.vue`
- [ ] `src/component/guestbook/GuestBook.vue`
- [ ] `src/component/guestbook/WriteGuestBookModal.vue`
- [ ] `src/component/guestbook/GuestBookListModal.vue`
- [ ] `src/component/guestbook/DeleteGuestBookModal.vue`

### 마무리 (미완료)
- [ ] 기존 React 파일 삭제
  - `src/index.tsx`
  - `src/App.tsx`
  - `src/component/store/context.ts`, `hook.ts`, `provider.tsx`
  - `src/component/modal/context.ts`, `index.ts`, `Modal.tsx`, `provider.tsx`
  - `src/component/button/index.tsx`
  - `src/component/lazyDiv/index.tsx`
  - `src/component/bgEffect/index.tsx`
  - `src/component/cover/index.tsx`
  - `src/component/invitation/index.tsx`
  - `src/component/calendar/index.tsx`
  - `src/component/gallery/index.tsx`
  - `src/component/location/index.tsx`, `map.tsx`
  - `src/component/information/index.tsx`, `attendance.tsx`
  - `src/component/guestbook/index.tsx`
  - `src/component/shareButton/index.tsx`
- [ ] `npm install` 실행 (Vue 패키지 설치)
- [ ] `npm run build` 로 빌드 검증
- [ ] `npm run dev` 로 동작 확인

---

## 주요 변환 패턴 참고

| React | Vue 3 |
|-------|-------|
| `useState(false)` | `ref(false)` |
| `useEffect(() => {}, [])` | `onMounted(() => {})` |
| `useMemo(() => x, [deps])` | `computed(() => x)` |
| `useCallback(fn, [deps])` | 일반 function |
| `useRef(null)` | `ref(null)` (template ref) |
| `useRef(value)` | 일반 변수 (반응성 불필요 시) |
| Context API | module-level ref + composable |
| createPortal | `<Teleport to="...">` |
| `className` | `class` |
| `onClick` | `@click` |
| SVG `?react` import | `vite-svg-loader` (suffix 없이 import) |
| `modalState[1](true)` | `modalOpen.value = true` |
| `modalState` prop | `v-model:open` |

## Modal 사용법 변경

```vue
<!-- 이전 (React) -->
const modalState = useState(false)
<Modal modalState={modalState} className="my-modal">...</Modal>
<Button onClick={() => modalState[1](true)}>열기</Button>

<!-- 이후 (Vue) -->
const modalOpen = ref(false)
<Modal v-model:open="modalOpen" modal-class="my-modal">...</Modal>
<Button @click="modalOpen = true">열기</Button>
```
