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

