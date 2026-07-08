import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { lightColors, radii, shadows, spacing } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  padding?: keyof typeof spacing;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

export function Card({ children, padding = 'base', shadow = 'md', style }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        { padding: spacing[padding] },
        shadow !== 'none' && shadows[shadow],
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: lightColors.surface,
    borderRadius: radii.xl,
  },
});
