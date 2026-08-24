import { useState } from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Text } from './text';
import { lightColors, shape, spacing } from '@/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
}

export function Input({
  label,
  error,
  disabled,
  style,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? lightColors.error
    : isFocused
      ? lightColors.primary
      : lightColors.outlineVariant;
  const borderWidth = isFocused && !error ? 2 : 1;

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="labelMedium" color={lightColors.onSurfaceVariant}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor,
            borderWidth,
            backgroundColor: disabled ? lightColors.surfaceContainerLow : lightColors.surface,
            color: lightColors.textPrimary,
          },
          style,
        ]}
        editable={!disabled}
        placeholderTextColor={lightColors.onSurfaceVariant}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        {...rest}
      />
      {error && (
        <Text variant="bodySmall" color={lightColors.error}>
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
    borderRadius: shape.small,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
  },
});
