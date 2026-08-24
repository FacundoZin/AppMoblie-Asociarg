import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityItem } from '@/components';
import { CreditCard, Calendar, Bell } from 'lucide-react-native';
import { spacing, useTheme } from '@/theme';

interface RecentActivityProps {
  activities?: Array<{
    id: string;
    icon: ComponentType<{ size?: number; color?: string }>;
    description: string;
    time: string;
  }>;
}

const defaultActivities = [
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
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {activities.map((activity) => (
        <View
          key={activity.id}
          style={[styles.itemWrapper, { borderBottomColor: colors.border }]}
        >
          <ActivityItem
            icon={activity.icon}
            description={activity.description}
            time={activity.time}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.lg,
  },
  itemWrapper: {
    borderBottomWidth: 1,
  },
});
