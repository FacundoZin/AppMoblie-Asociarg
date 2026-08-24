import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Text } from './text';
import { Icon } from './icon';
import { LucideIcon } from 'lucide-react-native';
import { lightColors, shape, spacing } from '@/theme';

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

  const palette = selected
    ? {
        background: lightColors.primaryContainer,
        content: lightColors.onPrimaryContainer,
        borderColor: lightColors.primaryContainer,
        badgeBackground: lightColors.onPrimaryContainer,
        badgeText: lightColors.primaryContainer,
      }
    : {
        background: lightColors.surfaceContainerLow,
        content: lightColors.onSurfaceVariant,
        borderColor: lightColors.outlineVariant,
        badgeBackground: lightColors.primaryContainer,
        badgeText: lightColors.onPrimaryContainer,
      };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[
          styles.chip,
          {
            backgroundColor: palette.background,
            borderColor: palette.borderColor,
          },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {IconComponent && (
          <Icon name={IconComponent} size={14} color={palette.content} />
        )}
        <Text
          variant="labelLarge"
          color={palette.content}
          style={styles.label}
        >
          {label}
        </Text>
        {count !== undefined && count > 0 && (
          <View style={[styles.badge, { backgroundColor: palette.badgeBackground }]}>
            <Text variant="labelMedium" color={palette.badgeText}>
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
    borderRadius: shape.small,
    borderWidth: 1,
    gap: spacing.xs,
  },
  label: {
    marginRight: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: shape.full,
    minWidth: 20,
    alignItems: 'center',
  },
});
