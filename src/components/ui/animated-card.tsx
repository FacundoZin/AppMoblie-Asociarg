import React from 'react';
import { StyleProp, ViewStyle, TouchableOpacityProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface AnimatedCardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AnimatedCard({ children, style, ...props }: AnimatedCardProps) {
  const scale = useSharedValue(1);
  const shadowElevation = useSharedValue(3);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadowElevation.value / 10,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      damping: 12,
      stiffness: 150,
      mass: 0.8,
    });
    shadowElevation.value = withSpring(5, {
      damping: 12,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 150,
      mass: 0.8,
    });
    shadowElevation.value = withSpring(3, {
      damping: 12,
      stiffness: 150,
    });
  };

  return (
    <Animated.View
      style={[style, animatedStyle]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
