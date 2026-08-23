# Setup

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+
- Expo Go app on a physical device, or an Android/iOS emulator
- (Optional) Android Studio / Xcode for native builds

## Install

```bash
npm install
```

## Run

```bash
npm start        # Expo dev server (QR code for Expo Go)
npm run android  # Expo run:android (native build)
npm run ios      # Expo run:ios (native build)
npm run web      # Expo web (bundler: metro)
```

## Verification Gates

```bash
npm run typecheck   # tsc --noEmit — zero errors
npm run lint        # eslint . --max-warnings 0 — zero warnings
```

## Clean

```bash
npm run clean       # removes the .expo cache directory
```

## Troubleshooting

- **Metro cache issues**: stop the dev server, run `npm run clean`, restart.
- **Fonts not loading**: fonts are loaded in `app/_layout.tsx` via `@expo-google-fonts/manrope` with `expo-splash-screen` keep-visible gating. If the splash never hides, check the network when fonts are fetched for the first time.
- **SDK version**: this project targets **Expo SDK 54**. Use `npx expo install <package>` to install packages with SDK-compatible versions (never `npm install` an Expo module directly).