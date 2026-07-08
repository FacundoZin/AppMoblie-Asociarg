import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { lightColors, spacing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: spacing.xl + insets.top }]}>
      <Text variant="lg" weight="bold" color={lightColors.textPrimary}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.md,
  },
});
