import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Icon, Card, Text } from '../ui';
import { type LucideIcon } from 'lucide-react-native';
import { spacing, type Colors } from '@/theme';
import { useTheme } from '@/theme';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  /** Theme color token for the icon and the optional accent. */
  color: keyof Colors;
  /** Theme color token for the icon container background. Defaults to the `${color}Light` token. */
  bgColor?: keyof Colors;
  style?: StyleProp<ViewStyle>;
}

/**
 * Unified "icon + value + label" stat card. Replaces the three near-identical
 * variants previously inlined in summary-card, profile-stats-card, and the
 * notifications summary grid.
 */
export function StatCard({ icon, label, value, color, bgColor, style }: StatCardProps) {
  const { colors } = useTheme();
  const containerColor = bgColor ?? (`${color}Light` as keyof Colors);

  return (
    <Card padding="lg" style={[styles.card, style]}>
      <View style={[styles.iconContainer, { backgroundColor: colors[containerColor] }]}>
        <Icon name={icon} size={20} color={colors[color]} />
      </View>
      <Text variant="2xl" weight="bold" color={colors.textPrimary} style={styles.value}>
        {value}
      </Text>
      <Text variant="xs" color={colors.textSecondary} style={styles.label}>
        {label}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    marginBottom: spacing.xs,
  },
  label: {
    textAlign: 'center',
  },
});