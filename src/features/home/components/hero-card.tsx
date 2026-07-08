import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Button } from '@/components';
import { lightColors, spacing, radii } from '@/theme';

interface HeroCardProps {
  memberNumber: string;
  status: 'active' | 'pending' | 'overdue';
  dueDate?: string;
  onPrimaryAction?: () => void;
}

const statusConfig = {
  active: { variant: 'success' as const, label: 'Al día' },
  pending: { variant: 'warning' as const, label: 'Pendiente' },
  overdue: { variant: 'error' as const, label: 'Vencida' },
};

export function HeroCard({ memberNumber, status, dueDate, onPrimaryAction }: HeroCardProps) {
  const config = statusConfig[status];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text variant="xs" color={lightColors.primaryLight} style={styles.headerLabel}>
              ASOCIARG
            </Text>
            <Text variant="sm" color={lightColors.primaryLight}>
              Socio #{memberNumber}
            </Text>
          </View>
          <Badge variant={config.variant} label={config.label} />
        </View>

        <View style={styles.body}>
          <Text variant="3xl" weight="bold" color={lightColors.surface}>
            ${dueDate ? '15.000' : '0'}
          </Text>
          <Text variant="sm" color={lightColors.primaryLight}>
            {dueDate ? `Vence el ${dueDate}` : 'Sin cuotas pendientes'}
          </Text>
        </View>

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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  headerLabel: {
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  body: {
    marginBottom: spacing.xl,
  },
  button: {
    width: '100%',
    backgroundColor: lightColors.surface,
  },
});
