import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { lightColors, radii, spacing } from '@/theme';

type PatternCardVariant = 'primary' | 'surface';

interface PatternCardProps {
  children: React.ReactNode;
  /** Visual variant: `primary` (brand background) or `surface` (neutral card). Defaults to `primary`. */
  variant?: PatternCardVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * Card with the decorative two-circle pattern previously copy-pasted across
 * HeroCard, ProfileHero, and FeaturedEventCard. Owns the background and the
 * pattern; children render the actual content.
 */
export function PatternCard({ children, variant = 'primary', style }: PatternCardProps) {
  const isPrimary = variant === 'primary';

  return (
    <View style={[styles.card, isPrimary ? styles.cardPrimary : styles.cardSurface, style]}>
      <View style={[styles.pattern, isPrimary ? styles.patternPrimary : styles.patternSurface]} />
      <View
        style={[styles.patternSmall, isPrimary ? styles.patternSmallPrimary : styles.patternSmallSurface]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  cardPrimary: {
    backgroundColor: lightColors.primary,
  },
  cardSurface: {
    backgroundColor: lightColors.surface,
  },
  pattern: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  patternPrimary: {
    backgroundColor: lightColors.primaryDark,
    opacity: 0.3,
  },
  patternSurface: {
    backgroundColor: lightColors.primaryLight,
    opacity: 0.6,
  },
  patternSmall: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  patternSmallPrimary: {
    backgroundColor: lightColors.primaryDark,
    opacity: 0.2,
  },
  patternSmallSurface: {
    backgroundColor: lightColors.primaryLight,
    opacity: 0.5,
  },
});