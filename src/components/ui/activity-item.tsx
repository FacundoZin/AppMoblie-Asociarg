import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { shape, spacing } from '@/theme';
import { useTheme } from '@/theme';

interface ActivityItemProps {
  icon: ComponentType<{ size?: number; color?: string }>;
  description: string;
  time: string;
}

export function ActivityItem({ icon, description, time }: ActivityItemProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceContainerLow }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primaryContainer }]}>
        <Icon name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text variant="titleSmall" color={colors.textPrimary}>
          {description}
        </Text>
        <Text variant="bodySmall" color={colors.onSurfaceVariant}>
          {time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: shape.medium,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
});
