import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Icon } from '@/components';
import { MapPin, Users } from 'lucide-react-native';
import { spacing, useTheme, type Colors } from '@/theme';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

const getStatusConfig = (colors: Colors): Record<string, { variant: 'success' | 'warning' | 'info' | 'default'; label: string; color: string }> => ({
  upcoming: { variant: 'info', label: 'Próxima', color: colors.info },
  active: { variant: 'success', label: 'Activa', color: colors.success },
  completed: { variant: 'default', label: 'Finalizada', color: colors.neutral },
});

export function EventCard({ event }: EventCardProps) {
  const { colors } = useTheme();
  const statusConfig = getStatusConfig(colors);
  const config = statusConfig[event.status] || statusConfig.upcoming;
  const date = new Date(event.date);

  const dayNumber = date.getDate();
  const monthShort = date.toLocaleDateString('es-AR', { month: 'short' });

  return (
    <Card padding="lg" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text variant="2xl" weight="bold" color={colors.primary}>
            {dayNumber}
          </Text>
          <Text variant="xs" color={colors.textSecondary}>
            {monthShort.toUpperCase()}
          </Text>
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          <Text variant="base" weight="bold" color={colors.textPrimary} style={styles.title}>
            {event.title}
          </Text>

          <View style={styles.infoRow}>
            <Icon name={MapPin} size={14} color={colors.textSecondary} />
            <Text variant="xs" color={colors.textSecondary}>
              {event.location}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name={Users} size={14} color={colors.textSecondary} />
            <Text variant="xs" color={colors.textSecondary}>
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
