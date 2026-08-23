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

