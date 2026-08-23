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

