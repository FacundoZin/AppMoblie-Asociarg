# Tasks: Auditoria Completa Base Proyecto

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~800-1100 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR a → PR b → PR c → PR d → PR e → PR f → PR g |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| a | Build fixes: splash asset, tsconfig, font loading | PR a | `npx tsc --noEmit` | `npx expo start --no-dev --minify` | Revert splash + tsconfig + _layout changes |
| b | Tooling: ESLint + Prettier + typecheck/lint scripts | PR b | `npm run lint` + `npm run typecheck` | `npx eslint . --max-warnings 0` | Remove eslint.config.mjs + .prettierrc + package.json scripts |
| c | Theme expansion + hex sweep: *Light tokens, replace ~25 hardcoded hex | PR c | `grep -rn '#[0-9a-fA-F]\{3,6\}' src/ --include='*.tsx'` | Manual screen render check | Revert colors.ts + component hex→theme changes |
| d | UI kit: delete dead components, extract Screen/PatternCard/StatCard | PR d | `npx tsc --noEmit` after deletes | Render each screen visually | Revert new common/ files + restore deleted components |
| e | Data layer: move mocks to mocks/, create hook shapes, cleanup contact service | PR e | `grep -rn 'const.*MOCK' src/features/*/hooks/` | Render screens that consume hooks | Revert mocks/ + hook refactors + service cleanup |
| f | Feature screens: Screen scaffold, notification alignment, dead buttons, animation convention | PR f | `grep -rn 'SafeAreaView' src/features/*/screens/` | Full tab-by-tab render pass | Revert screen refactor changes individually |
| g | Docs + cleanup: AGENTS.md, delete empty dirs, remove unreferenced assets | PR g | `find src -empty -type d` | `npx expo start` still works | Revert doc changes + restore deleted dirs |

## Phase 1: Build Fixes (Slice a) — ~100-150 lines

- [x] 1.1 Restore `assets/splash-icon.png` (check `git log --diff-filter=D` for last known version) or remove its reference from `app.json`/`app.config.ts`
- [x] 1.2 Remove deprecated `baseUrl` from `tsconfig.json` (fixes TS5101)
- [x] 1.3 Add `noUnusedLocals: true`, `noUnusedParameters: true`, `esModuleInterop: true` to `tsconfig.json`
- [x] 1.4 Add `expo-font` to `package.json` dependencies if not present
- [x] 1.5 Wire font loading in `app/_layout.tsx` with `expo-splash-screen` keep-visible gating (hide splash only after `Font.loadAsync` resolves)
- [x] 1.6 Verify: `npx tsc --noEmit` passes with zero errors, `npx expo start --no-dev --minify` bundles

## Phase 2: Tooling Baseline (Slice b) — ~80-120 lines

- [x] 2.1 Install `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-native`, `prettier`, `eslint-config-prettier` as devDependencies
- [x] 2.2 Create `eslint.config.mjs` with flat config: react-native rules, no-`any` styles, no hex literals in `.tsx` (allow in `theme/`)
- [x] 2.3 Create `.prettierrc` with default Expo/RN settings
- [x] 2.4 Add `typecheck` (`tsc --noEmit`) and `lint` (`eslint . --max-warnings 0`) scripts to `package.json`
- [x] 2.5 Verify: `npm run typecheck` and `npm run lint` both pass (fix any violations surfaced by strict extras)

## Phase 3: Theme + Hex Sweep (Slice c) — ~150-200 lines

- [x] 3.1 Add `infoLight`, `warningLight`, `neutralLight`, `errorLight` tokens to `src/theme/colors.ts` (both light and dark palettes)
- [x] 3.2 Find all hardcoded hex colors in `.tsx` files (exclude `theme/`) — grep `#[0-9a-fA-F]{3,8}`
- [x] 3.3 Replace each hardcoded hex with corresponding theme token reference (`colors.xxx`)
- [x] 3.4 Update any component that derives colors dynamically to use theme tokens
- [x] 3.5 Verify: zero hardcoded hex in components (`grep` returns no matches), all screens render with correct colors

## Phase 4: UI Kit Cleanup (Slice d) — ~200-300 lines

- [x] 4.1 Delete dead components: `animated-button.tsx`, `animated-card.tsx`, `stat-item.tsx`, `divider.tsx` from `src/components/ui/`
- [x] 4.2 Delete dead feature components: `user-card.tsx` (home), `contact-action-card.tsx` (contact), `notification-summary.tsx` (notifications)
- [x] 4.3 Delete `src/hooks/use-stagger-animation.ts` (rules-of-hooks violation + unused)
- [x] 4.4 Update barrel exports (`index.ts`) in `components/ui/`, `features/*/components/` to remove deleted entries
- [x] 4.5 Fix `any` style props in `fade-in-up.tsx` and `skeleton.tsx` → `StyleProp<ViewStyle>`
- [x] 4.6 Create `src/components/common/screen.tsx` with `ScreenProps` (children, backgroundColor, edges) using SafeAreaView + theme background
- [x] 4.7 Create `src/components/common/pattern-card.tsx` with `PatternCardProps` (children, variant, style) — extract two-circle decorative pattern
- [x] 4.8 Create `src/components/common/stat-card.tsx` with `StatCardProps` (icon, label, value, color, bgColor)
- [x] 4.9 Create `src/components/common/index.ts` barrel export for Screen, PatternCard, StatCard
- [x] 4.10 Verify: `npx tsc --noEmit` passes, no missing imports, deleted components have zero references

## Phase 5: Data Layer (Slice e) — ~150-250 lines

- [x] 5.1 Create `src/features/home/mocks/user.mock.ts` — move mock user data from `use-user.ts`
- [x] 5.2 Create `src/features/events/mocks/events.mock.ts` — move mock event data from `use-events.ts`
- [x] 5.3 Create `src/features/profile/mocks/profile.mock.ts` — move mock profile data from `use-profile.ts`
- [x] 5.4 Create `src/features/notifications/mocks/notifications.mock.ts` — move mock notification data from `use-notifications.ts`
- [x] 5.5 Create `src/features/payments/mocks/payments.mock.ts` — move mock payment data from `use-payments.ts`
- [x] 5.6 Refactor each `use-*.ts` hook to import from `../mocks/` and return proper shape: `{ data, isLoading, error, refresh }`
- [x] 5.7 Remove dead URL-builder methods from `src/features/contact/services/contact.service.ts` *(completed early in slice a — methods were verified dead)*
- [x] 5.8 Update hook barrel exports (`features/*/hooks/index.ts`)
- [x] 5.9 Verify: `grep -rn 'const.*MOCK' src/features/*/hooks/` returns zero, hooks compile with strict types

## Phase 6: Feature Screens (Slice f) — ~200-300 lines

- [ ] 6.1 Wrap `home-screen.tsx` content in `<Screen>` scaffold, remove manual `SafeAreaView`
- [ ] 6.2 Wrap `profile-screen.tsx` content in `<Screen>` scaffold, remove manual safe-area handling
- [ ] 6.3 Wrap `events-screen.tsx` content in `<Screen>` scaffold
- [ ] 6.4 Wrap `contact-screen.tsx` content in `<Screen>` scaffold
- [ ] 6.5 Wrap `notifications-screen.tsx` content in `<Screen>`, replace inline summary with `<StatCard>`
- [ ] 6.6 Wrap `payments-screen.tsx` content in `<Screen>` scaffold
- [ ] 6.7 Update `HeroCard` (home) to use `<PatternCard variant="primary">` internally
- [ ] 6.8 Update `ProfileHero` (profile) to use `<PatternCard variant="primary">` internally
- [ ] 6.9 Update `FeaturedEventCard` (events) to use `<PatternCard variant="surface">` internally
- [ ] 6.10 Update `SummaryCard` (home) to use `<StatCard>`
- [ ] 6.11 Align notification type/category — unify to single system, verify icon/badge mapping
- [ ] 6.12 Remove dead buttons (onPress-less) and dead filter states from all screens
- [ ] 6.13 Remove nested `FadeInUp` from card components — animation lives at screen level only
- [ ] 6.14 Update `app/+not-found.tsx` to use `<Screen>` + theme tokens
- [ ] 6.15 Update `app/(tabs)/pagos/[id].tsx` and `app/(tabs)/convocatorias/[id].tsx` to use `<Screen>`
- [ ] 6.16 Verify: `grep -rn 'SafeAreaView' src/` returns zero matches outside `common/screen.tsx`, all screens render correctly

## Phase 7: Docs + Cleanup (Slice g) — ~100-150 lines

- [ ] 7.1 Delete empty placeholder dirs: `src/constants/`, `src/utils/`, `src/services/`, `src/types/`
- [ ] 7.2 Remove any imports referencing deleted placeholder dirs
- [ ] 7.3 Delete unreferenced assets (verify no imports point to them)
- [ ] 7.4 Add conventions section to `AGENTS.md`: colors (theme-only), layout (Screen scaffold), animation (screens animate, cards pure), imports (barrel rules), data access (hooks → mocks)
- [ ] 7.5 Add code conventions table: naming (PascalCase/camelCase/UPPER_SNAKE), import order, JSDoc requirements
- [ ] 7.6 Verify: `npx expo start` still works, `npx tsc --noEmit` passes, `npm run lint` passes
