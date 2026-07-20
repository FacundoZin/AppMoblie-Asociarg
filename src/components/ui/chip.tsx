import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Text, Icon } from '@/components';
import { LucideIcon } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';

interface ChipProps {
  icon?: LucideIcon;
  label: string;
  selected?: boolean;
  onPress?: () => void;
  count?: number;
}

export function Chip({ icon: IconComponent, label, selected = false, onPress, count }: ChipProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.chip, selected && styles.chipSelected]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {IconComponent && (
          <Icon name={IconComponent} size={14} color={selected ? lightColors.surface : lightColors.textSecondary} />
        )}
        <Text
          variant="xs"
          weight="medium"
          color={selected ? lightColors.surface : lightColors.textSecondary}
          style={styles.label}
        >
          {label}
        </Text>
        {count !== undefined && count > 0 && (
          <View style={[styles.badge, selected && styles.badgeSelected]}>
            <Text variant="xs" weight="bold" color={selected ? lightColors.surface : lightColors.textSecondary}>
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    backgroundColor: lightColors.background,
    borderWidth: 1,
    borderColor: lightColors.border,
    gap: spacing.xs,
  },
  chipSelected: {
    backgroundColor: lightColors.primary,
    borderColor: lightColors.primary,
  },
  label: {
    marginRight: spacing.xs,
  },
  badge: {
    backgroundColor: lightColors.primaryLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radii.full,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeSelected: {
    backgroundColor: lightColors.surface,
  },
});
