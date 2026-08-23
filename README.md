# Asociarg Mobile

Mobile app for sports club members — **Asociación Deportiva San Francisco**. Built with React Native + Expo, currently in the **UI prototype phase** (no backend, authentication, or API integration).

## Features (prototype)

- **Inicio** — member card with payment status, quick actions, summary stats, recent activity
- **Notificaciones** — activity feed with unread/payment/event/info filters and summary cards
- **Cuotas** — payment history with pending/paid/overdue filters and totals
- **Convocatorias** — upcoming events with category filters and a calendar widget
- **Perfil** — member profile, personal data, stats, and quick actions
- **Contacto** — club info, WhatsApp/phone/maps actions, opening hours

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React Native 0.86 + Expo SDK 57 |
| Navigation | Expo Router 57 (file-based) |
| Language | TypeScript 6.0 (strict) |
| Icons | lucide-react-native |
| Fonts | Manrope (@expo-google-fonts/manrope) |
| Animations | react-native-reanimated |
| Lint / Format | ESLint 9 (flat config) + Prettier |

## Getting Started

```bash
pnpm install
pnpm start
```

Scan the QR code with Expo Go SDK 57, or press `a`/`i` for an emulator. See [docs/SETUP.md](docs/SETUP.md) for full setup, troubleshooting, and verification gates.

## Project Structure

```
app/          Expo Router routes (thin wrappers around feature screens)
src/components  Shared UI kit (atomic `ui/` + composed `common/` scaffolds)
src/theme     Design tokens (colors, typography, spacing, radii, shadows)
src/features  Feature modules: components, hooks, mocks, screens, types
docs/         Setup, architecture, and contributing guides
openspec/     Spec-driven development artifacts (SDD workflow)
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full data flow and conventions.

## Conventions (summary)

- **Colors**: theme tokens only — hardcoded hex is banned by ESLint.
- **Layout**: every screen uses the `Screen` scaffold (safe-area + background).
- **Animation**: screens animate; cards stay pure (no nested `FadeInUp`).
- **Data**: screens consume hooks (`{ data, isLoading, error, refresh }`); hooks consume `mocks/`.
- **Types**: `StyleProp<ViewStyle>` for style props; no `any`.

## Verification Gates

```bash
pnpm typecheck   # tsc --noEmit — zero errors
pnpm lint        # eslint . --max-warnings 0 — zero warnings
```

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — conventional commits, gates, and the SDD workflow.

## License

Private project — all rights reserved.