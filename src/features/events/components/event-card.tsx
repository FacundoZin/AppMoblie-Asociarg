import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, FadeInUp } from '@/components';
import { Calendar, MapPin, Users } from 'lucide-react-native';
import { Icon } from '@/components';
import { lightColors, spacing, radii } from '@/theme';
import { Event, EventStatus } from '../types';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

const statusConfig: Record<EventStatus, { variant: 'success' | 'warning' | 'info'; label: string; color: string }> = {
  upcoming: { variant: 'info', label: 'Próxima', color: lightColors.info },
  active: { variant: 'success', label: 'Activa', color: lightColors.success },
  completed: { variant: 'warning', label: 'Finalizada', color: lightColors.warning },
};

export function EventCard({ event, onPress }: EventCardProps) {
  const config = statusConfig[event.status];
  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <FadeInUp>
      <Card padding="xl" style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text variant="xl" weight="bold" color={lightColors.textPrimary}>
              {event.title}
            </Text>
            <Badge variant={config.variant} label={config.label} />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.info}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={Calendar} size={18} color={lightColors.primary} />
            </View>
            <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
              {formattedDate}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={MapPin} size={18} color={lightColors.primary} />
            </View>
            <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
              {event.location}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={Users} size={18} color={lightColors.primary} />
            </View>
            <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
              {event.attendees} asistentes
            </Text>
          </View>
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
    marginBottom: spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: lightColors.border,
    marginBottom: spacing.lg,
  },
  info: {
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: lightColors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
