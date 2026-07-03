import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import PaymentsScreen from "../screens/PaymentsScreen";
import EventsScreen from "../screens/EventsScreen";

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: "#0B3A6E",
  success: "#2FBF71",
  inactive: "#A0A4A8"
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") iconName = "home-outline";
          if (route.name === "Notificaciones") iconName = "chatbubble-outline";
          if (route.name === "Cuotas") iconName = "card-outline";
          if (route.name === "Convocatorias") iconName = "calendar-outline";

          return <Ionicons name={iconName as any} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notificaciones" component={NotificationsScreen} />
      <Tab.Screen name="Cuotas" component={PaymentsScreen} />
      <Tab.Screen name="Convocatorias" component={EventsScreen} />
    </Tab.Navigator>
  );
}