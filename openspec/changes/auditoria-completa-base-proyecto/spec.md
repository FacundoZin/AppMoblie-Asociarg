# Spec: auditoria-completa-base-proyecto

> Initial spec baseline. All capabilities are NEW (no existing specs to modify).

## build-tooling

### Requirement: Splash Asset Resolution
The system MUST resolve the missing `splash-icon.png` reference so Metro bundles without error.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Bundle succeeds | asset reference valid | `npx expo start` | Metro bundles without missing-asset error |

### Requirement: TypeScript Strict Extras
`tsconfig.json` MUST enable `noUnusedLocals` and `noUnusedParameters`; MUST remove deprecated `baseUrl`.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| tsc passes | strict extras on | `tsc --noEmit` | Zero errors |

### Requirement: Font Loading with Splash Gating
The system MUST load custom fonts before hiding the splash screen.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| No font flash | app starts | fonts load | Splash visible until fonts ready |

### Requirement: Lint and Typecheck Scripts
`package.json` MUST provide `typecheck` and `lint` scripts; ESLint + Prettier config MUST exist.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Lint passes | config exists | `npm run lint` | Zero errors |

## theme-token-expansion

### Requirement: Light Token Addition
`colors.ts` MUST add `infoLight`, `warningLight`, `neutralLight`, `errorLight` tokens.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Token accessible | theme loaded | `colors.infoLight` read | Returns defined color |

### Requirement: No Hardcoded Hex
Components MUST NOT contain hardcoded hex color values; all colors MUST reference theme tokens.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Zero hex | tokens available | any component renders | Uses theme token only |

## screen-scaffold

### Requirement: Screen Component
A shared `Screen` component MUST provide safe-area handling, theme background, and consistent layout.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Unified safe-area | Screen wraps content | screen renders | Top/bottom safe areas handled |
| Theme background | Screen used | screen renders | Background uses theme token |

### Requirement: No Manual SafeAreaView
Screens MUST NOT use raw `SafeAreaView`; all safe-area handling MUST go through `Screen`.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| No raw usage | Screen exists | grep screens for SafeAreaView | Zero matches |

## hero-card-base

### Requirement: Shared Pattern Component
A shared component MUST encapsulate the decorative pattern background duplicated across hero-card, profile-hero, and featured-event-card.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Pattern dedup | shared component used | 3 screens render | Pattern styles from single source |

## stat-card-component

### Requirement: Unified StatCard
A `StatCard` component MUST replace the 3 near-identical stat/summary card variants.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Single component | StatCard exists | home + notifications render | Both use StatCard |

## data-access-hooks

### Requirement: Mocks in Dedicated Folder
Mock data MUST live in `mocks/` folders, not in hook files.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Clean separation | mocks/ exists | grep hooks for mock constants | Zero matches |

### Requirement: Real Hook Shapes
Screens MUST consume data through hooks; hooks MUST be the data-access layer even if mock-backed.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Hook consumption | hook exists | screen imports data | Imports hook, not mock constant |

### Requirement: Notification Type/Category Alignment
Notification type and category systems MUST be aligned — no parallel categorization.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Aligned categories | unified system | notification renders | Correct icon/badge for type |

### Requirement: Contact Service Dedup
`contact.service.ts` MUST NOT duplicate URL-building logic already in hooks.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| No duplication | hook handles URLs | service inspected | No dead URL-builder methods |

## ui-kit-cleanup

### Requirement: Dead Code Deletion
Unused components/hooks MUST be removed: `animated-button`, `animated-card`, `stat-item`, `divider`, `user-card`, `contact-action-card`, `notification-summary`, `use-stagger-animation`.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Clean tree | dead code removed | `tsc --noEmit` | Zero missing-import errors |

### Requirement: Type Safety
`style` props MUST use `StyleProp<ViewStyle>`, not `any`.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| No any styles | types fixed | `tsc --noEmit` strict | Zero `any` style props |

### Requirement: Animation Convention
Screens MUST animate content; cards MUST stay pure with no nested animation wrappers.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Single convention | screens animate | card inside screen | Card has no own FadeInUp |

### Requirement: No Self-Barrel Imports
UI components MUST NOT import through their own barrel (`@/components`).

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Relative imports | inside components/ui | sibling import | Uses relative path |

## feature-screens

### Requirement: Unified Date Format
All dates MUST use a single format across data and display.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| No format drift | unified format | dates compared | Data and display aligned |

### Requirement: Dead Button/Prop Removal
Buttons and props with no handler MUST be removed in prototype phase.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| No dead handlers | cleanup done | screen renders | No onPress-less buttons |

### Requirement: Filter Logic Alignment
Filter UI MUST have corresponding filtering logic; dead filter states MUST be removed.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Filters functional | filter selected | list renders | Items filtered correctly |

## docs

### Requirement: Documentation Baseline
The project MUST include README, ARCHITECTURE, CONTRIBUTING, and SETUP documentation.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Docs exist | docs written | developer onboards | Finds setup, architecture, conventions |
