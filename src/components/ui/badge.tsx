import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { lightColors, spacing, shape } from '@/theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  label: string;
}

const variantStyles: Record<BadgeVariant, { backgroundColor: string; color: string }> = {
  default: {
    backgroundColor: lightColors.neutral,
    color: lightColors.surface,
  },
  success: {
    backgroundColor: lightColors.success,
    color: lightColors.surface,
  },
  warning: {
    backgroundColor: lightColors.warning,
    color: lightColors.surface,
  },
  error: {
    backgroundColor: lightColors.error,
    color: lightColors.onError,
  },
  info: {
    backgroundColor: lightColors.info,
    color: lightColors.surface,
  },
};

export function Badge({ variant = 'default', label }: BadgeProps) {
  const colors = variantStyles[variant];

  return (
    <View style={[styles.badge, { backgroundColor: colors.backgroundColor }]}>
      <Text variant="labelSmall" color={colors.color}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
    borderRadius: shape.full,
    alignSelf: 'flex-start',
  },
});
