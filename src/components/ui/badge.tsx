import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { spacing, shape } from '@/theme';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  label: string;
}

function getVariantStyles(colors: Colors): Record<BadgeVariant, { backgroundColor: string; color: string }> {
  return {
    default: {
      backgroundColor: colors.neutral,
      color: colors.surface,
    },
    success: {
      backgroundColor: colors.success,
      color: colors.surface,
    },
    warning: {
      backgroundColor: colors.warning,
      color: colors.surface,
    },
    error: {
      backgroundColor: colors.error,
      color: colors.onError,
    },
    info: {
      backgroundColor: colors.info,
      color: colors.surface,
    },
  };
}

export function Badge({ variant = 'default', label }: BadgeProps) {
  const { colors } = useTheme();
  const variantStyle = getVariantStyles(colors)[variant];

  return (
    <View style={[styles.badge, { backgroundColor: variantStyle.backgroundColor }]}>
      <Text variant="labelSmall" color={variantStyle.color}>
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
