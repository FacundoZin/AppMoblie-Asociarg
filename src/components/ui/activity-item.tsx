import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { lightColors, spacing, shadows } from '@/theme';

interface ActivityItemProps {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  description: string;
  time: string;
}

export function ActivityItem({ icon, description, time }: ActivityItemProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, shadows.sm]}>
        <Icon name={icon} size={20} color={lightColors.primary} />
      </View>
      <View style={styles.content}>
        <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
          {description}
        </Text>
        <Text variant="xs" color={lightColors.textSecondary}>
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
    paddingVertical: spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: lightColors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
});
