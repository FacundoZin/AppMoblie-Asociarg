# Proposal: Auditoría Completa y Refactorización de Base de Proyecto React Native

## Intent

Consolidate the Expo SDK 54 / React Native prototype into a scalable, convention-driven base before adding features. The project has one build-breaking bug (missing `splash-icon.png`), one runtime crash risk (rules-of-hooks violation in `use-stagger-animation.ts`), and systemic consistency drift (25+ hardcoded hex colors, duplicated screen boilerplate, mock data in hook files, dead components). Without consolidation, future features will inherit antipatterns and the codebase will become unmaintainable.

## Scope

### In Scope
- Fix build/runtime blockers (splash asset, tsconfig deprecation, font loading)
- Theme token expansion (*Light variants) + hardcoded-hex sweep
- Extract shared scaffolds: `Screen` (safe-area + layout), `HeroCard` (pattern dedup), `StatCard`
- Delete dead code: 7+ unused components/hooks, empty placeholder dirs, dead props/buttons
- Data layer cleanup: move mocks to `mocks/`, route screens through real hooks
- Unify conventions: single animation strategy (screens animate, cards pure), theme-only colors, no self-barrel imports
- TypeScript strict extras (`noUnusedLocals`, `noUnusedParameters`) + typecheck/lint scripts
- ESLint + Prettier baseline
- Documentation: AGENTS.md conventions, architecture decisions

### Out of Scope
- Backend integration, authentication, database, API calls (per project phase)
- New features or screens
- Navigation wiring (prototype phase — dead buttons removed, not wired)
- Test infrastructure (no jest/vitest setup — out of scope for base consolidation)
- CI/CD pipeline configuration

## Capabilities

> Contract between proposal and specs phase. Each new capability becomes `openspec/specs/<name>/spec.md`.

### New Capabilities
- `screen-scaffold`: Shared `Screen` component with safe-area handling, theme background, consistent layout
- `theme-token-expansion`: Add `infoLight`, `warningLight`, `neutralLight`, `errorLight` tokens to theme
- `data-access-hooks`: Real hook shapes consuming mocks from `mocks/` folder, screens import hooks not mock constants
- `hero-card-base`: Extract shared pattern/decorative background component to deduplicate 3x copy-paste
- `stat-card-component`: Unified stat/summary card component to replace 3 near-identical variants

### Modified Capabilities
_None — no existing specs to modify. This is the initial spec baseline._

## Approach

**Approach 2: Full consolidation as chained slices** (recommended by exploration). Delivered as 7 chained PRs under 400-line review budget:

| Slice | Scope | Unblocks |
|-------|-------|----------|
| (a) Build fixes | Restore/remove splash asset, remove `baseUrl`, add font loading with splash-screen gating | App bundles, `tsc` passes |
| (b) Tooling baseline | ESLint + Prettier config, `typecheck`/`lint` scripts, tsconfig strict extras | Catches dead code, enforces conventions |
| (c) Theme + hex sweep | Add *Light tokens, replace ~25 hardcoded hex with theme refs | Single source of truth for colors |
| (d) UI kit cleanup | Delete dead components (animated-button/card, stat-item, divider), fix `any` types, extract `Screen`/`HeroCard`/`StatCard` | Reusable scaffolds, clean component surface |
| (e) Data layer | Move mocks to `mocks/`, create real hook shapes, cleanup contact service duplication | Hooks-as-data-access convention |
| (f) Feature screens | Safe-area unification via `Screen`, notification type/category alignment, remove dead buttons/filters, single animation convention | Consistent screens, no behavioral drift |
| (g) Docs + cleanup | AGENTS.md conventions, resolve empty dirs (constants/utils/services/types), delete unreferenced assets | Convention baseline for future work |

**Target conventions:**
- Colors: theme tokens only, never hardcoded hex
- Layout: `Screen` scaffold for safe-area + background, no manual `SafeAreaView`
- Animation: screens wrap content in `FadeInUp`, cards stay pure (no nested animations)
- Imports: feature components use barrel `@/features/<feature>/components`, UI components use relative paths (no self-barrel)
- Data: screens consume hooks, hooks consume mocks from `mocks/`, no mock constants in hook files
- Types: `StyleProp<ViewStyle>` instead of `any`, strict notification type/category alignment

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `assets/splash-icon.png` | Fixed | Missing asset breaks bundle — restore or remove reference |
| `tsconfig.json` | Modified | Remove `baseUrl`, add `noUnusedLocals`/`noUnusedParameters` |
| `package.json` | Modified | Add fonts, eslint, prettier, typecheck/lint scripts |
| `src/theme/colors.ts` | Modified | Add `infoLight`, `warningLight`, `neutralLight`, `errorLight` tokens |
| `src/theme/typography.ts` | Modified | Font loading integration (requires splash-screen gating) |
| `src/hooks/use-stagger-animation.ts` | Deleted | Rules-of-hooks violation + unused |
| `src/components/ui/*` | Modified | Delete 4 dead components, fix `any` types, extract shared scaffolds |
| `src/features/*/hooks/*` | Modified | Move mocks to `mocks/`, create real hook shapes |
| `src/features/*/screens/*` | Modified | Safe-area unification, remove dead code, theme-only colors |
| `src/features/*/components/*` | Modified | Replace hardcoded hex, deduplicate pattern blocks, fix type mismatches |
| `app/(tabs)/*` | Modified | Placeholder screens get theme + components, not inline styles |
| `src/constants`, `src/utils`, `src/services`, `src/types` | Deleted/Resolved | Empty `export {}` placeholders — remove or populate |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Missing splash asset blocks all bundling | High | Slice (a) is first priority; check `git log --diff-filter=D` to decide restore vs remove |
| Font loading changes app startup (splash flash) | Medium | Use `expo-splash-screen` keep-visible pattern, hide only after fonts loaded |
| Dead component deletion breaks other branches | Low | Verified zero imports in current tree; confirm no pending work depends on them |
| Notification type/category fix changes rendered icons | Medium | Verify against Figma/design intent before aligning; document decision |
| Review budget exceeded (est. 800-1400 lines) | High | Mandatory chained PRs per slice; each slice is feature-complete and independently verifiable |
| Behavioral drift after mock removal / dead button cleanup | Medium | Verify all screen states render correctly after refactor; no functional changes in prototype phase |
| No test safety net for refactor | High | Add typecheck + eslint gate before large migrations (slice b); manual verification per slice |

## Rollback Plan

Each slice is independently revertable via `git revert <slice-commit>`. Since slices are chained, revert in reverse order (g → f → e → d → c → b → a). No database migrations or breaking API changes — pure refactor with no external dependencies. If a slice introduces regressions, revert that slice and fix forward.

## Dependencies

- **External**: None (no backend, no third-party services)
- **Internal**: 
  - Slice (a) must complete before all others (unblocks bundling)
  - Slice (b) should complete before (d)/(f) (enforces conventions during migration)
  - Slice (c) should complete before (d)/(f) (theme tokens available for sweep)
  - Slice (d) should complete before (f) (shared scaffolds available for screen migration)

## Success Criteria

- [ ] `npx expo start --no-dev --minify` builds without errors (splash asset resolved)
- [ ] `tsc --noEmit` passes with zero errors (baseUrl removed, strict extras enabled)
- [ ] `npm run lint` passes with zero errors (ESLint baseline established)
- [ ] Zero hardcoded hex colors in components (all use theme tokens)
- [ ] Zero unused components/hooks (dead code deleted)
- [ ] All screens use `Screen` scaffold for safe-area (no manual `SafeAreaView`)
- [ ] All screens consume data through hooks (no direct mock imports)
- [ ] Single animation convention (screens animate, cards pure — no nested `FadeInUp`)
- [ ] Documentation: AGENTS.md includes conventions for colors, layout, animation, imports, data access
- [ ] Chained PRs: 7 slices, each under 400 lines, each independently mergeable
