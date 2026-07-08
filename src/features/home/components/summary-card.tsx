import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, FadeInUp } from '@/components';
import { CreditCard, Calendar, Bell } from 'lucide-react-native';
import { Icon } from '@/components';
import { lightColors, spacing, radii, shadows } from '@/theme';

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
      color: lightColors.warning,
      bgColor: '#FFF8E7',
      borderColor: lightColors.warning,
    },
    {
      icon: Calendar,
      label: 'Convocatorias activas',
      value: activeEvents,
      color: lightColors.info,
      bgColor: '#E8F4FD',
      borderColor: lightColors.info,
    },
    {
      icon: Bell,
      label: 'Notificaciones nuevas',
      value: newNotifications,
      color: lightColors.primary,
      bgColor: lightColors.primaryLight,
      borderColor: lightColors.primary,
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <FadeInUp key={index} delay={400 + index * 100}>
          <Card padding="lg" style={[styles.statCard, { borderTopWidth: 3, borderTopColor: stat.borderColor }]}>
            <View style={[styles.iconContainer, { backgroundColor: stat.bgColor }]}>
              <Icon name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text variant="2xl" weight="bold" color={lightColors.textPrimary} style={styles.value}>
              {stat.value}
            </Text>
            <Text variant="xs" color={lightColors.textSecondary} style={styles.label}>
              {stat.label}
            </Text>
          </Card>
        </FadeInUp>
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
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    marginBottom: spacing.xs,
  },
  label: {
    textAlign: 'center',
  },
});
