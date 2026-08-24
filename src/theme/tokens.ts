import { lightColors, darkColors } from './colors';
import { fontFamily, fontSize, lineHeight, fontWeight, typeRoles } from './typography';
import { spacing } from './spacing';
import { radii, shape } from './radii';
import { shadows, elevation } from './shadows';

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
  typeRoles,
  shape,
  elevation,
} as const;
