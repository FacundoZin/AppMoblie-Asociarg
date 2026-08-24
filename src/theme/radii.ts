export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

/** MD3 shape-scale roles mapped onto the existing radii values. */
export const shape = {
  extraSmall: radii.sm,
  small: radii.sm,
  medium: radii.md,
  large: radii.lg,
  extraLarge: radii.xl,
  full: radii.full,
} as const;
