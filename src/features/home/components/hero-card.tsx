import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Badge, Icon } from '@/components';
import { CreditCard } from 'lucide-react-native';
import { spacing, shape, elevation, useTheme } from '@/theme';
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
  const { colors } = useTheme();
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
      <View style={[styles.shadowWrapper, { backgroundColor: colors.primary }]}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.brandRow}>
                <Image source={images.logo} style={styles.brandLogo} resizeMode="contain" />
                <Text variant="xs" color={colors.onPrimary} style={styles.brandLabel}>
                  ASOCIARG
                </Text>
              </View>
              <Text variant="sm" color={colors.primaryLight}>
                Socio #{memberNumber}
              </Text>
            </View>
            <Badge variant={config.variant} label={config.label} />
          </View>

          <View style={styles.body}>
            <View style={styles.amountRow}>
              <Text variant="displaySmall" weight="bold" color={colors.onPrimary}>
                ${dueDate ? '15.000' : '0'}
              </Text>
              <View style={[styles.iconContainer, { backgroundColor: colors.onPrimaryOverlay }]}>
                <Icon name={CreditCard} size={28} color={colors.onPrimary} />
              </View>
            </View>

            <Text variant="sm" color={colors.primaryLight} style={styles.dueText}>
              {formattedDueDate ? `Vence el ${formattedDueDate}` : 'Sin cuotas pendientes'}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  // Elevation needs a solid background on Android to draw the shadow silhouette.
  // The background color comes from the active palette (see inline style).
  shadowWrapper: {
    borderRadius: shape.extraLarge,
    ...elevation.level1,
  },
  card: {
    borderRadius: shape.extraLarge,
    padding: spacing.xl,
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
    borderRadius: shape.small,
  },
  brandLabel: {
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  body: {
    marginBottom: spacing.xs,
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
    borderRadius: shape.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dueText: {
    marginTop: spacing.xs,
  },
});
