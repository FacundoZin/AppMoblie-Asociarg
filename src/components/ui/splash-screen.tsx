import { useEffect, useRef } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { Text } from './text';

const LOGO_SIZE = 190;
const SWEEP_WIDTH = 70;
// Stagger offset between the loading dots in the pulsing wave.
const DOT_STAGGER_MS = 160;
// Timeline anchors: exit starts before finish so the fade completes first.
const EXIT_AT_MS = 1700;
const FINISH_AT_MS = 2200;

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const { colors } = useTheme();
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const overlayOpacity = useSharedValue(1);
  const overlayScale = useSharedValue(1);
  const logoScale = useSharedValue(0.6);
  const logoOpacity = useSharedValue(0);
  const wordmarkOpacity = useSharedValue(0);
  const wordmarkTranslateY = useSharedValue(12);
  const sweepTranslateX = useSharedValue(-SWEEP_WIDTH);
  const dotPulse = [
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ];

  useEffect(() => {
    // Logo entrance: damped spring for a premium feel without overshoot.
    logoScale.value = withSpring(1, {
      damping: 18,
      stiffness: 160,
      mass: 0.9,
    });
    logoOpacity.value = withTiming(1, { duration: 350 });

    // Wordmark rises into place right after the logo settles.
    wordmarkOpacity.value = withDelay(
      450,
      withTiming(1, { duration: 500 }),
    );
    wordmarkTranslateY.value = withDelay(
      450,
      withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      }),
    );

    // Signature moment: diagonal light band sweeps across the logo.
    // Loops softly (sweep + pause) for as long as the splash is visible.
    sweepTranslateX.value = withRepeat(
      withSequence(
        withDelay(
          700,
          withTiming(LOGO_SIZE + SWEEP_WIDTH * 2, {
            duration: 1300,
            easing: Easing.inOut(Easing.quad),
          }),
        ),
        withTiming(-SWEEP_WIDTH, { duration: 0 }),
      ),
      -1,
      false,
    );

    // Staggered wave on the loading dots; each dot loops independently
    // and its delay offsets only apply once before the repeat takes over.
    dotPulse.forEach((dot, index) => {
      dot.value = withDelay(
        600 + index * DOT_STAGGER_MS,
        withRepeat(
          withSequence(
            withTiming(1, {
              duration: 340,
              easing: Easing.inOut(Easing.quad),
            }),
            withTiming(0, {
              duration: 340,
              easing: Easing.inOut(Easing.quad),
            }),
          ),
          -1,
          false,
        ),
      );
    });

    // Exit animation, then notify the parent once fully faded out.
    const exitTimeout = setTimeout(() => {
      overlayOpacity.value = withTiming(0, {
        duration: FINISH_AT_MS - EXIT_AT_MS,
        easing: Easing.in(Easing.quad),
      });
      overlayScale.value = withTiming(1.06, {
        duration: FINISH_AT_MS - EXIT_AT_MS,
        easing: Easing.in(Easing.quad),
      });
    }, EXIT_AT_MS);

    const finishTimeout = setTimeout(() => {
      onFinishRef.current();
    }, FINISH_AT_MS);

    return () => {
      clearTimeout(exitTimeout);
      clearTimeout(finishTimeout);
    };
    // Run the sequence once on mount, mirroring the previous contract.
  }, []);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    transform: [{ scale: overlayScale.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmarkOpacity.value,
    transform: [{ translateY: wordmarkTranslateY.value }],
  }));

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sweepTranslateX.value }],
  }));

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: colors.background }, overlayStyle]}
    >
      <Animated.View style={[styles.logoWrapper, logoStyle]}>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-require-imports -- static asset reference, standard for Metro
          source={require('../../../assets/images/iconoasociargsinfondo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Light sweep clipped to the logo area so it reads as a sheen on
            the brand mark rather than a floating band. */}
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.sweepContainer, sweepStyle]}>
            <LinearGradient
              colors={['transparent', colors.lightSweep, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sweepBand}
            />
          </Animated.View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.wordmarkWrapper, wordmarkStyle]}>
        <Text variant="titleLarge" weight="extrabold" color={colors.onSurface} style={styles.wordmark}>
          Asociarg
        </Text>

        <View style={styles.dotsRow}>
          {[colors.brandBlue, colors.brandGreen, colors.brandNavy].map((dotColor, index) => (
            <Dot key={dotColor} color={dotColor} pulse={dotPulse[index]} />
          ))}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

interface DotProps {
  color: string;
  pulse: SharedValue<number>;
}

function Dot({ color, pulse }: DotProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + 0.7 * pulse.value,
    transform: [{ translateY: -5 * pulse.value }],
  }));

  return (
    <Animated.View
      style={[styles.dot, { backgroundColor: color }, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  logoWrapper: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  sweepContainer: {
    position: 'absolute',
    top: -LOGO_SIZE,
    bottom: -LOGO_SIZE,
    left: 0,
    width: SWEEP_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sweepBand: {
    width: SWEEP_WIDTH,
    height: LOGO_SIZE * 2,
    transform: [{ rotate: '20deg' }],
  },
  wordmarkWrapper: {
    alignItems: 'center',
    marginTop: 24,
  },
  wordmark: {
    letterSpacing: 3,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
