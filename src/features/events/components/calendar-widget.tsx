import { View, StyleSheet } from 'react-native';
import { Card, Text } from '@/components';
import { spacing, radii, useTheme } from '@/theme';
import { Event } from '../types';

interface CalendarWidgetProps {
  /** Events to highlight; only events in the current month render dots. */
  events: Event[];
}

export function CalendarWidget({ events }: CalendarWidgetProps) {
  const { colors } = useTheme();
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });

  // Real month length (no hardcoded 30-day month).
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Event days derived from the events data, scoped to the current month.
  const eventDays = Array.from(
    new Set(
      events
        .filter((event) => {
          const date = new Date(event.date);
          return (
            date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
          );
        })
        .map((event) => new Date(event.date).getDate()),
    ),
  );

  return (
    <View style={styles.container}>
      <Card padding="lg" style={{ backgroundColor: colors.surface }}>
        <View style={styles.header}>
          <Text variant="base" weight="bold" color={colors.textPrimary}>
            {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}
          </Text>
          <Text variant="xs" color={colors.primary} weight="medium">
            {eventDays.length} eventos
          </Text>
        </View>

        <View style={styles.weekDays}>
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
            <Text key={index} variant="xs" color={colors.textSecondary} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {days.map((day) => {
            const isToday = day === currentDay;
            const hasEvent = eventDays.includes(day);

            return (
              <View
                key={day}
                style={[
                  styles.day,
                  isToday && { backgroundColor: colors.primary },
                  hasEvent && !isToday && { backgroundColor: colors.primaryLight },
                ]}
              >
                <Text
                  variant="xs"
                  weight={isToday ? 'bold' : 'regular'}
                  color={isToday ? colors.surface : colors.textPrimary}
                >
                  {day}
                </Text>
                {hasEvent && !isToday && (
                  <View style={[styles.eventDot, { backgroundColor: colors.primary }]} />
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
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});