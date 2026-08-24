import { View, Image, StyleSheet } from 'react-native';
import { Text, Badge, Icon } from '@/components';
import { PatternCard } from '@/components/common';
import { CreditCard } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
import { images } from '@/constants/assets';

interface HeroCardProps {
  memberNumber: string;
  status: 'active' | 'pending' | 'overdue';
  /** Due date in ISO format (YYYY-MM-DD); formatted for display. */
  dueDate?: string;
}

const statusConfig = {
  active: { variant: 'success' as const, label: 'Al día' },
  pending: { variant: 'warning' as const, label: 'Pendiente' },
  overdue: { variant: 'error' as const, label: 'Vencida' },
};

export function HeroCard({ memberNumber, status, dueDate }: HeroCardProps) {
  const config = statusConfig[status];
  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null;

  return (
    <View style={styles.container}>
      <PatternCard variant="primary">
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.brandRow}>
              <Image source={images.logo} style={styles.brandLogo} resizeMode="contain" />
              <Text variant="xs" color={lightColors.primaryLight} style={styles.brandLabel}>
                ASOCIARG
              </Text>
            </View>
            <Text variant="sm" color={lightColors.primaryLight}>
              Socio #{memberNumber}
            </Text>
          </View>
          <Badge variant={config.variant} label={config.label} />
        </View>

        <View style={styles.body}>
          <View style={styles.amountRow}>
            <Text variant="4xl" weight="bold" color={lightColors.surface}>
              ${dueDate ? '15.000' : '0'}
            </Text>
            <View style={styles.iconContainer}>
              <Icon name={CreditCard} size={28} color={lightColors.surface} />
            </View>
          </View>

          <Text variant="sm" color={lightColors.primaryLight} style={styles.dueText}>
            {formattedDueDate ? `Vence el ${formattedDueDate}` : 'Sin cuotas pendientes'}
          </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  headerLeft: {
    flex: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  brandLogo: {
    width: 20,
    height: 20,
    borderRadius: radii.sm,
  },
  brandLabel: {
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  body: {
    marginBottom: spacing.xl,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dueText: {
    marginTop: spacing.xs,
  },
});