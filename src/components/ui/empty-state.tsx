import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { Info } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';

interface EmptyStateProps {
  icon?: ComponentType<{ size?: number; color?: string }>;
  title: string;
  description?: string;
}

export function EmptyState({ icon: IconComponent, title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {IconComponent ? (
          <Icon name={IconComponent} size={48} color={lightColors.onSurfaceVariant} />
        ) : (
          <Icon name={Info} size={48} color={lightColors.onSurfaceVariant} />
        )}
      </View>
      <Text variant="titleMedium" color={lightColors.textPrimary} style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text variant="bodyMedium" color={lightColors.onSurfaceVariant} style={styles.description}>
          {description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: radii.full,
    backgroundColor: lightColors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    textAlign: 'center',
  },
});
