import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { fontSize, lineHeight, fontWeight, fontFamily, lightColors } from '@/theme';

type FontSize = keyof typeof fontSize;
type FontWeight = keyof typeof fontWeight;

interface TextProps extends RNTextProps {
  variant?: FontSize;
  weight?: FontWeight;
  color?: string;
  children: React.ReactNode;
}

export function Text({
  variant = 'base',
  weight = 'regular',
  color,
  style,
  children,
  ...rest
}: TextProps) {
  return (
    <RNText
      style={[
        styles.base,
        {
          fontSize: fontSize[variant],
          lineHeight: lineHeight[variant],
          fontWeight: fontWeight[weight],
          fontFamily: fontFamily[weight],
          color: color || lightColors.textPrimary,
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
