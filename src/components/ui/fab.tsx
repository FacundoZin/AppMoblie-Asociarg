import { Pressable, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { elevation, lightColors, shape } from '@/theme';

interface FabProps {
  icon: LucideIcon;
  label?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Fab({ icon: IconComponent, label, onPress, style }: FabProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.fab, elevation.level3, pressed && styles.pressed, style]}
    >
      <IconComponent size={24} color={lightColors.onPrimaryContainer} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    borderRadius: shape.large,
    backgroundColor: lightColors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
});
