import React from 'react';
import { View, StyleSheet } from 'react-native';
import { lightColors, spacing } from '@/theme';

interface DividerProps {
  horizontal?: boolean;
  marginVertical?: number;
  color?: string;
}

export function Divider({
  horizontal = false,
  marginVertical,
  color,
}: DividerProps) {
  return (
    <View
      style={[
        horizontal ? styles.horizontal : styles.vertical,
        {
          backgroundColor: color || lightColors.border,
          marginVertical: marginVertical || spacing.sm,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});
