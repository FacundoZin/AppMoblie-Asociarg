# Setup

## Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm 10+
- Expo Go SDK 57 app on a physical device, or an Android/iOS emulator
- (Optional) Android Studio / Xcode for native builds

## Install

```bash
pnpm install
```

## Run

```bash
pnpm start        # Expo dev server (QR code for Expo Go)
pnpm run android  # Expo run:android (native build)
pnpm run ios      # Expo run:ios (native build)
pnpm run web      # Expo web (bundler: metro)
```

## Verification Gates

```bash
pnpm typecheck   # tsc --noEmit — zero errors
pnpm lint        # eslint . --max-warnings 0 — zero warnings
```

## Clean

```bash
pnpm run clean       # removes the .expo cache directory
```

## Troubleshooting

- **Metro cache issues**: stop the dev server, run `pnpm run clean`, restart.
- **Fonts not loading**: fonts are loaded in `app/_layout.tsx` via `@expo-google-fonts/manrope` with `expo-splash-screen` keep-visible gating. If the splash never hides, check the network when fonts are fetched for the first time.
- **SDK version**: this project targets **Expo SDK 57**. Use `npx expo install <package>` to install packages with SDK-compatible versions (never `npm install` an Expo module directly).