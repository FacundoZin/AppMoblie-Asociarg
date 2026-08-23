import type { ComponentType } from 'react';
import { ColorValue } from 'react-native';
import { lightColors } from '@/theme';

interface IconProps {
  name: ComponentType<{ size?: number; color?: string }>;
  size?: number;
  color?: ColorValue;
}

export function Icon({ name: IconComponent, size = 24, color }: IconProps) {
  return (
    <IconComponent
      size={size}
      color={(color as string) || lightColors.textPrimary}
    />
  );
}
