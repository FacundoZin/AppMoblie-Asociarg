import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from '@/components';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';

interface EmptyStateProps {
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  description?: string;
}

export function EmptyState({ icon: IconComponent, title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {IconComponent ? (
          <Icon name={IconComponent} size={48} color={lightColors.neutral} />
        ) : (
          <Icon name={Info} size={48} color={lightColors.neutral} />
        )}
      </View>
      <Text variant="lg" weight="semibold" color={lightColors.textPrimary} style={styles.title}>
        {title}
      </Text>
      {description && (
        <Text variant="sm" color={lightColors.textSecondary} style={styles.description}>
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
    backgroundColor: lightColors.background,
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
