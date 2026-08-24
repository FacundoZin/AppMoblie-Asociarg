import { Platform, Pressable, StyleSheet, View, type ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import {
  Megaphone,
  Wallet,
  Home,
  CalendarDays,
  CircleUserRound,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Icon } from '@/components';
import { elevation } from '@/theme';
import { useTheme } from '@/theme';

const TAB_ICON_SIZE = 22;

function createTabBarIcon(icon: LucideIcon, focusedIconColor: string, pillColor: string) {
  return ({ focused, color }: { focused: boolean; color: ColorValue }) => (
    <View
      style={[
        styles.iconContainer,
        focused && { backgroundColor: pillColor },
      ]}
    >
      <Icon
        name={icon}
        size={TAB_ICON_SIZE}
        color={focused ? focusedIconColor : color}
      />
    </View>
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.onSurface,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 84 : 80,
          paddingBottom: Platform.OS === 'ios' ? 26 : 12,
          paddingTop: 8,
          borderTopWidth: 0,
          backgroundColor: colors.surfaceContainerLowest,
          ...elevation.level2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          paddingHorizontal: 0,
        },
        // Remove the default press highlight on tabs (MD3 nav bars signal state
        // via the active pill, not a ripple/dim). expo-router injects
        // `android_ripple` into these props, so it must be nulled AFTER the
        // spread or the ripple comes right back.
        tabBarButton: (rawProps) => {
          const props = rawProps as unknown as ComponentProps<typeof Pressable>;
          return <Pressable {...props} android_ripple={undefined} />;
        },
      }}
    >
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Avisos',
          tabBarIcon: createTabBarIcon(Megaphone, colors.onSecondaryContainer, colors.secondaryContainer),
        }}
      />
      <Tabs.Screen
        name="pagos"
        options={{
          title: 'Cuotas',
          tabBarIcon: createTabBarIcon(Wallet, colors.onSecondaryContainer, colors.secondaryContainer),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: createTabBarIcon(Home, colors.onSecondaryContainer, colors.secondaryContainer),
        }}
      />
      <Tabs.Screen
        name="convocatorias"
        options={{
          title: 'Eventos',
          tabBarIcon: createTabBarIcon(CalendarDays, colors.onSecondaryContainer, colors.secondaryContainer),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: createTabBarIcon(CircleUserRound, colors.onSecondaryContainer, colors.secondaryContainer),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 64,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
