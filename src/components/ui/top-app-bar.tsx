import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { lightColors, spacing } from '@/theme';
import { Text } from './text';

interface TopAppBarProps {
  title: string;
  actions?: ReactNode;
  /** Route to navigate to when the router history is empty (e.g. deep link). */
  fallbackHref?: Href;
  style?: StyleProp<ViewStyle>;
}

const BACK_BUTTON_SIZE = 44;
const BAR_HEIGHT = 56;

export function TopAppBar({ title, actions, fallbackHref, style }: TopAppBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace(fallbackHref ?? '/');
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Volver"
        onPress={handleBack}
        style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
      >
        <ArrowLeft size={24} color={lightColors.onSurface} />
      </Pressable>
      <Text
        variant="titleLarge"
        color={lightColors.onSurface}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={styles.title}
      >
        {title}
      </Text>
      {actions ? <View style={styles.actions}>{actions}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.surface,
    paddingHorizontal: spacing.xs,
  },
  backButton: {
    width: BACK_BUTTON_SIZE,
    height: BACK_BUTTON_SIZE,
    borderRadius: BACK_BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  title: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
