import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Icon, FadeInUp } from '@/components';
import { CreditCard, Award, TrendingUp, Users } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';

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
      color: lightColors.success,
      bgColor: lightColors.successLight,
    },
    {
      icon: Award,
      label: 'Eventos asistidos',
      value: eventsAttended,
      color: lightColors.info,
      bgColor: lightColors.infoLight,
    },
    {
      icon: TrendingUp,
      label: 'Años como socio',
      value: yearsAsMember,
      color: lightColors.primary,
      bgColor: lightColors.primaryLight,
    },
    {
      icon: Users,
      label: 'Convocatorias',
      value: invitations,
      color: lightColors.warning,
      bgColor: lightColors.warningLight,
    },
  ];

  return (
    <FadeInUp delay={300}>
      <View style={styles.container}>
        {stats.map((stat) => (
          <Card key={stat.label} padding="lg" style={styles.statCard}>
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
        ))}
      </View>
    </FadeInUp>
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
