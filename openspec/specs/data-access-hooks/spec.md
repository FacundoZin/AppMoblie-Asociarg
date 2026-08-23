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

