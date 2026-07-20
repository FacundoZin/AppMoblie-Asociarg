import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Icon } from '@/components';
import { Calendar, MapPin, Users, Clock } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'info' | 'default'; label: string; color: string }> = {
  upcoming: { variant: 'info', label: 'Próxima', color: lightColors.info },
  active: { variant: 'success', label: 'Activa', color: lightColors.success },
  completed: { variant: 'default', label: 'Finalizada', color: lightColors.neutral },
};

export function EventCard({ event, onPress }: EventCardProps) {
  const config = statusConfig[event.status] || statusConfig.upcoming;
  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
  });

  const dayNumber = date.getDate();
  const monthShort = date.toLocaleDateString('es-AR', { month: 'short' });

  return (
    <Card padding="lg" style={styles.card}>
      <View style={styles.header}>
        {/* Fecha compacta */}
        <View style={styles.dateContainer}>
          <Text variant="2xl" weight="bold" color={lightColors.primary}>
            {dayNumber}
          </Text>
          <Text variant="xs" color={lightColors.textSecondary}>
            {monthShort.toUpperCase()}
          </Text>
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          <Text variant="base" weight="bold" color={lightColors.textPrimary} style={styles.title}>
            {event.title}
          </Text>
          
          <View style={styles.infoRow}>
            <Icon name={MapPin} size={14} color={lightColors.textSecondary} />
            <Text variant="xs" color={lightColors.textSecondary}>
              {event.location}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name={Users} size={14} color={lightColors.textSecondary} />
            <Text variant="xs" color={lightColors.textSecondary}>
              {event.attendees} asistentes
            </Text>
          </View>
        </View>

        {/* Badge */}
        <Badge variant={config.variant} label={config.label} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  dateContainer: {
    alignItems: 'center',
    minWidth: 50,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
});
