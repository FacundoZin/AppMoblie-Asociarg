import React from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import { lightColors, radii, spacing } from '@/theme';

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  marginVertical?: number;
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius,
  marginVertical,
}: SkeletonProps) {
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius: borderRadius || radii.sm,
          marginVertical: marginVertical || 0,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: lightColors.border,
  },
});
