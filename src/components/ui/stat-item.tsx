import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { lightColors, spacing } from '@/theme';

interface StatItemProps {
  label: string;
  value: string | number;
}

export function StatItem({ label, value }: StatItemProps) {
  return (
    <View style={styles.container}>
      <Text variant="xs" color={lightColors.textSecondary} style={styles.label}>
        {label}
      </Text>
      <Text variant="xl" weight="bold" color={lightColors.textPrimary}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
});
