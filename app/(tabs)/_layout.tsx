import { Tabs } from 'expo-router';
import { Home, MessageCircle, CreditCard, Calendar } from 'lucide-react-native';
import { Icon } from '@/components';
import { lightColors, spacing } from '@/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: lightColors.primary,
        tabBarInactiveTintColor: lightColors.neutral,
        tabBarStyle: {
          height: 65,
          paddingBottom: spacing.sm,
          paddingTop: 6,
        },
        tabBarIcon: ({ color, size }) => {
          let IconComponent = Home;

          if (route.name === 'index') IconComponent = Home;
          else if (route.name === 'notifications') IconComponent = MessageCircle;
          else if (route.name === 'pagos/index') IconComponent = CreditCard;
          else if (route.name === 'convocatorias/index') IconComponent = Calendar;

          return <Icon name={IconComponent} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notificaciones',
        }}
      />
      <Tabs.Screen
        name="pagos"
        options={{
          title: 'Cuotas',
        }}
      />
      <Tabs.Screen
        name="convocatorias"
        options={{
          title: 'Convocatorias',
        }}
      />
    </Tabs>
  );
}
