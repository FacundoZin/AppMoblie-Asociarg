import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, StatItem } from '@/components';
import { spacing } from '@/theme';

interface SummaryCardProps {
  pendingPayments: number;
  activeEvents: number;
  newNotifications: number;
}

export function SummaryCard({ pendingPayments, activeEvents, newNotifications }: SummaryCardProps) {
  return (
    <Card padding="lg" style={styles.card}>
      <View style={styles.row}>
        <StatItem label="Cuotas pendientes" value={pendingPayments} />
        <StatItem label="Convocatorias activas" value={activeEvents} />
        <StatItem label="Notificaciones nuevas" value={newNotifications} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
