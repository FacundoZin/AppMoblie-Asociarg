import type { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { lightColors, shape, shadows, spacing, elevation } from '@/theme';

type CardVariant = 'elevated' | 'filled' | 'outlined';
type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  children: ReactNode;
  padding?: keyof typeof spacing;
  shadow?: CardShadow;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
}

const variantStyles: Record<CardVariant, { backgroundColor: string; borderWidth: number; borderColor: string }> = {
  elevated: {
    backgroundColor: lightColors.surfaceContainerLow,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  filled: {
    backgroundColor: lightColors.surfaceContainerHighest,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  outlined: {
    backgroundColor: lightColors.surface,
    borderWidth: 1,
    borderColor: lightColors.outlineVariant,
  },
};

export function Card({
  children,
  padding = 'base',
  shadow,
  variant = 'elevated',
  style,
}: CardProps) {
  const colors = variantStyles[variant];
  const resolvedShadow: CardShadow = shadow ?? (variant === 'elevated' ? 'sm' : 'none');

  return (
    <View
      style={[
        styles.card,
        colors,
        { padding: spacing[padding] },
        resolvedShadow !== 'none' && shadows[resolvedShadow],
        resolvedShadow === 'sm' && elevation.level1,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: shape.large,
  },
});
