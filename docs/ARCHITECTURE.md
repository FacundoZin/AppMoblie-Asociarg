# Architecture

## Overview

Feature-based React Native app with file-based routing (Expo Router). The app is in the **UI prototype phase**: no backend, authentication, database, or API calls. All data comes from typed mock files consumed through hooks.

## Folder Structure

```
app/                          # Expo Router routes (thin wrappers)
├── _layout.tsx               # Root: SafeAreaProvider, font loading, splash gating
├── +not-found.tsx
└── (tabs)/
    ├── _layout.tsx           # Tab bar configuration
    ├── index.tsx             # → HomeScreen
    ├── notifications.tsx     # → NotificationsScreen
    ├── pagos/                # → PaymentsScreen (+ [id] detail placeholder)
    ├── convocatorias/        # → EventsScreen (+ [id] detail placeholder)
    ├── perfil.tsx            # → ProfileScreen
    └── contacto.tsx          # → ContactScreen

src/
├── components/
│   ├── ui/                   # Atomic primitives: Text, Icon, Button, Card, Badge, Chip...
│   └── common/               # Composed scaffolds: Screen, PatternCard, StatCard
├── theme/                    # Design tokens: colors, typography, spacing, radii, shadows
└── features/
    └── <feature>/
        ├── components/       # Feature-specific components (barrel index.ts)
        ├── hooks/            # Data-access hooks: { data, isLoading, error, refresh }
        ├── mocks/            # Typed mock data (<name>.mock.ts)
        ├── screens/          # Screen components (consumed by app/ routes)
        ├── services/         # (only when needed, e.g. contact.service.ts)
        └── types/            # Feature types (re-exported from index.ts)
```

## Data Flow

```
Root _layout (SafeAreaProvider + splash gating + fonts)
     │
     ▼
app/(tabs)/*.tsx (thin route) ──► FeatureScreen
                                     │
                                     ├── Screen (common: safe-area + theme background)
                                     │     ├── PatternCard (common) ──► HeroCard / ProfileHero / FeaturedEventCard
                                     │     └── StatCard (common) ──► SummaryCard / notifications summary
                                     │
                                     └── useXxx() hook ──► mocks/ data ──► feature components
```

## Key Conventions

| Concern | Rule |
|---------|------|
| Layout | Every screen uses the `Screen` scaffold (safe-area + background). No raw `SafeAreaView`. |
| Colors | Theme tokens only (`src/theme/colors.ts`). Hex literals are banned in `.tsx` by ESLint. |
| Animation | Screens animate (`FadeInUp` at screen level); cards stay pure — no nested wrappers. |
| Data | Screens consume hooks; hooks consume `mocks/`; no mock constants in hook files. |
| Imports | Feature → barrel `@/components`; inside `src/components` → relative imports. |
| Types | `StyleProp<ViewStyle>` for style props; no `any`. |
| Dates | ISO (`YYYY-MM-DD`) in data; `toLocaleDateString('es-AR', ...)` at render time. |

## Shared Components

### Screen (`src/components/common/screen.tsx`)

```tsx
<Screen backgroundColor="background" edges={['top', 'bottom']}>
  <ScrollView>...</ScrollView>
</Screen>
```

### PatternCard (`src/components/common/pattern-card.tsx`)

Decorative two-circle background, replaces the copy-pasted pattern in hero cards.

```tsx
<PatternCard variant="primary" style={...}>...</PatternCard>
```

### StatCard (`src/components/common/stat-card.tsx`)

Unified icon + value + label card. `bgColor` defaults to the `${color}Light` token.

```tsx
<StatCard icon={CreditCard} label="Cuotas pendientes" value={3} color="warning" />
```