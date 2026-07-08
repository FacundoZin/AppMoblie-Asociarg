import { lightColors, darkColors } from './colors';
import { fontFamily, fontSize, lineHeight, fontWeight } from './typography';
import { spacing } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';

export const tokens = {
  colors: lightColors,
  darkColors,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  spacing,
  radii,
  shadows,
} as const;
