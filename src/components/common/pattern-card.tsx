import type { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { radii, spacing } from '@/theme';
import { useTheme } from '@/theme';

type PatternCardVariant = 'primary' | 'surface';

interface PatternCardProps {
  children: ReactNode;
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
  const { colors } = useTheme();
  const isPrimary = variant === 'primary';

  const cardColor = isPrimary
    ? { backgroundColor: colors.primary }
    : { backgroundColor: colors.surface };
  const patternColor = isPrimary
    ? { backgroundColor: colors.primaryDark, opacity: 0.3 }
    : { backgroundColor: colors.primaryLight, opacity: 0.6 };
  const patternSmallColor = isPrimary
    ? { backgroundColor: colors.primaryDark, opacity: 0.2 }
    : { backgroundColor: colors.primaryLight, opacity: 0.5 };

  return (
    <View style={[styles.card, cardColor, style]}>
      <View style={[styles.pattern, patternColor]} />
      <View style={[styles.patternSmall, patternSmallColor]} />
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
  pattern: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  patternSmall: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
