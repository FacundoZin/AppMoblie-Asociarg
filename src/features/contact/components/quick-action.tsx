import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Card, Text, Icon } from '@/components';
import { LucideIcon, ChevronRight } from 'lucide-react-native';
import { spacing, radii, useTheme } from '@/theme';

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  color: string;
  bgColor: string;
  onPress: () => void;
}

export function QuickAction({
  icon: IconComponent,
  label,
  description,
  color,
  bgColor,
  onPress,
}: QuickActionProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Card padding="md" style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <Icon name={IconComponent} size={20} color={color} />
          </View>
          <View style={styles.content}>
            <Text variant="sm" weight="semibold" color={colors.textPrimary} numberOfLines={1}>
              {label}
            </Text>
            {description && (
              <Text variant="xs" color={colors.textSecondary} numberOfLines={1}>
                {description}
              </Text>
            )}
          </View>
          <Icon name={ChevronRight} size={18} color={colors.textSecondary} />
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 2,
  },
});
