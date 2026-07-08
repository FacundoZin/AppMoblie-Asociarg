import { useEffect } from 'react';
import { useSharedValue, withSpring, withTiming, Easing } from 'react-native-reanimated';

export function useStaggerAnimation(itemCount: number, delay: number = 100) {
  const animations = Array.from({ length: itemCount }, (_, i) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
      const timeout = setTimeout(() => {
        opacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        });
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
          mass: 0.8,
        });
      }, i * delay);

      return () => clearTimeout(timeout);
    }, []);

    return { opacity, translateY };
  });

  return animations;
}
