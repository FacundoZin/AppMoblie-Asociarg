import type { ReactNode } from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { fontSize, lineHeight, fontWeight, fontFamily, typeRoles, useTheme } from '@/theme';


type FontSizeName = keyof typeof fontSize;
type FontWeightName = keyof typeof fontWeight;
export type TypeRoleName = keyof typeof typeRoles;

interface TextProps extends RNTextProps {
  /** Legacy size name ('xs'…'4xl') or MD3 type role ('displayLarge'…'labelSmall'). */
  variant?: FontSizeName | TypeRoleName;
  weight?: FontWeightName;
  color?: string;
  children: ReactNode;
}

function resolveVariantStyle(variant: NonNullable<TextProps['variant']>): TextStyle {
  if (Object.prototype.hasOwnProperty.call(typeRoles, variant)) {
    return { ...typeRoles[variant as TypeRoleName] };
  }
  const sizeName = variant as FontSizeName;
  return {
    fontSize: fontSize[sizeName],
    lineHeight: lineHeight[sizeName],
  };
}

export function Text({
  variant = 'base',
  weight,
  color,
  style,
  children,
  ...rest
}: TextProps) {
  const { colors } = useTheme();
  const isRole = Object.prototype.hasOwnProperty.call(typeRoles, variant);
  const roleStyle = resolveVariantStyle(variant);
  const resolvedWeight = isRole ? weight : (weight ?? 'regular');
  // An explicit `weight` overrides the role's own weight; legacy sizes always
  // resolve their typography from `weight` (defaulting to 'regular').
  const weightOverride =
    isRole && resolvedWeight
      ? { fontWeight: fontWeight[resolvedWeight], fontFamily: fontFamily[resolvedWeight] }
      : {};

  return (
    <RNText
      style={[
        styles.base,
        roleStyle,
        weightOverride,
        !isRole && {
          fontWeight: fontWeight[(resolvedWeight ?? 'regular') as FontWeightName],
          fontFamily: fontFamily[(resolvedWeight ?? 'regular') as FontWeightName],
        },
        {
          color: color || colors.textPrimary,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {},
});
