import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Icon, FadeInUp } from '@/components';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
import { Payment } from '../types';

interface PaymentCardProps {
  payment: Payment;
  onPress?: () => void;
}

const statusConfig = {
  paid: { 
    variant: 'success' as const, 
    label: 'Pagada', 
    color: lightColors.success,
    icon: CheckCircle,
    bgColor: '#E8F8E7',
  },
  pending: { 
    variant: 'warning' as const, 
    label: 'Pendiente', 
    color: lightColors.primary,
    icon: Clock,
    bgColor: lightColors.primaryLight,
  },
  overdue: { 
    variant: 'error' as const, 
    label: 'Vencida', 
    color: lightColors.error,
    icon: AlertCircle,
    bgColor: '#FDE8E8',
  },
};

export function PaymentCard({ payment, onPress }: PaymentCardProps) {
  const config = statusConfig[payment.status];
  const date = new Date(payment.dueDate);
  const formattedDate = date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const month = date.toLocaleDateString('es-AR', { month: 'long' });

  return (
    <FadeInUp>
      <Card padding="xl" style={styles.card}>
        <View style={styles.header}>
          <View style={styles.monthContainer}>
            <Text variant="xs" color={lightColors.textSecondary} style={styles.monthLabel}>
              MES
            </Text>
            <Text variant="lg" weight="bold" color={lightColors.textPrimary}>
              {month.charAt(0).toUpperCase() + month.slice(1)}
            </Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
            <Icon name={config.icon} size={24} color={config.color} />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.body}>
          <View style={styles.amountRow}>
            <Text variant="xs" color={lightColors.textSecondary} style={styles.amountLabel}>
              MONTO
            </Text>
            <Text variant="2xl" weight="bold" color={lightColors.textPrimary}>
              ${payment.amount.toLocaleString('es-AR')}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text variant="xs" color={lightColors.textSecondary}>
              VENCIMIENTO
            </Text>
            <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
              {formattedDate}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Badge variant={config.variant} label={config.label} />
          {payment.status === 'paid' && (
            <Text variant="xs" color={lightColors.success} weight="medium">
              ✓ Pago confirmado
            </Text>
          )}
          {payment.status === 'pending' && (
            <Text variant="xs" color={lightColors.primary} weight="medium">
              ⏰ Próximo vencimiento
            </Text>
          )}
          {payment.status === 'overdue' && (
            <Text variant="xs" color={lightColors.error} weight="medium">
              ⚠ Requiere atención
            </Text>
          )}
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
  monthContainer: {
    flex: 1,
  },
  monthLabel: {
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: lightColors.border,
    marginBottom: spacing.lg,
  },
  body: {
    marginBottom: spacing.lg,
  },
  amountRow: {
    marginBottom: spacing.md,
  },
  amountLabel: {
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
