import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { Info } from 'lucide-react-native';
import { spacing, radii } from '@/theme';
import { useTheme } from '@/theme';

interface EmptyStateProps {
  icon?: ComponentType<{ size?: number; color?: string }>;
  title: string;
  description?: string;
}

export function EmptyState({ icon: IconComponent, title, description }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.surfaceContainerHigh }]}>
        {IconComponent ? (
          <Icon name={IconComponent} size={48} color={colors.onSurfaceVariant} />
        ) : (
          <Icon name={Info} size={48} color={colors.onSurfaceVariant} />
        )}
      </View>
      <Text variant="titleMedium" color={colors.textPrimary} style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text variant="bodyMedium" color={colors.onSurfaceVariant} style={styles.description}>
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
