import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, FadeInUp } from '@/components';
import { lightColors, spacing, radii } from '@/theme';
import { Payment } from '../types';

interface PaymentCardProps {
  payment: Payment;
  onPress?: () => void;
}

const statusConfig = {
  paid: { variant: 'success' as const, label: 'Pagada', color: lightColors.success },
  pending: { variant: 'warning' as const, label: 'Pendiente', color: lightColors.warning },
  overdue: { variant: 'error' as const, label: 'Vencida', color: lightColors.error },
};

export function PaymentCard({ payment, onPress }: PaymentCardProps) {
  const config = statusConfig[payment.status];
  const date = new Date(payment.dueDate);
  const formattedDate = date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <FadeInUp>
      <Card padding="xl" style={styles.card}>
        <View style={styles.header}>
          <View style={styles.amountContainer}>
            <Text variant="xs" color={lightColors.primary} style={styles.amountLabel}>
              MONTO
            </Text>
            <Text variant="2xl" weight="bold" color={lightColors.textPrimary}>
              ${payment.amount.toLocaleString('es-AR')}
            </Text>
          </View>
          <Badge variant={config.variant} label={config.label} />
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View>
            <Text variant="xs" color={lightColors.primary}>
              VENCIMIENTO
            </Text>
            <Text variant="base" weight="medium" color={lightColors.textPrimary}>
              {formattedDate}
            </Text>
          </View>
          <View style={[styles.indicator, { backgroundColor: config.color }]} />
        </View>
      </Card>
    </FadeInUp>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  amountContainer: {
    flex: 1,
  },
  amountLabel: {
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: lightColors.border,
    marginBottom: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
