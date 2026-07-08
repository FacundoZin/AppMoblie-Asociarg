import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityItem } from '@/components';
import { CreditCard, Calendar, Bell } from 'lucide-react-native';
import { spacing } from '@/theme';

interface Activity {
  id: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  description: string;
  time: string;
}

interface RecentActivityProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    id: '1',
    icon: CreditCard,
    description: 'Pago registrado - $15.000',
    time: 'Hace 2 horas',
  },
  {
    id: '2',
    icon: Calendar,
    description: 'Convocatoria creada - Fútbol',
    time: 'Hace 5 horas',
  },
  {
    id: '3',
    icon: Bell,
    description: 'Cuota vencida - Junio',
    time: 'Ayer',
  },
];

export function RecentActivity({ activities = defaultActivities }: RecentActivityProps) {
  return (
    <View style={styles.container}>
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          icon={activity.icon}
          description={activity.description}
          time={activity.time}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.lg,
  },
});
