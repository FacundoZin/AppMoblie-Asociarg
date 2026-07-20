import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Card, Text, Icon } from '@/components';
import { LucideIcon } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';

interface ContactActionCardProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  color: string;
  bgColor: string;
  onPress: () => void;
}

export function ContactActionCard({
  icon: IconComponent,
  label,
  description,
  color,
  bgColor,
  onPress,
}: ContactActionCardProps) {
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
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Card padding="lg" style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <Icon name={IconComponent} size={24} color={color} />
          </View>
          <View style={styles.content}>
            <Text variant="base" weight="semibold" color={lightColors.textPrimary}>
              {label}
            </Text>
            {description && (
              <Text variant="xs" color={lightColors.textSecondary} style={styles.description}>
                {description}
              </Text>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  description: {
    marginTop: spacing.xs,
  },
});
