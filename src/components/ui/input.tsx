import { useState } from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Text } from './text';
import { shape, spacing } from '@/theme';
import { useTheme } from '@/theme';

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
  const { colors } = useTheme();

  const borderColor = error
    ? colors.error
    : isFocused
      ? colors.primary
      : colors.outlineVariant;
  const borderWidth = isFocused && !error ? 2 : 1;

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="labelMedium" color={colors.onSurfaceVariant}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor,
            borderWidth,
            backgroundColor: disabled ? colors.surfaceContainerLow : colors.surface,
            color: colors.textPrimary,
          },
          style,
        ]}
        editable={!disabled}
        placeholderTextColor={colors.onSurfaceVariant}
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
        <Text variant="bodySmall" color={colors.error}>
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
