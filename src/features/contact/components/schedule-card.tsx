import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Icon } from '@/components';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react-native';
import { spacing, radii, useTheme } from '@/theme';
import { ScheduleItem } from '../types';

interface ScheduleCardProps {
  schedule: ScheduleItem[];
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const today = new Date();
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const currentDayName = dayNames[today.getDay()];
  const todaySchedule = schedule.find((s) => s.day === currentDayName);

  return (
    <Card padding="lg" style={styles.card}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.headerLeft}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Icon name={Clock} size={18} color={colors.primary} />
            </View>
            <View style={styles.headerText}>
              <Text variant="sm" weight="semibold" color={colors.textPrimary}>
                Horarios de atención
              </Text>
              {todaySchedule && (
                <Text variant="xs" color={colors.textSecondary}>
                  {todaySchedule.isOpen
                    ? `Hoy: ${todaySchedule.open} - ${todaySchedule.close}`
                    : 'Hoy cerrado'}
                </Text>
              )}
            </View>
          </View>
          <Icon
            name={isExpanded ? ChevronUp : ChevronDown}
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View
            style={[styles.scheduleList, { borderTopColor: colors.border }]}
          >
            {schedule.map((item) => (
              <View
                key={item.day}
                style={[
                  styles.scheduleRow,
                  item.day === currentDayName && [
                    styles.todayRow,
                    { backgroundColor: colors.primaryLight },
                  ],
                ]}
              >
                <Text
                  variant="xs"
                  weight={item.day === currentDayName ? 'semibold' : 'regular'}
                  color={colors.textPrimary}
                >
                  {item.day}
                </Text>
                <Text
                  variant="xs"
                  weight={item.day === currentDayName ? 'semibold' : 'regular'}
                  color={item.isOpen ? colors.textPrimary : colors.textSecondary}
                >
                  {item.isOpen ? `${item.open} - ${item.close}` : 'Cerrado'}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  scheduleList: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  todayRow: {
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
  },
});
