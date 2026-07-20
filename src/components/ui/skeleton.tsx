import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import { lightColors, radii } from '@/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function Skeleton({ width = '100%', height = 20, borderRadius, style }: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    const animation = withTiming(0.7, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });

    const interval = setInterval(() => {
      opacity.value = opacity.value === 0.3 ? 0.7 : 0.3;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius: borderRadius || radii.md },
        animatedStyle,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: lightColors.border,
  },
});
