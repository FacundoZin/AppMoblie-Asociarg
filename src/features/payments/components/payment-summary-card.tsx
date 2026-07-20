import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Button, Icon, FadeInUp } from '@/components';
import { CreditCard, Calendar, TrendingUp } from 'lucide-react-native';
import { lightColors, spacing, radii, shadows } from '@/theme';

interface PaymentSummaryCardProps {
  totalPending: number;
  pendingCount: number;
  paidCount: number;
  overdueCount: number;
}

export function PaymentSummaryCard({ totalPending, pendingCount, paidCount, overdueCount }: PaymentSummaryCardProps) {
  return (
    <FadeInUp delay={100}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Patrones decorativos */}
          <View style={styles.pattern} />
          <View style={styles.patternSmall} />
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.brandRow}>
                <View style={styles.brandDot} />
                <Text variant="xs" color={lightColors.primaryLight} style={styles.brandLabel}>
                  ASOCIARG
                </Text>
              </View>
              <Text variant="sm" color={lightColors.primaryLight}>
                {pendingCount > 0 ? `${pendingCount} cuota${pendingCount > 1 ? 's' : ''} pendiente${pendingCount > 1 ? 's' : ''}` : 'Todas al día'}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name={CreditCard} size={28} color={lightColors.surface} />
            </View>
          </View>

          {/* Monto */}
          <View style={styles.body}>
            <Text variant="xs" color={lightColors.primaryLight} style={styles.amountLabel}>
              TOTAL PENDIENTE
            </Text>
            <Text variant="4xl" weight="bold" color={lightColors.surface}>
              ${totalPending.toLocaleString('es-AR')}
            </Text>
          </View>

          {/* Stats */}
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

          {/* Action */}
          {totalPending > 0 && (
            <Button
              variant="secondary"
              size="lg"
              label="Pagar ahora"
              style={styles.button}
            />
          )}
        </View>
      </View>
    </FadeInUp>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: lightColors.primary,
    borderRadius: radii.xl,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  pattern: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    backgroundColor: lightColors.primaryDark,
    borderRadius: 70,
    opacity: 0.3,
  },
  patternSmall: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    backgroundColor: lightColors.primaryDark,
    borderRadius: 50,
    opacity: 0.2,
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
    borderRadius: radii.lg,
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
    marginBottom: spacing.xl,
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
  button: {
    width: '100%',
    backgroundColor: lightColors.surface,
  },
});
