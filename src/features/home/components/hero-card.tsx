import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Button, Icon, FadeInUp } from '@/components';
import { CreditCard } from 'lucide-react-native';
import { lightColors, spacing, radii, shadows } from '@/theme';

interface HeroCardProps {
  memberNumber: string;
  status: 'active' | 'pending' | 'overdue';
  dueDate?: string;
  onPrimaryAction?: () => void;
}

const statusConfig = {
  active: { variant: 'success' as const, label: 'Al día', icon: '✓' },
  pending: { variant: 'warning' as const, label: 'Pendiente', icon: '!' },
  overdue: { variant: 'error' as const, label: 'Vencida', icon: '⚠' },
};

export function HeroCard({ memberNumber, status, dueDate, onPrimaryAction }: HeroCardProps) {
  const config = statusConfig[status];

  return (
    <FadeInUp delay={100}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Patrón decorativo de fondo */}
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
                Socio #{memberNumber}
              </Text>
            </View>
            <Badge variant={config.variant} label={config.label} />
          </View>

          {/* Body */}
          <View style={styles.body}>
            <View style={styles.amountRow}>
              <Text variant="4xl" weight="bold" color={lightColors.surface}>
                ${dueDate ? '15.000' : '0'}
              </Text>
              <View style={styles.iconContainer}>
                <Icon name={CreditCard} size={28} color={lightColors.surface} />
              </View>
            </View>
            
            <Text variant="sm" color={lightColors.primaryLight} style={styles.dueText}>
              {dueDate ? `Vence el ${dueDate}` : 'Sin cuotas pendientes'}
            </Text>
          </View>

          {/* Action */}
          {onPrimaryAction && (
            <Button
              variant="secondary"
              size="lg"
              label="Pagar cuota"
              onPress={onPrimaryAction}
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
  body: {
    marginBottom: spacing.xl,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dueText: {
    marginTop: spacing.xs,
  },
  button: {
    width: '100%',
    backgroundColor: lightColors.surface,
  },
});
