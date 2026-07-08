import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon } from '@/components';
import { CreditCard, Calendar, CreditCard as CredentialIcon, User, DollarSign } from 'lucide-react-native';
import { lightColors, spacing, radii, shadows } from '@/theme';

interface QuickAction {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  onPress?: () => void;
}

interface QuickActionsProps {
  onPaymentPress?: () => void;
  onEventsPress?: () => void;
  onCredentialPress?: () => void;
  onProfilePress?: () => void;
  onMorePress?: () => void;
}

export function QuickActions({
  onPaymentPress,
  onEventsPress,
  onCredentialPress,
  onProfilePress,
  onMorePress,
}: QuickActionsProps) {
  const actions: QuickAction[] = [
    { icon: CreditCard, label: 'Cuotas', onPress: onPaymentPress },
    { icon: Calendar, label: 'Convocatorias', onPress: onEventsPress },
    { icon: CredentialIcon, label: 'Credencial', onPress: onCredentialPress },
    { icon: User, label: 'Perfil', onPress: onProfilePress },
    { icon: DollarSign, label: 'Pagos', onPress: onMorePress },
  ];

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.action}
          onPress={action.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Icon name={action.icon} size={24} color={lightColors.primary} />
          </View>
          <Text variant="xs" weight="medium" color={lightColors.textPrimary} style={styles.label}>
            {action.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.lg,
  },
  action: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: radii.lg,
    backgroundColor: lightColors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    textAlign: 'center',
  },
});
