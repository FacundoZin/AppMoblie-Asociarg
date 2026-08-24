import type { ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import {
  Megaphone,
  Wallet,
  Home,
  CalendarDays,
  CircleUserRound,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Icon } from '@/components';
import { useTheme } from '@/theme';
import { TabBar, type TabBarProps } from '../../src/components/ui/tab-bar';

const TAB_ICON_SIZE = 22;

// The sliding pill now lives in TabBar; each route only declares which icon to
// render. The icon color comes from the tab tints resolved by the custom bar.
function createTabBarIcon(icon: LucideIcon) {
  return ({ color }: { focused: boolean; color: ColorValue }) => (
    <Icon name={icon} size={TAB_ICON_SIZE} color={color} />
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        // Paint each scene with the app background so the cross-fade never
        // reveals a gray/transparent gap between the outgoing and incoming
        // screens.
        sceneStyle: { backgroundColor: colors.background },
        // Frozen screens show a stale frame when refocused, which reads as a
        // screenshot flash during the tab transition. Keep them live instead.
        freezeOnBlur: false,
        tabBarActiveTintColor: colors.onSecondaryContainer,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
      }}
      // Keep inactive tab screens attached: react-native-screens otherwise
      // snapshots them on Android, which shows as a brief gray "photo" of the
      // screen when switching back to a tab.
      detachInactiveScreens={false}
      // expo-router vendors its own forked copy of @react-navigation/bottom-tabs
      // whose types are structurally incompatible with the standalone package,
      // so TabBar declares a minimal props shape and we bridge once here.
      tabBar={(props) => <TabBar {...(props as unknown as TabBarProps)} />}
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
