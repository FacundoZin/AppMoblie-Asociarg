import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Badge, Icon } from '@/components';
import { PatternCard } from '@/components/common';
import { Calendar, MapPin, Users } from 'lucide-react-native';
import { lightColors, spacing } from '@/theme';
import { Event } from '../types';

interface FeaturedEventCardProps {
  event: Event;
}

export function FeaturedEventCard({ event }: FeaturedEventCardProps) {
  const date = new Date(event.date);
  const formattedDate = date.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  const dayNumber = date.getDate();
  const monthShort = date.toLocaleDateString('es-AR', { month: 'short' });

  return (
    <View style={styles.container}>
      <PatternCard variant="surface" style={styles.card}>
        <View style={styles.header}>
          <Badge variant="info" label="Destacado" />
        </View>

        <View style={styles.dateContainer}>
          <Text variant="4xl" weight="bold" color={lightColors.primary}>
            {dayNumber}
          </Text>
          <Text variant="lg" color={lightColors.textSecondary}>
            {monthShort.toUpperCase()}
          </Text>
        </View>

        <View style={styles.body}>
          <Text variant="2xl" weight="bold" color={lightColors.textPrimary} style={styles.title}>
            {event.title}
          </Text>

          <View style={styles.info}>
            <View style={styles.infoRow}>
              <Icon name={Calendar} size={18} color={lightColors.primary} />
              <Text variant="sm" color={lightColors.textSecondary}>
                {formattedDate}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name={MapPin} size={18} color={lightColors.primary} />
              <Text variant="sm" color={lightColors.textSecondary}>
                {event.location}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name={Users} size={18} color={lightColors.primary} />
              <Text variant="sm" color={lightColors.textSecondary}>
                {event.attendees} asistentes
              </Text>
            </View>
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
  card: {
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  body: {
    marginBottom: spacing.xl,
  },
  title: {
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
});