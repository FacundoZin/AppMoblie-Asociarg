import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Badge, Text, Button } from '@/components';
import { Card } from '@/components';
import { lightColors, spacing } from '@/theme';
import type { User } from '../types';

interface UserCardProps {
  user: User;
  isDebt: boolean;
}

export function UserCard({ user, isDebt }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <View style={styles.container}>
      <Avatar initials={initials} size="lg" />

      <Text variant="lg" weight="semibold" color={lightColors.primary} style={styles.name}>
        {user.name}
      </Text>

      <Badge
        variant={isDebt ? 'error' : 'success'}
        label={isDebt ? 'Cuota vencida' : 'Al día'}
      />

      <Card padding="base" style={styles.card}>
        <InfoRow label="DNI" value={user.dni} />
        <InfoRow label="Plan" value={user.plan} />
        <InfoRow label="Disciplina" value={user.discipline} />
        <InfoRow label="Edad" value={String(user.age)} />
        <InfoRow label="Socio desde" value={user.memberSince} />
      </Card>

      <Button variant="primary" size="md" label="Cambiar foto" />
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text variant="xs" color={lightColors.textSecondary}>
        {label}
      </Text>
      <Text variant="sm" weight="medium">
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.surface,
    padding: spacing.lg,
    alignItems: 'center',
  },
  name: {
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  card: {
    width: '100%',
    marginTop: spacing.lg,
  },
  row: {
    marginBottom: spacing.sm,
  },
});
