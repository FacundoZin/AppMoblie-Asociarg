import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { lightColors, spacing, radii } from '@/theme';

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
    color: lightColors.surface,
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
      <Text variant="xs" weight="semibold" color={colors.color}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
});
