import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { lightColors, spacing } from '@/theme';

interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.accent} />
        <Text variant="lg" weight="bold" color={lightColors.textPrimary}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  accent: {
    width: 4,
    height: 20,
    backgroundColor: lightColors.primary,
    borderRadius: 2,
  },
});
