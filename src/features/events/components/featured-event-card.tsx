import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Button, Icon, FadeInUp } from '@/components';
import { Calendar, MapPin, Users, Clock } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
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
    <FadeInUp delay={100}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Patrones decorativos */}
          <View style={styles.pattern} />
          <View style={styles.patternSmall} />
          
          {/* Header */}
          <View style={styles.header}>
            <Badge variant="info" label="Destacado" />
          </View>

          {/* Fecha grande */}
          <View style={styles.dateContainer}>
            <Text variant="4xl" weight="bold" color={lightColors.surface}>
              {dayNumber}
            </Text>
            <Text variant="lg" color={lightColors.primaryLight}>
              {monthShort.toUpperCase()}
            </Text>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <Text variant="2xl" weight="bold" color={lightColors.surface} style={styles.title}>
              {event.title}
            </Text>

            <View style={styles.info}>
              <View style={styles.infoRow}>
                <Icon name={Calendar} size={18} color={lightColors.primaryLight} />
                <Text variant="sm" color={lightColors.primaryLight}>
                  {formattedDate}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Icon name={MapPin} size={18} color={lightColors.primaryLight} />
                <Text variant="sm" color={lightColors.primaryLight}>
                  {event.location}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Icon name={Users} size={18} color={lightColors.primaryLight} />
                <Text variant="sm" color={lightColors.primaryLight}>
                  {event.attendees} asistentes
                </Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              variant="secondary"
              size="lg"
              label="Confirmar asistencia"
              style={styles.button}
            />
          </View>
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
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    backgroundColor: lightColors.surface,
  },
});
