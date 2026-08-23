# Exploration: Auditoría Completa y Refactorización de Base de Proyecto React Native

> Change: `auditoria-completa-base-proyecto` · Phase: explore · Store: openspec
> Explorer: sdd-explore sub-agent · Date: 2026-08-23

## Current State

Expo SDK 54 / RN 0.81.5 / Expo Router 6 / TypeScript 5.9 app in **UI prototype phase** (no backend, no auth). The architecture is fundamentally sound: thin route files (`app/(tabs)/*.tsx` wrap feature screens), feature folders (`src/features/<feature>/{components,hooks,screens,types,services}`), a consistent `src/theme` token system, and a 19-component `src/components/ui` kit with a barrel export. The theme layer is the strongest part of the codebase (tokens, dark palette, web-safe shadows, typed exports).

However, the project has **one build-breaking bug, one runtime-crash risk, and systemic consistency drift**:

### Critical issues

1. **Missing asset — app cannot bundle**: `assets/splash-icon.png` does not exist, but `app.json` references `./assets/splash-icon.png` AND `src/components/ui/splash-screen.tsx` does `require('../../../assets/splash-icon.png')`. Metro fails to resolve this at bundle time. The app is currently not runnable until this asset is restored or the reference is removed.
2. **`tsc --noEmit` fails**: `tsconfig.json` `baseUrl` is deprecated in TS 5.9+ (error TS5101). TypeScript otherwise compiles clean. Fix: remove `baseUrl` (paths resolve relative to tsconfig without it).
3. **Fonts referenced but never loaded**: `src/theme/typography.ts` uses `Manrope_400Regular` etc., but no `@expo-google-fonts/manrope` / `expo-font` package is installed and nothing calls `useFonts`. Every `fontFamily` silently falls back to the system font.

### Antipatterns (verified, file-by-file)

**Dead code (never imported anywhere):**
- `src/hooks/use-stagger-animation.ts` — ALSO a React rules-of-hooks violation: `useSharedValue` + `useEffect` called inside `Array.from(...)` in render (conditional hook count → runtime crash if itemCount changes).
- `src/components/ui/animated-button.tsx`, `animated-card.tsx` — unused; worse, they `extends TouchableOpacityProps` but render `Animated.View` with `onTouchStart/onTouchEnd`, so a caller passing `onPress` gets a silently dead button.
- `src/components/ui/stat-item.tsx`, `divider.tsx` — exported, zero usages.
- `src/features/home/components/user-card.tsx`, `src/features/contact/components/contact-action-card.tsx`, `src/features/notifications/components/notification-summary.tsx` — exported, zero usages (notifications screen re-implements the summary grid inline instead).
- `src/features/contact/services/contact.service.ts` `openWhatsApp/openPhone/openMaps` — build URLs then comment "se manejará desde el hook"; the hook duplicates the same URL logic. Dead duplication.

**Empty placeholder dirs:** `src/constants/index.ts`, `src/utils/index.ts`, `src/services/index.ts`, `src/types/index.ts` are all `export {}` — scaffolding with no content, no convention on what goes where.

**Mock data masquerading as hooks:** `use-user.ts`, `use-events.ts`, `use-payments.ts`, `use-notifications.ts`, `use-profile.ts` contain NO hooks — only `mockUser/mockEvents/mockPayments/mockNotifications/mockProfile/mockStats` constants consumed directly by screens (`import { mockUser } from '../hooks'`). Only `use-contact.ts` is a real hook. Screens should consume data through hooks; mocks should live in a `__mocks__`/`mocks/` folder.

**Hardcoded hex colors duplicating theme tokens (~25 occurrences, 9 files):**
- `#E8F8E7` (= `successLight`), `#E8F4FD` (info-light), `#FFF8E7` (warning-light), `#F3F4F6` (neutral-light), `#FDE8E8` (error-light), `#ffffff` (splash). The five *-light variants are MISSING TOKENS — theme should add `infoLight/warningLight/neutralLight/errorLight` and components must stop hardcoding hex. Occurs in: contact-screen, contact quick-actions, notifications screen/summary/item, profile-actions, profile-stats-card, payment-card, summary-card, splash-screen.

**Magic numbers / hardcoded values:**
- `hero-card.tsx`: `'15.000'` hardcoded amount (`${dueDate ? '15.000' : '0'}`); `recent-activity.tsx` hardcodes `'$15.000'`.
- `calendar-widget.tsx`: `daysInMonth = 30`, `eventDays = [5,12,15,20,25]` hardcoded and NOT derived from `mockEvents` (data drift — 25 has no event).
- `home-screen.tsx` hardcodes `dueDate="10/07/2026"` (DD/MM/YYYY) while `mockEvents`/`mockPayments` use ISO `YYYY-MM-DD` — two date formats in the codebase.
- `avatar.tsx` `sizeConfig.fontSize` is computed but never applied (dead field).
- `input.tsx` `fontSize: 16` instead of `fontSize.base`; `activity-item.tsx` `borderRadius: 22`; `chip.tsx` `paddingVertical: 2`, `minWidth: 20`; `section-title.tsx` `width: 4, height: 20`; tab bar `fontSize: 8` (extremely small label).
- `events-screen.tsx`: `refreshControl={undefined}` + `handleRefresh` setTimeout — dead demo code, unreachable skeleton state.
- `app/(tabs)/pagos/[id].tsx` and `convocatorias/[id].tsx`: raw placeholder screens with inline styles and RN `Text` — no theme, no components, unlike the rest of the app. `+not-found.tsx` same pattern.

**Typing issues:**
- `style?: any` in `skeleton.tsx`, `fade-in-up.tsx`, `animated-card.tsx` (should be `StyleProp<ViewStyle>`).
- `notification-item.tsx` `categoryConfig: Record<string, { icon: any; ... }>`.
- **Real type/logic mismatch**: `NotificationType = 'info' | 'event' | 'success'` but `categoryConfig` keys are `payment|event|club|system|important|default` → all `info`/`success` notifications render as generic Bell/"Info". Two parallel categorization systems that disagree.
- `statusConfig` in `event-card.tsx` typed `Record<string, ...>` with unused `color` field; `hero-card.tsx` `statusConfig` not typed with `HeroCardProps['status']`.

**Structural duplication:**
- The decorative `pattern`/`patternSmall` StyleSheet blocks are copy-pasted VERBATIM in `hero-card.tsx`, `profile-hero.tsx`, `featured-event-card.tsx` → extract a shared `HeroCard`/`PatternCard` base.
- The `container`+`content` screen boilerplate (`flex:1, backgroundColor: lightColors.background` / `flexGrow:1`) is copy-pasted across all 6 screens → shared `Screen` scaffold component.
- The stat-card grid pattern ("icon + count + label") exists in 3 near-identical variants: `summary-card.tsx` (home), notifications summary grid (inline in screen), `notification-summary.tsx` (unused) → one `StatCard`/`SummaryGrid` component.
- `chipsContainer` styles duplicated in events + payments screens.
- **Double FadeInUp**: `payment-card.tsx` and `notification-item.tsx` wrap themselves in `FadeInUp` AND their screens wrap them again in `FadeInUp` (nested animation wrappers, inconsistent — `event-card.tsx` has none). Pick one convention: screens animate, cards stay pure.
- `contact-screen.tsx` wraps `QuickAction` in `FadeInUp` while `QuickAction` also accepts a `delay` prop it never uses (dead prop).
- `app-header.tsx` `onNotificationPress` prop is declared but never used (dead prop).

**Import style inconsistency:** UI components import each other via relative `./text` (majority) but `chip.tsx` and `empty-state.tsx` import via the barrel `@/components` (self-import through own barrel — circularity risk). Feature components all use the barrel (fine, but must not be used inside `src/components`).

**Dead buttons everywhere:** `featured-event-card.tsx` "Confirmar asistencia" has no onPress; `profile-actions.tsx` passes 5 actions with no handlers; `quick-actions.tsx` receives no handlers from home-screen; `user-card.tsx` "Cambiar foto" has no onPress. Navigation (router.push) is not wired anywhere — prototype has zero interactions except contact.

**Safe-area inconsistency:** 4 different strategies across 6 screens: RN `SafeAreaView` (notifications), `react-native-safe-area-context` SafeAreaView + insets (contact), ScrollView + insets padding only (home, profile, events, payments — no top inset handling on profile/events/payments), none (detail screens).

**Other:** `key={index}` in `quick-actions.tsx`, `summary-card.tsx`; emoji glyphs (✓ ⏰ ⚠) in `payment-card.tsx` instead of icons; `skeleton.tsx` animation dead code (`withTiming` result assigned to unused `animation` var, hard 0.3↔0.7 toggles, no actual animation); `splash-screen.tsx` nested setTimeout not cleaned up; `Divider` uses `marginVertical || spacing.sm` (0 value falls back); uncommitted `Logo Asociarg.jpeg` with a space in the name is unreferenced; git history: 5 commits, Spanish messages, no CI; no eslint/prettier/jest config; scripts lack `typecheck`/`lint`; `tsconfig` lacks `noUnusedLocals/noUnusedParameters` (why dead code survives).

## Affected Areas

- `assets/splash-icon.png` — MISSING; breaks bundle via `app.json` + `splash-screen.tsx` require
- `tsconfig.json` — `baseUrl` deprecation error; missing strict extras (`noUnusedLocals`, etc.); no typecheck script
- `package.json` — no fonts, no eslint/prettier/test runner, no typecheck/lint scripts
- `src/theme/typography.ts` — Manrope names without font loading; `colors.ts` — missing *Light variant tokens
- `src/hooks/use-stagger-animation.ts` — hooks-in-loop violation + dead
- `src/components/ui/` — dead components (animated-button, animated-card, stat-item, divider), `style?: any`, splash missing from barrel export, self-barrel imports (chip, empty-state), skeleton dead animation, avatar dead field, splash nested timeout
- `src/features/*/hooks/*` — mock constants in "hooks" files (5 features)
- `src/features/*/screens/*` — duplicated screen boilerplate, inline summary grids, safe-area inconsistencies, dead filters (events FilterType has no filtering logic; notifications counts duplicated: `paymentCount === importantCount`, `systemCount === clubCount`), events dates stale (July 2026 mocks → "Sin convocatorias" empty state in Aug)
- `src/features/*/components/*` — pattern block duplication (3x), hardcoded hex (~25), dead buttons, notification type/category mismatch
- `app/(tabs)/pagos/[id].tsx`, `convocatorias/[id].tsx`, `+not-found.tsx` — placeholder inline styles
- `src/constants`, `src/utils`, `src/services`, `src/types` — empty `export {}` placeholders
- `src/features/contact/services/contact.service.ts` — dead URL-builder methods duplicating hook logic

## Approaches

1. **Minimal repair (stop-the-bleeding)** — fix only build/runtime blockers: restore or remove `splash-icon.png` reference, remove `baseUrl`, add font loading, delete dead components/hooks. ~200 lines. No conventions established. Low value, low risk, quick.
   - Pros: Fast, unblocks `tsc` and bundling, small review
   - Cons: Leaves every antipattern in place; no convention prevents recurrence
   - Effort: Low

2. **Full consolidation refactor (recommended scope)** — everything in #1 plus: theme token expansion (*Light variants) + hardcoded-hex sweep; extract `Screen` scaffold + shared `HeroCard` (pattern dedup) + `StatCard`; single animation convention (screens animate, cards pure) and remove double-FadeInUp; move mocks to `mocks/` and route screens through real hooks; fix notification type/category alignment; strict tsconfig extras (`noUnusedLocals/noUnusedParameters`, exactOptionalPropertyTypes) + typecheck/lint scripts; eslint+prettier setup; unify safe-area via a Screen component; wire dead buttons to router or remove them; unify date format; delete all dead code and empty placeholder dirs (or give them real content); document conventions (AGENTS.md / docs).
   - Pros: One coherent pass; blast radius contained per work unit; leaves a convention baseline for all future features
   - Cons: Larger diff (est. 800–1400 changed lines incl. deletions); must be sliced into chained PRs under the 400-line review budget
   - Effort: High

3. **Incremental / convention-first** — establish conventions + tooling first (eslint, tsconfig strict extras, theme tokens, Screen/HeroCard/StatCard components, docs), then migrate features one screen at a time in separate changes.
   - Pros: Smallest review slices; each PR independently verifiable; aligns with SDD change granularity
   - Cons: Longest runway; intermediate states keep mixed conventions; requires discipline to not leave half-migrated screens
   - Effort: Medium (per change), High (total across a change chain)

## Recommendation

**Approach 2, delivered as a chained change series** (auto-chain, 400-line budget): each work unit = one coherent slice (tooling, theme, ui-kit cleanup, screen scaffold, data layer, feature migration), each with its own verify step. Do NOT ship approach 1 alone — the dead-code and convention issues are exactly what the auditoría is for, and doing a repair pass now then a refactor pass later doubles the churn on the same files.

Ordering of slices: (a) build fixes + fonts + tsconfig/scripts [unblocks everything], (b) eslint/prettier baseline, (c) theme token expansion + hex sweep, (d) ui-kit: delete dead components, fix `any`/props, screen scaffold + HeroCard + StatCard extraction, (e) data layer: mocks out of hooks, real hook shapes, contact service cleanup, (f) feature screens: safe-area unification, filter fixes, notification category alignment, dead-button wiring or removal, (g) docs/AGENTS conventions + empty-dir resolution.

## Risks

- **Missing splash asset**: until restored/removed, every bundle attempt fails — highest-priority item; also confirm whether the file was deleted in a previous commit (`git log --diff-filter=D`) to decide restore vs remove.
- **Font loading decision**: adding `@expo-google-fonts/manrope` + `expo-font` changes app startup (splash gating); must use `expo-splash-screen` keep-visible pattern to avoid font flash.
- **Behavioral drift risk**: "dead button" cleanup and mock removal change what renders (e.g., events empty state after date staleness) — verify screens still render all intended states after refactor.
- **Notification type/category fix** changes rendered icons/badges — verify against Figma/design intent before aligning.
- **Deletion of exported components** (`AnimatedButton`, `AnimatedCard`, `StatItem`, `Divider`, `UserCard`, `ContactActionCard`, `NotificationSummary`, `useStaggerAnimation`) may break the public surface other branches rely on — none are referenced in this tree; confirm no pending work depends on them.
- **Review budget**: consolidated refactor exceeds 400 lines → mandatory chained PRs; slice boundaries must be feature-complete.
- **No tests/CI**: refactor has no safety net; add at least a `typecheck` script + eslint gate before large migrations.

## Ready for Proposal

**Yes** — the scope is well understood and verified file-by-file. The proposal should define the chained slice plan (above), the target conventions (theme-only colors, screen-scaffold safe-area, hooks-as-data-access, no self-barrel imports, no dead props), and the delete-list with evidence.