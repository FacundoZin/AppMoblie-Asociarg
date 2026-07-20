import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Icon, FadeInUp } from '@/components';
import { Mail, Star, Bell, CreditCard, Calendar, Users } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';

interface NotificationSummaryProps {
  unreadCount: number;
  importantCount: number;
  paymentCount: number;
  eventCount: number;
  clubCount: number;
  systemCount: number;
}

export function NotificationSummary({
  unreadCount,
  importantCount,
  paymentCount,
  eventCount,
  clubCount,
  systemCount,
}: NotificationSummaryProps) {
  const summaries = [
    {
      icon: Mail,
      label: 'Sin leer',
      count: unreadCount,
      color: lightColors.primary,
      bgColor: lightColors.primaryLight,
    },
    {
      icon: Star,
      label: 'Importantes',
      count: importantCount,
      color: lightColors.warning,
      bgColor: '#FFF8E7',
    },
    {
      icon: CreditCard,
      label: 'Pagos',
      count: paymentCount,
      color: lightColors.success,
      bgColor: '#E8F8E7',
    },
    {
      icon: Calendar,
      label: 'Eventos',
      count: eventCount,
      color: lightColors.info,
      bgColor: '#E8F4FD',
    },
    {
      icon: Users,
      label: 'Club',
      count: clubCount,
      color: lightColors.primary,
      bgColor: lightColors.primaryLight,
    },
    {
      icon: Bell,
      label: 'Sistema',
      count: systemCount,
      color: lightColors.neutral,
      bgColor: '#F3F4F6',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {summaries.map((item, index) => (
          <FadeInUp key={item.label} delay={100 + index * 50}>
            <Card padding="md" style={styles.card}>
              <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                <Icon name={item.icon} size={20} color={item.color} />
              </View>
              <Text variant="xl" weight="bold" color={lightColors.textPrimary} style={styles.count}>
                {item.count}
              </Text>
              <Text variant="xs" color={lightColors.textSecondary} style={styles.label}>
                {item.label}
              </Text>
            </Card>
          </FadeInUp>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  count: {
    marginBottom: spacing.xs,
  },
  label: {
    textAlign: 'center',
  },
});
