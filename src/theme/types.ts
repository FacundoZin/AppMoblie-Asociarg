import { lightColors, darkColors } from './colors';
import { fontFamily, fontSize, lineHeight, fontWeight, typeRoles } from './typography';
import { spacing } from './spacing';
import { radii, shape } from './radii';
import { shadows, elevation } from './shadows';

export type Colors = typeof lightColors;
export type DarkColors = typeof darkColors;
export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type LineHeight = typeof lineHeight;
export type FontWeight = typeof fontWeight;
export type Spacing = typeof spacing;
export type Radii = typeof radii;
export type Shadows = typeof shadows;
export type TypeRoleName = keyof typeof typeRoles;
export type TypeRole = (typeof typeRoles)[TypeRoleName];
export type Shape = typeof shape;
export type ElevationLevels = typeof elevation;

export interface Theme {
  colors: Colors;
  darkColors: DarkColors;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineHeight: LineHeight;
  fontWeight: FontWeight;
  spacing: Spacing;
  radii: Radii;
  shadows: Shadows;
}
