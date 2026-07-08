import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { lightColors, spacing, radii } from '@/theme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: selected ? lightColors.primaryLight : lightColors.surface,
          borderColor: selected ? lightColors.primary : lightColors.border,
        },
      ]}
    >
      <Text
        variant="sm"
        weight="medium"
        color={selected ? lightColors.primary : lightColors.textSecondary}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
});
