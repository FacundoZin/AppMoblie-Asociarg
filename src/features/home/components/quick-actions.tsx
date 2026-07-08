import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon, FadeInUp } from '@/components';
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
      <View style={styles.grid}>
        {actions.map((action, index) => (
          <FadeInUp key={index} delay={200 + index * 100}>
            <TouchableOpacity
              style={styles.action}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Icon name={action.icon} size={22} color={lightColors.primary} />
              </View>
              <Text variant="xs" weight="medium" color={lightColors.textPrimary} style={styles.label}>
                {action.label}
              </Text>
            </TouchableOpacity>
          </FadeInUp>
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
