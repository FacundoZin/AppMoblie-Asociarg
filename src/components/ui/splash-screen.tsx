import { useEffect, useRef } from 'react';
import { StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { lightColors } from '@/theme';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  useEffect(() => {
    // Entrance animation
    scale.value = withTiming(1.1, { duration: 800 });

    // Exit animation after 1.5 seconds, then notify the parent
    const exitTimeout = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 500 });
      scale.value = withTiming(0.9, { duration: 500 });
    }, 1500);

    const finishTimeout = setTimeout(() => {
      onFinishRef.current();
    }, 2000);

    return () => {
      clearTimeout(exitTimeout);
      clearTimeout(finishTimeout);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        // eslint-disable-next-line @typescript-eslint/no-require-imports -- static asset reference, standard for Metro
        source={require('../../../assets/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: lightColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
