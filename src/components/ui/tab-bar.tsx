import { useEffect, type ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ColorValue,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { elevation } from '@/theme';
import { useTheme } from '@/theme';

const PILL_WIDTH = 64;
const PILL_HEIGHT = 32;
const PILL_BORDER_RADIUS = 16;
const ICON_SIZE = 22;

// Slightly under-damped so the pill still overshoots, but softer than the
// initial tuning — it reads as a relaxed glide instead of a snap.
const PILL_SPRING = { damping: 20, stiffness: 160, mass: 1 };
const ICON_SPRING = { damping: 14, stiffness: 320 };

/**
 * Minimal mirror of React Navigation's `BottomTabBarProps`.
 *
 * A full import of `BottomTabBarProps` from `@react-navigation/bottom-tabs`
 * does not typecheck here because expo-router vendors its own forked copy of
 * that package with structurally incompatible types. This local shape covers
 * exactly what this component consumes.
 */
export interface TabBarProps {
  state: {
    index: number;
    routes: ReadonlyArray<{
      key: string;
      name: string;
      params?: object | undefined;
    }>;
  };
  descriptors: Record<string, { options: TabBarOptions }>;
  navigation: {
    emit(event: {
      type: string;
      target?: string;
      canPreventDefault?: boolean;
    }): { defaultPrevented: boolean };
    navigate(name: string, params?: object): void;
  };
}

interface TabBarOptions {
  tabBarIcon?:
    | ((props: { focused: boolean; color: ColorValue; size: number }) => ReactNode)
    | undefined;
  tabBarLabel?:
    | string
    | ((props: { focused: boolean; color: ColorValue }) => ReactNode)
    | undefined;
  title?: string | undefined;
  tabBarActiveTintColor?: string | undefined;
  tabBarInactiveTintColor?: string | undefined;
  tabBarAccessibilityLabel?: string | undefined;
}

interface TabBarItemProps {
  focused: boolean;
  icon: TabBarOptions['tabBarIcon'];
  label: string;
  activeTintColor: string;
  inactiveTintColor: string;
  accessibilityLabel?: string | undefined;
  onPress: () => void;
}

/**
 * Single tab button. Lives in its own component so each icon gets an isolated
 * shared value for its scale micro-interaction (one animated style per icon).
 */
function TabBarItem({
  focused,
  icon,
  label,
  activeTintColor,
  inactiveTintColor,
  accessibilityLabel,
  onPress,
}: TabBarItemProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      // Jump below baseline then spring back to 1 so the focus change reads as a bounce.
      scale.value = 0.85;
      scale.value = withSpring(1, ICON_SPRING);
    }
  }, [focused, scale]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={styles.item}
    >
      <Animated.View style={[styles.iconContainer, iconStyle]}>
        {icon?.({
          focused,
          color: focused ? activeTintColor : inactiveTintColor,
          size: ICON_SIZE,
        })}
      </Animated.View>
      <Text
        style={[
          styles.label,
          { color: focused ? colors.onSurface : colors.onSurfaceVariant },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/** Resolves the visible tab label following the framework's fallback chain. */
function resolveTabLabel(options: TabBarOptions, routeName: string): string {
  if (typeof options.tabBarLabel === 'string') return options.tabBarLabel;
  return options.title ?? routeName;
}

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const { colors } = useTheme();

  // Row width lands asynchronously from onLayout, so it lives in a shared value:
  // the pill style recomputes on the UI thread once measurement arrives.
  const barWidth = useSharedValue(0);
  const activeIndex = useSharedValue(state.index);

  useEffect(() => {
    activeIndex.value = state.index;
  }, [activeIndex, state.index]);

  const pillStyle = useAnimatedStyle(() => {
    const slotWidth = barWidth.value / state.routes.length;
    return {
      // Hidden until the row is measured so the pill never flashes at a wrong
      // offset during the first frame after mount.
      opacity: barWidth.value === 0 ? 0 : 1,
      transform: [
        {
          translateX: withSpring(
            activeIndex.value * slotWidth + (slotWidth - PILL_WIDTH) / 2,
            PILL_SPRING,
          ),
        },
      ],
    };
  });

  return (
    <View
      style={[
        styles.bar,
        { backgroundColor: colors.surfaceContainerLowest },
        elevation.level2,
      ]}
    >
      <View
        style={styles.row}
        onLayout={(event) => {
          barWidth.value = event.nativeEvent.layout.width;
        }}
      >
        {/* Absolutely positioned behind the icons; first sibling keeps it underneath. */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.pill,
            { backgroundColor: colors.secondaryContainer },
            pillStyle,
          ]}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabBarItem
              key={route.key}
              focused={isFocused}
              icon={options.tabBarIcon}
              label={resolveTabLabel(options, route.name)}
              activeTintColor={
                options.tabBarActiveTintColor ?? colors.onSecondaryContainer
              }
              inactiveTintColor={
                options.tabBarInactiveTintColor ?? colors.onSurfaceVariant
              }
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: Platform.OS === 'ios' ? 84 : 80,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 26 : 12,
    borderTopWidth: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  pill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: PILL_WIDTH,
    height: PILL_HEIGHT,
    borderRadius: PILL_BORDER_RADIUS,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: PILL_WIDTH,
    height: PILL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});
