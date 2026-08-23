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

