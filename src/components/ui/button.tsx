import type { ComponentType } from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './text';
import { Icon } from './icon';
import { shape, spacing } from '@/theme';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme';

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

function getVariantStyles(colors: Colors): Record<ButtonVariant, VariantStyle> {
  return {
    // Legacy variants (kept for backward compatibility)
    primary: {
      backgroundColor: colors.primary,
      textColor: colors.surface,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: colors.primaryLight,
      textColor: colors.primary,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: colors.primary,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: colors.error,
      textColor: colors.surface,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    // MD3 variants
    filled: {
      backgroundColor: colors.primary,
      textColor: colors.onPrimary,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    tonal: {
      backgroundColor: colors.secondaryContainer,
      textColor: colors.onSecondaryContainer,
      borderWidth: 0,
      borderColor: 'transparent',
    },
    outlined: {
      backgroundColor: colors.surface,
      textColor: colors.primary,
      borderWidth: 1,
      borderColor: colors.outline,
    },
    text: {
      backgroundColor: 'transparent',
      textColor: colors.primary,
      borderWidth: 0,
      borderColor: 'transparent',
    },
  };
}

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
  const { colors } = useTheme();
  const variantStyle = getVariantStyles(colors)[variant];
  const sizes = sizeStyles[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: variantStyle.backgroundColor,
          paddingVertical: sizes.paddingVertical,
          paddingHorizontal: sizes.paddingHorizontal,
          borderWidth: variantStyle.borderWidth,
          borderColor: variantStyle.borderColor,
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator color={variantStyle.textColor} size="small" />
      ) : (
        <>
          {LeftIcon && (
            <Icon name={LeftIcon} size={18} color={variantStyle.textColor} />
          )}
          <Text
            variant="labelLarge"
            color={variantStyle.textColor}
            style={styles.label}
          >
            {label}
          </Text>
          {RightIcon && (
            <Icon name={RightIcon} size={18} color={variantStyle.textColor} />
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
