import type { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { shape, shadows, spacing, elevation } from '@/theme';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme';

type CardVariant = 'elevated' | 'filled' | 'outlined';
type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  children: ReactNode;
  padding?: keyof typeof spacing;
  shadow?: CardShadow;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
}

function getVariantStyles(colors: Colors): Record<CardVariant, { backgroundColor: string; borderWidth: number; borderColor: string }> {
  return {
    elevated: {
      backgroundColor: colors.surfaceContainerLow,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    filled: {
      backgroundColor: colors.surfaceContainerHighest,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    outlined: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.outlineVariant,
    },
  };
}

export function Card({
  children,
  padding = 'base',
  shadow,
  variant = 'elevated',
  style,
}: CardProps) {
  const { colors } = useTheme();
  const variantStyle = getVariantStyles(colors)[variant];
  const resolvedShadow: CardShadow = shadow ?? (variant === 'elevated' ? 'sm' : 'none');

  return (
    <View
      style={[
        styles.card,
        variantStyle,
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
