import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Icon } from '@/components';
import { lightColors, spacing, radii } from '@/theme';

export function CalendarWidget() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });

  // Días del mes (simplificado para visualización)
  const daysInMonth = 30;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Días con eventos (mock)
  const eventDays = [5, 12, 15, 20, 25];

  return (
    <View style={styles.container}>
      <Card padding="lg" style={styles.card}>
        {/* Header del calendario */}
        <View style={styles.header}>
          <Text variant="base" weight="bold" color={lightColors.textPrimary}>
            {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
          </Text>
          <Text variant="xs" color={lightColors.primary} weight="medium">
            {eventDays.length} eventos
          </Text>
        </View>

        {/* Días de la semana */}
        <View style={styles.weekDays}>
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
            <Text key={index} variant="xs" color={lightColors.textSecondary} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        {/* Grid de días */}
        <View style={styles.daysGrid}>
          {days.map((day) => {
            const isToday = day === currentDay;
            const hasEvent = eventDays.includes(day);

            return (
              <View
                key={day}
                style={[
                  styles.day,
                  isToday && styles.today,
                  hasEvent && styles.eventDay,
                ]}
              >
                <Text
                  variant="xs"
                  weight={isToday ? 'bold' : 'regular'}
                  color={isToday ? lightColors.surface : lightColors.textPrimary}
                >
                  {day}
                </Text>
                {hasEvent && !isToday && (
                  <View style={styles.eventDot} />
                )}
              </View>
            );
          })}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: lightColors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.sm,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  day: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radii.md,
    position: 'relative',
  },
  today: {
    backgroundColor: lightColors.primary,
  },
  eventDay: {
    backgroundColor: lightColors.primaryLight,
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: lightColors.primary,
  },
});
