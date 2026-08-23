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

