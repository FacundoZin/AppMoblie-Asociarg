import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { lightColors, shape, spacing } from '@/theme';

interface ActivityItemProps {
  icon: ComponentType<{ size?: number; color?: string }>;
  description: string;
  time: string;
}

export function ActivityItem({ icon, description, time }: ActivityItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={20} color={lightColors.primary} />
      </View>
      <View style={styles.content}>
        <Text variant="titleSmall" color={lightColors.textPrimary}>
          {description}
        </Text>
        <Text variant="bodySmall" color={lightColors.onSurfaceVariant}>
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
    backgroundColor: lightColors.surfaceContainerLow,
    borderRadius: shape.medium,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: lightColors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
});
