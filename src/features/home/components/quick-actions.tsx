import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from '@/components';
import { CreditCard, Calendar, IdCard, User, DollarSign } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';

interface QuickAction {
  icon: React.ComponentType<{ size?: number; color?: string }>;
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
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {actions.map((action) => (
          <View key={action.label} style={styles.action}>
            <View style={styles.iconContainer}>
              <Icon name={action.icon} size={22} color={lightColors.primary} />
            </View>
            <Text variant="xs" weight="medium" color={lightColors.textPrimary} style={styles.label}>
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
    backgroundColor: lightColors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: lightColors.border,
  },
  action: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: lightColors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: lightColors.primary,
  },
  label: {
    textAlign: 'center',
  },
});