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
import { elevation, lightColors } from '@/theme';

const TAB_ICON_SIZE = 22;

function createTabBarIcon(icon: LucideIcon) {
  return ({ focused, color }: { focused: boolean; color: ColorValue }) => (
    <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
      <Icon
        name={icon}
        size={TAB_ICON_SIZE}
        color={focused ? lightColors.onSecondaryContainer : color}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: lightColors.onSurface,
        tabBarInactiveTintColor: lightColors.onSurfaceVariant,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 84 : 80,
          paddingBottom: Platform.OS === 'ios' ? 26 : 12,
          paddingTop: 8,
          borderTopWidth: 0,
          backgroundColor: lightColors.surfaceContainerLowest,
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
          tabBarIcon: createTabBarIcon(Megaphone),
        }}
      />
      <Tabs.Screen
        name="pagos"
        options={{
          title: 'Cuotas',
          tabBarIcon: createTabBarIcon(Wallet),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: createTabBarIcon(Home),
        }}
      />
      <Tabs.Screen
        name="convocatorias"
        options={{
          title: 'Eventos',
          tabBarIcon: createTabBarIcon(CalendarDays),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: createTabBarIcon(CircleUserRound),
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
  iconContainerFocused: {
    backgroundColor: lightColors.secondaryContainer,
  },
});
