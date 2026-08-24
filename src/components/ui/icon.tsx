import type { ComponentType } from 'react';
import { ColorValue } from 'react-native';
import { useTheme } from '@/theme';

interface IconProps {
  name: ComponentType<{ size?: number; color?: string }>;
  size?: number;
  color?: ColorValue;
}

export function Icon({ name: IconComponent, size = 24, color }: IconProps) {
  const { colors } = useTheme();

  return (
    <IconComponent
      size={size}
      color={(color as string) || colors.textPrimary}
    />
  );
}
