export const fontFamily = {
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  extrabold: 'Manrope_800ExtraBold',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const lineHeight = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 28,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 40,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

/**
 * Material Design 3 type-scale roles.
 * Maps the MD3 display/headline/title/body/label roles onto the Manrope fonts.
 */
export const typeRoles = {
  displayLarge: { fontFamily: fontFamily.regular, fontSize: 57, lineHeight: 64, fontWeight: fontWeight.regular },
  displayMedium: { fontFamily: fontFamily.regular, fontSize: 45, lineHeight: 52, fontWeight: fontWeight.regular },
  displaySmall: { fontFamily: fontFamily.regular, fontSize: 36, lineHeight: 44, fontWeight: fontWeight.regular },
  headlineLarge: { fontFamily: fontFamily.semibold, fontSize: 32, lineHeight: 40, fontWeight: fontWeight.semibold },
  headlineMedium: { fontFamily: fontFamily.semibold, fontSize: 28, lineHeight: 36, fontWeight: fontWeight.semibold },
  headlineSmall: { fontFamily: fontFamily.semibold, fontSize: 24, lineHeight: 32, fontWeight: fontWeight.semibold },
  titleLarge: { fontFamily: fontFamily.semibold, fontSize: 22, lineHeight: 28, fontWeight: fontWeight.semibold },
  titleMedium: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 24, fontWeight: fontWeight.medium, letterSpacing: 0.15 },
  titleSmall: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 20, fontWeight: fontWeight.medium, letterSpacing: 0.1 },
  bodyLarge: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24, fontWeight: fontWeight.regular, letterSpacing: 0.5 },
  bodyMedium: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 20, fontWeight: fontWeight.regular, letterSpacing: 0.25 },
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 12, lineHeight: 16, fontWeight: fontWeight.regular, letterSpacing: 0.4 },
  labelLarge: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 20, fontWeight: fontWeight.medium, letterSpacing: 0.1 },
  labelMedium: { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 16, fontWeight: fontWeight.medium, letterSpacing: 0.5 },
  labelSmall: { fontFamily: fontFamily.medium, fontSize: 11, lineHeight: 16, fontWeight: fontWeight.medium, letterSpacing: 0.5 },
} as const;
