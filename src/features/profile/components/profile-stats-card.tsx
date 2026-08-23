import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatCard } from '@/components/common';
import { CreditCard, Award, TrendingUp, Users } from 'lucide-react-native';
import { spacing } from '@/theme';

interface ProfileStatsCardProps {
  paymentsCompleted: number;
  eventsAttended: number;
  yearsAsMember: number;
  invitations: number;
}

export function ProfileStatsCard({
  paymentsCompleted,
  eventsAttended,
  yearsAsMember,
  invitations,
}: ProfileStatsCardProps) {
  const stats = [
    {
      icon: CreditCard,
      label: 'Cuotas pagadas',
      value: paymentsCompleted,
      color: 'success' as const,
    },
    {
      icon: Award,
      label: 'Eventos asistidos',
      value: eventsAttended,
      color: 'info' as const,
    },
    {
      icon: TrendingUp,
      label: 'Años como socio',
      value: yearsAsMember,
      color: 'primary' as const,
    },
    {
      icon: Users,
      label: 'Convocatorias',
      value: invitations,
      color: 'warning' as const,
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