import { View, StyleSheet } from 'react-native';
import { StatCard } from '@/components/common';
import { CreditCard, Calendar, Bell } from 'lucide-react-native';
import { spacing } from '@/theme';

interface SummaryCardProps {
  pendingPayments: number;
  activeEvents: number;
  newNotifications: number;
}

export function SummaryCard({ pendingPayments, activeEvents, newNotifications }: SummaryCardProps) {
  const stats = [
    {
      icon: CreditCard,
      label: 'Cuotas pendientes',
      value: pendingPayments,
      color: 'warning' as const,
    },
    {
      icon: Calendar,
      label: 'Convocatorias activas',
      value: activeEvents,
      color: 'info' as const,
    },
    {
      icon: Bell,
      label: 'Notificaciones nuevas',
      value: newNotifications,
      color: 'primary' as const,
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          color={stat.color}
          style={styles.statCard}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
  },
});