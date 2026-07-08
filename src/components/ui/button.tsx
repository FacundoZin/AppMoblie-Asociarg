import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { lightColors, radii, spacing } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ComponentType<{ size?: number; color?: string }>;
  rightIcon?: React.ComponentType<{ size?: number; color?: string }>;
  onPress?: () => void;
  style?: ViewStyle;
}

const variantStyles: Record<ButtonVariant, { backgroundColor: string; textColor: string }> = {
  primary: {
    backgroundColor: lightColors.primary,
    textColor: lightColors.surface,
  },
  secondary: {
    backgroundColor: lightColors.primaryLight,
    textColor: lightColors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    textColor: lightColors.primary,
  },
  danger: {
    backgroundColor: lightColors.error,
    textColor: lightColors.surface,
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
            variant="base"
            weight="semibold"
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
    borderRadius: radii.lg,
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
