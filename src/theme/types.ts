import { lightColors, darkColors } from './colors';
import { fontFamily, fontSize, lineHeight, fontWeight } from './typography';
import { spacing } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';

export type Colors = typeof lightColors;
export type DarkColors = typeof darkColors;
export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type LineHeight = typeof lineHeight;
export type FontWeight = typeof fontWeight;
export type Spacing = typeof spacing;
export type Radii = typeof radii;
export type Shadows = typeof shadows;

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
