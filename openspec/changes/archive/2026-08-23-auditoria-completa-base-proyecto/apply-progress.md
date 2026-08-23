# Apply Progress: auditoria-completa-base-proyecto

> Phase: apply · Store: openspec · Mode: Standard (strict_tdd: false) · Date: 2026-08-23
> Delivery: auto-chain, stacked-to-main — 7 work-unit commits on `main`, all slices implemented in sequence.

## Status

**57/57 tasks complete across 7 slices (a–g).** All gates green: `npm run typecheck` (tsc --noEmit, zero errors), `npm run lint` (eslint . --max-warnings 0, zero warnings), `npx expo export --platform web` bundles without missing-asset errors.

## Work Unit Evidence

| Slice | Focused test command and exact result | Runtime harness and exact result | Rollback boundary |
|-------|---------------------------------------|----------------------------------|-------------------|
| a | `npx tsc --noEmit` → PASS (after TS5090 paths fix); unused-import sweep | `npx expo export --platform web` → bundle succeeds (asset resolved) | Revert commit `6fd24d2` (splash + tsconfig + _layout + fonts) |
| b | `npm run typecheck` + `npm run lint` → both PASS | `npx eslint . --max-warnings 0` → zero problems | Revert `50d4b98` (eslint.config.mjs, .prettierrc, package.json scripts/devDeps) |
| c | `grep '#[0-9a-fA-F]{3,8}' src/ app/ --glob '*.tsx'` → zero matches | tsc + lint PASS after token sweep | Revert `328b0c8` (colors.ts + hex→token replacements) |
| d | `npx tsc --noEmit` → PASS after deleting 9 dead files; grep for deleted names → only self-references | tsc + lint PASS | Revert `a97ef01` (restore dead files, remove common/) |
| e | `grep 'const.*[Mm]ock' src/features/*/hooks/` → only `useState<...>(mockX)` initializers (mocks imported from `mocks/`) | tsc + lint PASS | Revert `fbb8e51` (mocks/ + hook refactors; screens back to constants) |
| f | `grep SafeAreaView src/` → only `components/common/screen.tsx` (4 hits, 1 file) | `npx expo export --platform web` → bundle succeeds; tsc + lint PASS | Revert `8a4546c` (screen migrations; individual screens revertable) |
| g | `find src -empty -type d` → zero empty dirs; grep for `Logo Asociarg|src/constants|...` → zero | `npx expo export --platform web` → bundle succeeds; tsc + lint PASS | Revert `314afb7` (docs + deletions) |

## Completed Tasks

### Phase 1: Build Fixes (Slice a) — 6/6
- [x] 1.1 `assets/splash-icon.png` was **never in git history** (`git log --diff-filter=D` empty) → references removed/replaced: `app.json` splash image → `./assets/icon.png`; `splash-screen.tsx` require → icon.png. Also fixed leaked nested `setTimeout` in splash-screen and removed unused `withDelay` import.
- [x] 1.2 `baseUrl` removed from tsconfig (TS5101 fixed); `paths` entries now `./src/*` (TS5090 requirement).
- [x] 1.3 Added `noUnusedLocals`, `noUnusedParameters`, `esModuleInterop`. **~50 unused-import/variable errors surfaced and fixed across 25+ files** (this also completed 5.7 early: dead URL-builder methods in `contact.service.ts` deleted).
- [x] 1.4 `expo-font@~14.0.12` (SDK 54-compatible — `npx expo install` initially picked 57.0.1, corrected manually) + `@expo-google-fonts/manrope@^0.4.2` installed.
- [x] 1.5 `app/_layout.tsx` wired: `useFonts` (5 Manrope weights) + `expo-splash-screen` `preventAutoHideAsync` → `hideAsync` after fonts; custom animated SplashScreen kept as brand overlay.
- [x] 1.6 `npx tsc --noEmit` zero errors; `expo export` bundles.

### Phase 2: Tooling Baseline (Slice b) — 5/5
- [x] 2.1 devDeps: eslint@^9, @eslint/js, typescript-eslint@^8, eslint-plugin-react-native@^5 (flat-config compatible), prettier@^3, eslint-config-prettier.
- [x] 2.2 `eslint.config.mjs` flat config: TS recommended, react-native rules (no-unused-styles, split-platform-components), `no-explicit-any` error, hex-literal ban via `no-restricted-syntax` on `**/*.tsx` (theme dir exempt). Deviation: `react-native/no-inline-styles` NOT enabled — dynamic inline styles are idiomatic until Screen migration; task list did not require it.
- [x] 2.3 `.prettierrc`: semi, singleQuote, trailingComma all, printWidth 100, tabWidth 2.
- [x] 2.4 Scripts: `typecheck` (tsc --noEmit), `lint` (eslint . --max-warnings 0), `clean` (removes .expo).
- [x] 2.5 Both gates pass. `style?: any` fixed in fade-in-up/skeleton/animated-card, `icon: any` → `LucideIcon` in notification-item (early 4.5/6.11 overlap), asset `require()` exempted with eslint-disable comment.

### Phase 3: Theme + Hex Sweep (Slice c) — 5/5
- [x] 3.1 Added `infoLight`, `warningLight`, `neutralLight`, `errorLight` to **both** palettes (dark variants derived); also added `shadow: '#000000'` token for the tab-bar shadow color.
- [x] 3.2 27 hex literals found across 11 files (exploration said ~25/9 — more precise count).
- [x] 3.3 All replaced with tokens (successLight/warningLight/infoLight/neutralLight/errorLight/surface/shadow).
- [x] 3.4 Dynamic color configs (payment-card statusConfig, notification categoryConfig, profile-actions, summary grids) now token-derived.
- [x] 3.5 grep → zero matches in src/ and app/ .tsx; tsc + lint pass.

### Phase 4: UI Kit Cleanup (Slice d) — 10/10
- [x] 4.1–4.3 Deleted 9 files: animated-button, animated-card, stat-item, divider (ui/), user-card (home), contact-action-card (contact), notification-summary (notifications), use-stagger-animation + src/hooks/index.ts (rules-of-hooks violation).
- [x] 4.4 Barrels updated (ui/index.ts, notifications/components/index.ts); also added missing `SplashScreen` export to ui barrel (flagged by exploration); `src/components/index.ts` now exports `./ui` + `./common`.
- [x] 4.5 `style?: any` → `StyleProp<ViewStyle>` (completed in slice b; verified). Skeleton width typed `DimensionValue` for Animated.View compatibility.
- [x] 4.6–4.9 Created `Screen`, `PatternCard` (variants primary/surface), `StatCard` (bgColor defaults to `${color}Light`), common barrel. JSDoc added per design. StatCard adds optional `style` prop beyond the design interface (needed for flex-row layouts) — deviation noted.
- [x] 4.10 tsc + lint pass; zero references to deleted components.

### Phase 5: Data Layer (Slice e) — 9/9
- [x] 5.1–5.5 Created `mocks/` per feature: user, events, profile (+stats), notifications, payments — all typed.
- [x] 5.6 Hooks refactored to `{ data, isLoading, error, refresh }` with useState/useCallback/useEffect; `data` typed as concrete type (not `User | null`) since mocks resolve synchronously — deviation from design's `UseUserReturn.user: User | null`, documented. `useProfile` additionally returns `stats`.
- [x] 5.7 Completed early in slice a (dead URL builders deleted).
- [x] 5.8 Hook barrels export hooks only.
- [x] 5.9 Grep gate: zero mock constants in hooks/; strict types compile. Screens switched from `mockX` imports to hooks (required for barrels to compile — part of this slice's natural boundary).

### Phase 6: Feature Screens (Slice f) — 16/16
- [x] 6.1–6.6 All six screens wrapped in `Screen`; manual SafeAreaView/insets removed; AppHeader no longer self-manages top inset.
- [x] 6.7–6.8 HeroCard/ProfileHero use `PatternCard variant="primary"` (also payment-summary-card — 4th pattern copy, extra dedup beyond design).
- [x] 6.9 FeaturedEventCard uses `PatternCard variant="surface"` → **visual change**: primary background → surface background with primaryLight circles, content recolored to textPrimary/textSecondary (documented risk — verify against Figma).
- [x] 6.10 SummaryCard + ProfileStatsCard + notifications summary grid → `StatCard`. The 3px top-border accent in SummaryCard was dropped (StatCard has no accent prop).
- [x] 6.11 Notification alignment: single category system keyed by `NotificationType` ('info'/'event'/'success') in notification-item; screen counts/filters/summary unified (was: paymentCount===importantCount, systemCount===clubCount duplicated); dead categories 'important'/'club'/'system' removed; summary now 4 StatCards (Sin leer/Pagos/Eventos/Info).
- [x] 6.12 Dead buttons removed: "Confirmar asistencia" (featured-event-card), "Pagar ahora" (payment-summary-card), "Pagar cuota" (hero-card onPrimaryAction prop removed). QuickActions/ProfileActions converted to static display items (dead handler props removed; TouchableOpacity → View). Events filters **wired**: `EventCategory` added to type + mocks, list now filters by category. Notifications filters simplified to backed categories.
- [x] 6.13 Nested FadeInUp removed from payment-card, notification-item, hero-card, featured-event-card, profile-hero, summary-card (via StatCard), profile-stats-card, profile-info-card, profile-actions, quick-actions, recent-activity, club-info-card, schedule-card, payment-summary-card — animation now lives at screen level with equivalent delays. payment-card emoji glyphs (✓ ⏰ ⚠) replaced with lucide icons.
- [x] 6.14–6.15 +not-found, pagos/[id], convocatorias/[id] use Screen + theme components.
- [x] 6.16 grep SafeAreaView → only common/screen.tsx. Bonus fixes: calendar-widget derives days from real month length and event dots from events data (was hardcoded 30 days + [5,12,15,20,25]); home dueDate now ISO (`2026-07-10`) formatted to es-AR display in HeroCard (date format unification: data ISO, display es-AR); event mocks refreshed from stale July dates (exploration: empty state in Aug) with categories.

### Phase 7: Docs + Cleanup (Slice g) — 6/6
- [x] 7.1 Deleted src/constants, src/utils, src/services, src/types, src/hooks (5 empty dirs).
- [x] 7.2 Grep → zero imports referencing them.
- [x] 7.3 Deleted unreferenced `assets/Logo Asociarg.jpeg` (space in filename, zero refs).
- [x] 7.4 AGENTS.md rewritten with full conventions section (colors/layout/animation/imports/data/types/dates/gates); corrected SDK version 57 → 54 (docs and reality disagreed; exploration confirmed SDK 54).
- [x] 7.5 Naming/import-order/JSDoc conventions table included (JSDoc required for common/, ui/, hooks).
- [x] 7.6 tsc + lint + expo export all pass. Additional spec coverage: created `docs/SETUP.md`, `docs/ARCHITECTURE.md`, `docs/CONTRIBUTING.md`, replaced corrupt 46-byte README with comprehensive README.md (spec requirement: "README, ARCHITECTURE, CONTRIBUTING, SETUP documentation").

## Deviations from Design

1. **Hook data shape**: task 5.6 (`{ data, isLoading, error, refresh }`) followed over design's `UseUserReturn.user: User | null`; `data` is the concrete type (synchronous mocks). `useProfile` adds `stats`.
2. **StatCard**: added optional `style?: StyleProp<ViewStyle>` to the design interface (required for flex-row grid layouts).
3. **FeaturedEventCard**: `PatternCard variant="surface"` per task 6.9 changes its visual from primary to surface background (content recolored accordingly). Needs Figma confirmation.
4. **payment-summary-card** also migrated to PatternCard (4th copy-paste of the pattern — beyond the design's 3 listed consumers).
5. **QuickActions/ProfileActions**: rendered as static display items instead of TouchableOpacity (dead handlers removed per 6.12; navigation wiring is out of scope per proposal).
6. **eslint config**: `react-native/no-inline-styles` not enabled (not in task list; dynamic inline styles are the norm until Screen migration).
7. **Contact service 5.7** completed in slice a (dead methods were the strict-extras cleanup trigger).

## Issues Found

- `npx expo install expo-font` resolved **57.0.1** (wrong for SDK 54) — manually pinned to `~14.0.12` per `expo/bundledNativeModules.json`. Future installs: always verify with `npx expo install --check`.
- tsconfig `paths` needed `./src/*` prefix after baseUrl removal (TS5090).
- AGENTS.md claimed Expo SDK 57 while the project is SDK 54 — corrected.
- Open design questions carried forward (not blocking): tab-bar label fontSize 8 (vs fontSize.xs 12); hero-card/recent-activity hardcoded `$15.000` demo amounts; `key={index}` in section-title week days (static list, harmless).

## Commits (stacked-to-main)

```
314afb7 docs: add project docs, AGENTS conventions, remove empty placeholder dirs and unreferenced asset
8a4546c refactor(screens): unify safe-area via Screen, align notifications, wire filters, single animation convention
fbb8e51 refactor(data): move mocks to per-feature mocks/ and create real hook shapes
a97ef01 refactor(ui): delete dead components, add Screen/PatternCard/StatCard scaffolds
328b0c8 refactor(theme): add *Light tokens and replace hardcoded hex across components
50d4b98 chore(tooling): add eslint flat config, prettier, and typecheck/lint scripts
6fd24d2 fix(build): resolve splash asset, fonts, and tsconfig strict extras
7346883 docs(sdd): add audit change artifacts (proposal, spec, design, tasks)
```

## Status

**57/57 tasks complete.** Ready for sdd-verify.