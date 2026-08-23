# Asociarg Mobile

## Tech Stack

- React Native 0.86
- Expo SDK 57
- Expo Router 57
- TypeScript 6.0 (strict)

## Documentation

Always consult the official Expo SDK 57 documentation before generating Expo-specific code.

https://docs.expo.dev/versions/v57.0.0/

Additional project documentation lives in `docs/`:

- `docs/SETUP.md` — environment setup and run instructions
- `docs/ARCHITECTURE.md` — folder structure and data flow
- `docs/CONTRIBUTING.md` — contribution workflow, gates, and commit conventions

## Current Phase

The project is currently in the UI prototype phase.

Do not implement:

- Backend integration
- Authentication
- Database
- Business logic
- API calls

Focus only on reusable UI components and screen layouts.

## Code Conventions

### Naming

| Artifact | Convention | Example |
|----------|------------|---------|
| Components | PascalCase | `HeroCard`, `Screen` |
| Functions / variables | camelCase | `getFilteredNotifications` |
| Constants | UPPER_SNAKE | `MOCK_USER`, `statusConfig` (module-level const objects are lowercase camel) |
| Files | kebab-case | `pattern-card.tsx`, `use-user.ts` |
| Mocks | `<name>.mock.ts` | `user.mock.ts` |

### Colors (theme only)

- All colors MUST come from `src/theme` tokens (`lightColors.*`, `darkColors.*`) — never hardcoded hex.
- The ESLint rule `no-restricted-syntax` bans hex literals in `.tsx` (enforced by `npm run lint`).
- Add new color tokens to `src/theme/colors.ts` when a new shade is needed (e.g. `*Light` variants).

### Layout (Screen scaffold)

- Every screen MUST be wrapped in the shared `Screen` scaffold (`src/components/common/screen.tsx`).
- `Screen` owns safe-area handling (edges) and the theme background. Never use raw `SafeAreaView` or `useSafeAreaInsets` in screens.
- Scrollable content lives in a `ScrollView` inside `Screen`.

### Animation

- Screens animate: entrance animations (`FadeInUp`) are applied at screen level.
- Cards/components stay pure: no component wraps itself in `FadeInUp` or similar.
- Never nest animation wrappers (card inside screen both animating the same subtree).

### Imports

Order: `react` > `react-native` > `expo` > third-party > `@/theme` > `@/components` > relative.

- Feature files import shared components through the barrel: `@/components`.
- Feature components import siblings through their feature barrel: `../components`.
- Components inside `src/components` use relative imports (`./text`); they never import through `@/components` (self-barrel).
- Path alias: `@/*` → `src/*`. No `baseUrl` (removed; `paths` are tsconfig-relative).

### Data access

- Screens consume data through hooks (`useUser`, `useEvents`, ...) — never import mock constants directly.
- Hooks live in `src/features/<feature>/hooks/`, mocks live in `src/features/<feature>/mocks/`.
- Hook shape: `{ data, isLoading, error, refresh }`.
- Mocks are typed with the feature types (`import { Event } from '../types'`).

### Types

- Style props: `StyleProp<ViewStyle>` — never `any`.
- No `any` anywhere: `@typescript-eslint/no-explicit-any` is an error.
- Feature types live in `src/features/<feature>/types/` and are re-exported from the `index.ts` barrel.

### Dates

- Data layer uses ISO format (`YYYY-MM-DD`).
- Display formatting happens at render time with `toLocaleDateString('es-AR', ...)`.

### Verification gates

Run before every commit/PR:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint . --max-warnings 0
```