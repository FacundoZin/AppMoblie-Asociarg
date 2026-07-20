import { Tabs } from 'expo-router';
import { Home, MessageCircle, CreditCard, Calendar, User, Phone } from 'lucide-react-native';
import { Icon } from '@/components';
import { lightColors, spacing, radii } from '@/theme';
import { View, StyleSheet, Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: lightColors.primary,
        tabBarInactiveTintColor: lightColors.neutral,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 75 : 65,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 6,
          borderTopWidth: 0,
          backgroundColor: lightColors.surface,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent = Home;

          if (route.name === 'index') IconComponent = Home;
          else if (route.name === 'notifications') IconComponent = MessageCircle;
          else if (route.name === 'pagos/index') IconComponent = CreditCard;
          else if (route.name === 'convocatorias/index') IconComponent = Calendar;
          else if (route.name === 'perfil') IconComponent = User;
          else if (route.name === 'contacto') IconComponent = Phone;

          return (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.indicator} />}
              <Icon name={IconComponent} size={18} color={color} />
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: 8,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 1,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          paddingHorizontal: 0,
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
          title: 'Notif',
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
          title: 'Convoc',
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
        }}
      />
      <Tabs.Screen
        name="contacto"
        options={{
          title: 'Contact',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: lightColors.primary,
    marginBottom: 2,
  },
});
