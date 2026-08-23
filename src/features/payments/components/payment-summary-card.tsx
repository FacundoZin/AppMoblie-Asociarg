import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from '@/components';
import { PatternCard } from '@/components/common';
import { CreditCard } from 'lucide-react-native';
import { lightColors, spacing } from '@/theme';

interface PaymentSummaryCardProps {
  totalPending: number;
  pendingCount: number;
  paidCount: number;
  overdueCount: number;
}

export function PaymentSummaryCard({
  totalPending,
  pendingCount,
  paidCount,
  overdueCount,
}: PaymentSummaryCardProps) {
  return (
    <View style={styles.container}>
      <PatternCard variant="primary">
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.brandRow}>
              <View style={styles.brandDot} />
              <Text variant="xs" color={lightColors.primaryLight} style={styles.brandLabel}>
                ASOCIARG
              </Text>
            </View>
            <Text variant="sm" color={lightColors.primaryLight}>
              {pendingCount > 0
                ? `${pendingCount} cuota${pendingCount > 1 ? 's' : ''} pendiente${pendingCount > 1 ? 's' : ''}`
                : 'Todas al día'}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name={CreditCard} size={28} color={lightColors.surface} />
          </View>
        </View>

        <View style={styles.body}>
          <Text variant="xs" color={lightColors.primaryLight} style={styles.amountLabel}>
            TOTAL PENDIENTE
          </Text>
          <Text variant="4xl" weight="bold" color={lightColors.surface}>
            ${totalPending.toLocaleString('es-AR')}
          </Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text variant="2xl" weight="bold" color={lightColors.surface}>
              {paidCount}
            </Text>
            <Text variant="xs" color={lightColors.primaryLight}>
              Pagadas
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text variant="2xl" weight="bold" color={lightColors.surface}>
              {pendingCount}
            </Text>
            <Text variant="xs" color={lightColors.primaryLight}>
              Pendientes
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text variant="2xl" weight="bold" color={lightColors.surface}>
              {overdueCount}
            </Text>
            <Text variant="xs" color={lightColors.primaryLight}>
              Vencidas
            </Text>
          </View>
        </View>
      </PatternCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  headerLeft: {
    flex: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: lightColors.success,
  },
  brandLabel: {
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    marginBottom: spacing.xl,
  },
  amountLabel: {
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});