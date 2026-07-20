import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Icon, FadeInUp } from '@/components';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
import { ScheduleItem } from '../types';

interface ScheduleCardProps {
  schedule: ScheduleItem[];
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const today = new Date();
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const currentDayName = dayNames[today.getDay()];
  const todaySchedule = schedule.find((s) => s.day === currentDayName);

  return (
    <FadeInUp delay={400}>
      <Card padding="lg" style={styles.card}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <Icon name={Clock} size={18} color={lightColors.primary} />
            </View>
            <View style={styles.headerText}>
              <Text variant="sm" weight="semibold" color={lightColors.textPrimary}>
                Horarios de atención
              </Text>
              {todaySchedule && (
                <Text variant="xs" color={lightColors.textSecondary}>
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
            color={lightColors.textSecondary}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.scheduleList}>
            {schedule.map((item) => (
              <View
                key={item.day}
                style={[
                  styles.scheduleRow,
                  item.day === currentDayName && styles.todayRow,
                ]}
              >
                <Text
                  variant="xs"
                  weight={item.day === currentDayName ? 'semibold' : 'regular'}
                  color={lightColors.textPrimary}
                >
                  {item.day}
                </Text>
                <Text
                  variant="xs"
                  weight={item.day === currentDayName ? 'semibold' : 'regular'}
                  color={item.isOpen ? lightColors.textPrimary : lightColors.textSecondary}
                >
                  {item.isOpen ? `${item.open} - ${item.close}` : 'Cerrado'}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Card>
    </FadeInUp>
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
    backgroundColor: lightColors.primaryLight,
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
    borderTopColor: lightColors.border,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  todayRow: {
    backgroundColor: lightColors.primaryLight,
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
  },
});
