import type { ComponentType } from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { lightColors, shape, spacing } from '@/theme';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'filled'
  | 'tonal'
  | 'outlined'
  | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: ComponentType<{ size?: number; color?: string }>;
  rightIcon?: ComponentType<{ size?: number; color?: string }>;
  onPress?: () => void;
  style?: ViewStyle;
}

interface VariantStyle {
  backgroundColor: string;
  textColor: string;
  borderWidth: number;
  borderColor: string;
}

const variantStyles: Record<ButtonVariant, VariantStyle> = {
  // Legacy variants (kept for backward compatibility)
  primary: {
    backgroundColor: lightColors.primary,
    textColor: lightColors.surface,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: lightColors.primaryLight,
    textColor: lightColors.primary,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
    textColor: lightColors.primary,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: lightColors.error,
    textColor: lightColors.surface,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  // MD3 variants
  filled: {
    backgroundColor: lightColors.primary,
    textColor: lightColors.onPrimary,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  tonal: {
    backgroundColor: lightColors.secondaryContainer,
    textColor: lightColors.onSecondaryContainer,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  outlined: {
    backgroundColor: lightColors.surface,
    textColor: lightColors.primary,
    borderWidth: 1,
    borderColor: lightColors.outline,
  },
  text: {
    backgroundColor: 'transparent',
    textColor: lightColors.primary,
    borderWidth: 0,
    borderColor: 'transparent',
  },
};

const sizeStyles: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number }> = {
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  label,
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onPress,
  style,
}: ButtonProps) {
  const colors = variantStyles[variant];
  const sizes = sizeStyles[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.backgroundColor,
          paddingVertical: sizes.paddingVertical,
          paddingHorizontal: sizes.paddingHorizontal,
          borderWidth: colors.borderWidth,
          borderColor: colors.borderColor,
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.textColor} size="small" />
      ) : (
        <>
          {LeftIcon && (
            <Icon name={LeftIcon} size={18} color={colors.textColor} />
          )}
          <Text
            variant="labelLarge"
            color={colors.textColor}
            style={styles.label}
          >
            {label}
          </Text>
          {RightIcon && (
            <Icon name={RightIcon} size={18} color={colors.textColor} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: shape.full,
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    marginHorizontal: spacing.xs,
  },
});
