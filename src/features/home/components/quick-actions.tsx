import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from '@/components';
import { CreditCard, Calendar, IdCard, User, DollarSign } from 'lucide-react-native';
import { spacing, radii, useTheme } from '@/theme';

interface QuickAction {
  icon: ComponentType<{ size?: number; color?: string }>;
  label: string;
}

const actions: QuickAction[] = [
  { icon: CreditCard, label: 'Cuotas' },
  { icon: Calendar, label: 'Convocatorias' },
  { icon: IdCard, label: 'Credencial' },
  { icon: User, label: 'Perfil' },
  { icon: DollarSign, label: 'Pagos' },
];

export function QuickActions() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.grid, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {actions.map((action) => (
          <View key={action.label} style={styles.action}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Icon name={action.icon} size={20} color={colors.primary} />
            </View>
            <Text variant="xs" weight="medium" color={colors.textPrimary} style={styles.label}>
              {action.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: radii.xl,
    padding: spacing.base,
    borderWidth: 1,
  },
  action: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    textAlign: 'center',
  },
});