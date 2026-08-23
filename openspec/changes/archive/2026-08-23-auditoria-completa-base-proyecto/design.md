# Design: Auditoria Completa Base Proyecto

## Technical Approach

Consolidate the Expo SDK 54 prototype into a convention-driven base via 7 chained slices (a-g). Preserves the existing feature-based architecture (`src/features/<feature>/`) while introducing shared scaffolds (`Screen`, `PatternCard`, `StatCard`), expanding theme tokens, separating mocks from hooks, and establishing tooling (ESLint + Prettier + strict TypeScript) as the convention enforcement layer.

## Architecture Decisions

### Decision: Target Folder Structure

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Keep flat `src/components/ui/` for all shared | Simple, but mixes primitives with composed patterns | **Rejected** |
| Split `src/components/ui/` (primitives) + `src/components/common/` (composed) | Adds a directory, clarifies intent | **Accepted** - ui/ = Button/Text/Card; common/ = Screen/PatternCard/StatCard |
| Central `src/mocks/` vs per-feature `mocks/` | Central simpler; per-feature follows isolation | **Accepted** - per-feature `src/features/<feature>/mocks/` |
| Delete empty `src/constants/`, `src/utils/`, `src/services/`, `src/types/` | Lose placeholders; no current content | **Accepted** - delete; re-create when real content arrives (YAGNI) |

### Decision: Component Placement

| Component | Location | Rationale |
|-----------|----------|-----------|
| `Screen` | `src/components/common/screen.tsx` | Shared scaffold - safe-area + theme background |
| `PatternCard` | `src/components/common/pattern-card.tsx` | Decorative background (two circles) from 3 hero cards |
| `StatCard` | `src/components/common/stat-card.tsx` | Unified icon + count + label card |
| `HeroCard` | `src/features/home/components/` | Feature-specific; uses PatternCard internally |
| `ProfileHero` | `src/features/profile/components/` | Feature-specific; uses PatternCard internally |
| `FeaturedEventCard` | `src/features/events/components/` | Feature-specific; uses PatternCard internally |

### Decision: Theme Token Expansion

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Add `*Light` tokens to `colors.ts` | Minimal change, consistent with `successLight` | **Accepted** - add infoLight, warningLight, neutralLight, errorLight to both palettes |
| Enforce no-hardcoded-hex via ESLint `no-restricted-syntax` | Catches violations at lint time | **Accepted** - ban hex string literals in .tsx (allow in theme/) |
| Expose via `theme/index.ts` barrel | Already exports colors | Tokens auto-exported after colors.ts update |

### Decision: Data Layer Convention

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Mocks in `src/features/<feature>/mocks/` | Per-feature isolation | **Accepted** - each feature has mocks/ with typed data |
| Hooks as data-access layer | Screens import hooks, not constants | **Accepted** - useUser(), useEvents() return mock-backed data |
| `use-contact.ts` as reference | Already a real hook | **Accepted** - other hooks follow this shape |

### Decision: TypeScript Configuration

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Remove `baseUrl` (deprecated TS 5.9+) | Fixes TS5101 | **Accepted** |
| Add `noUnusedLocals`, `noUnusedParameters` | Catches dead code | **Accepted** |
| Keep `strict: true` | Already enabled | No change |
| Add `esModuleInterop: true` | Standard for RN/Expo | **Accepted** |
| Keep `@/*` path alias | Already configured | No change |

### Decision: Tooling Baseline

| Option | Tradeoff | Decision |
|--------|----------|----------|
| ESLint flat config (`eslint.config.mjs`) | Modern, TS-native | **Accepted** |
| Prettier for formatting | Consistent style | **Accepted** - default config + eslint-config-prettier |
| Scripts: `typecheck` + `lint` | Gate before commits | **Accepted** |

### Decision: Expo Router Conventions

| Convention | Rule |
|------------|------|
| Route files | `app/(tabs)/*.tsx` wrap feature screens (thin routes) |
| Future auth | `app/(auth)/` group with own `_layout.tsx` |
| Not-found | `app/+not-found.tsx` uses Screen + theme |
| Layout | Root provides SafeAreaProvider + splash; tabs configure bar |

### Decision: Code Conventions

| Convention | Rule |
|------------|------|
| Components | PascalCase |
| Variables/functions | camelCase |
| Constants | UPPER_SNAKE |
| Import order | react > react-native > expo > third-party > @/theme > @/components > relative |
| Style props | `StyleProp<ViewStyle>`, never `any` |
| Colors | Theme tokens only |
| Animation | Screens animate; cards pure |
| Barrels | Feature uses barrel; UI uses relative (no self-barrel) |
| JSDoc | Required for `common/`, `ui/`, and hooks |

## Data Flow

```
Root _layout (SafeAreaProvider + splash gating)
     |
     v
app/(tabs)/*.tsx (thin route) --> FeatureScreen
                                     |
                                     +-- Screen (common: safe-area + bg)
                                     |      |
                                     |      +-- PatternCard (common) --> HeroCard/ProfileHero/FeaturedEventCard
                                     |      +-- StatCard (common) --> SummaryCard / notifications summary
                                     |
                                     +-- useXxx() hook --> mocks/ data --> feature components
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/common/screen.tsx` | Create | Screen scaffold |
| `src/components/common/pattern-card.tsx` | Create | Decorative pattern |
| `src/components/common/stat-card.tsx` | Create | Unified stat card |
| `src/components/common/index.ts` | Create | Barrel export |
| `src/theme/colors.ts` | Modify | Add *Light tokens |
| `src/features/*/mocks/` | Create | Per-feature mock dirs (5) |
| `src/features/*/hooks/use-*.ts` | Modify | Mock constants to real hooks |
| `src/features/*/screens/*.tsx` | Modify | Use Screen + theme tokens |
| `src/features/home/components/hero-card.tsx` | Modify | Use PatternCard |
| `src/features/profile/components/profile-hero.tsx` | Modify | Use PatternCard |
| `src/features/events/components/featured-event-card.tsx` | Modify | Use PatternCard |
| `src/features/home/components/summary-card.tsx` | Modify | Use StatCard |
| `src/features/notifications/screens/notifications-screen.tsx` | Modify | Use StatCard + theme |
| `src/components/ui/fade-in-up.tsx` | Modify | Fix any style prop |
| `src/components/ui/skeleton.tsx` | Modify | Fix any style prop |
| `src/components/ui/animated-button.tsx` | Delete | Dead |
| `src/components/ui/animated-card.tsx` | Delete | Dead |
| `src/components/ui/stat-item.tsx` | Delete | Dead |
| `src/components/ui/divider.tsx` | Delete | Dead |
| `src/hooks/use-stagger-animation.ts` | Delete | Hooks violation + dead |
| `src/features/home/components/user-card.tsx` | Delete | Dead |
| `src/features/contact/components/contact-action-card.tsx` | Delete | Dead |
| `src/features/notifications/components/notification-summary.tsx` | Delete | Dead |
| `src/constants/index.ts` | Delete | Empty placeholder |
| `src/utils/index.ts` | Delete | Empty placeholder |
| `src/services/index.ts` | Delete | Empty placeholder |
| `src/types/index.ts` | Delete | Empty placeholder |
| `src/features/contact/services/contact.service.ts` | Modify | Remove dead URL builders |
| `tsconfig.json` | Modify | Remove baseUrl, add strict extras |
| `package.json` | Modify | Add fonts, eslint, prettier, scripts |
| `eslint.config.mjs` | Create | Flat config |
| `.prettierrc` | Create | Default config |
| `app/+not-found.tsx` | Modify | Use Screen + theme |
| `app/(tabs)/pagos/[id].tsx` | Modify | Use Screen + theme |
| `app/(tabs)/convocatorias/[id].tsx` | Modify | Use Screen + theme |
| `AGENTS.md` | Modify | Add conventions section |

## Interfaces / Contracts

### Screen Component

```typescript
interface ScreenProps {
  children: React.ReactNode;
  backgroundColor?: keyof Colors; // defaults to 'background'
  edges?: Edge[]; // defaults to ['top', 'bottom']
}
```

### PatternCard Component

```typescript
interface PatternCardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'surface'; // defaults to 'primary'
  style?: StyleProp<ViewStyle>;
}
```

### StatCard Component

```typescript
interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  color: keyof Colors;
  bgColor?: keyof Colors; // defaults to `${color}Light`
}
```

### Data Hook Shape

```typescript
interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | N/A | No test infrastructure in prototype phase |
| Integration | N/A | Deferred to feature phase |
| E2E | N/A | Deferred to feature phase |
| Gate | `tsc --noEmit` + `eslint .` | Run before every commit/PR |
| Manual | Each slice renders correctly | Verify screens after refactor |

## Threat Matrix

N/A - no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

7 chained slices, each independently revertable:

| Slice | Scope | Unblocks |
|-------|-------|----------|
| (a) Build fixes | Splash asset, baseUrl, font loading | App bundles, tsc passes |
| (b) Tooling baseline | ESLint + Prettier + tsconfig strict + scripts | Catches dead code |
| (c) Theme + hex sweep | *Light tokens + replace ~25 hardcoded hex | Single color source |
| (d) UI kit cleanup | Delete dead, fix any, extract Screen/PatternCard/StatCard | Reusable scaffolds |
| (e) Data layer | Move mocks to mocks/, real hook shapes, contact service cleanup | Hooks-as-data-access |
| (f) Feature screens | Safe-area via Screen, notification alignment, dead buttons, animation convention | Consistent screens |
| (g) Docs + cleanup | AGENTS.md conventions, resolve empty dirs, delete unreferenced assets | Convention baseline |

Ordering: (a) first (unblocks bundling), (b) before (d)/(f) (enforces conventions), (c) before (d)/(f) (tokens available), (d) before (f) (scaffolds available).

## Open Questions

- [ ] Notification type/category alignment: verify icon/badge mapping against Figma before changing rendered output
- [ ] Date format unification: choose between ISO (YYYY-MM-DD) and display (DD/MM/YYYY) as canonical; document decision
- [ ] Tab bar label fontSize (currently 8): confirm if this is intentional or should use fontSize.xs (12)