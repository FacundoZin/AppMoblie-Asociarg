import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Text } from './text';
import { lightColors, radii, spacing } from '@/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
}

export function Input({ label, error, disabled, style, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Text variant="sm" weight="medium" color={lightColors.textSecondary}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? lightColors.error : lightColors.border,
            backgroundColor: disabled ? lightColors.background : lightColors.surface,
          },
          style,
        ]}
        editable={!disabled}
        placeholderTextColor={lightColors.textSecondary}
        {...rest}
      />
      {error && (
        <Text variant="xs" color={lightColors.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: lightColors.textPrimary,
  },
});
