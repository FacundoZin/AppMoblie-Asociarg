import type { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Icon } from '@/components';
import { Edit3, Camera, Download, Share2, History } from 'lucide-react-native';
import { spacing, radii, useTheme, type Colors } from '@/theme';

interface ProfileAction {
  icon: ComponentType<{ size?: number; color?: string }>;
  label: string;
  color: string;
  bgColor: string;
}

const getActions = (colors: Colors): ProfileAction[] => [
  {
    icon: Edit3,
    label: 'Editar perfil',
    color: colors.primary,
    bgColor: colors.primaryLight,
  },
  {
    icon: Camera,
    label: 'Cambiar foto',
    color: colors.info,
    bgColor: colors.infoLight,
  },
  {
    icon: Download,
    label: 'Descargar credencial',
    color: colors.success,
    bgColor: colors.successLight,
  },
  {
    icon: Share2,
    label: 'Compartir credencial',
    color: colors.warning,
    bgColor: colors.warningLight,
  },
  {
    icon: History,
    label: 'Ver historial',
    color: colors.neutral,
    bgColor: colors.neutralLight,
  },
];

export function ProfileActions() {
  const { colors } = useTheme();
  const actions = getActions(colors);

  return (
    <View style={styles.container}>
      <Text variant="lg" weight="bold" color={colors.textPrimary} style={styles.title}>
        Acciones rápidas
      </Text>

      <View style={styles.grid}>
        {actions.map((action) => (
          <View key={action.label} style={styles.action}>
            <Card padding="lg" style={styles.actionCard}>
              <View style={[styles.iconContainer, { backgroundColor: action.bgColor }]}>
                <Icon name={action.icon} size={22} color={action.color} />
              </View>
              <Text variant="xs" weight="medium" color={colors.textPrimary} style={styles.label}>
                {action.label}
              </Text>
            </Card>
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
  title: {
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  action: {
    width: '48%',
  },
  actionCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    textAlign: 'center',
  },
});