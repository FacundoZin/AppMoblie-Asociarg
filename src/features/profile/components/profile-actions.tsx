import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text, Icon, FadeInUp } from '@/components';
import { Edit3, Camera, Download, Share2, History } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';

interface ProfileActionsProps {
  onEditProfile?: () => void;
  onChangePhoto?: () => void;
  onDownloadCredential?: () => void;
  onShareCredential?: () => void;
  onViewHistory?: () => void;
}

export function ProfileActions({
  onEditProfile,
  onChangePhoto,
  onDownloadCredential,
  onShareCredential,
  onViewHistory,
}: ProfileActionsProps) {
  const actions = [
    {
      icon: Edit3,
      label: 'Editar perfil',
      onPress: onEditProfile,
      color: lightColors.primary,
      bgColor: lightColors.primaryLight,
    },
    {
      icon: Camera,
      label: 'Cambiar foto',
      onPress: onChangePhoto,
      color: lightColors.info,
      bgColor: '#E8F4FD',
    },
    {
      icon: Download,
      label: 'Descargar credencial',
      onPress: onDownloadCredential,
      color: lightColors.success,
      bgColor: '#E8F8E7',
    },
    {
      icon: Share2,
      label: 'Compartir credencial',
      onPress: onShareCredential,
      color: lightColors.warning,
      bgColor: '#FFF8E7',
    },
    {
      icon: History,
      label: 'Ver historial',
      onPress: onViewHistory,
      color: lightColors.neutral,
      bgColor: '#F3F4F6',
    },
  ];

  return (
    <FadeInUp delay={400}>
      <View style={styles.container}>
        <Text variant="lg" weight="bold" color={lightColors.textPrimary} style={styles.title}>
          Acciones rápidas
        </Text>

        <View style={styles.grid}>
          {actions.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.action}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <Card padding="lg" style={styles.actionCard}>
                <View style={[styles.iconContainer, { backgroundColor: action.bgColor }]}>
                  <Icon name={action.icon} size={22} color={action.color} />
                </View>
                <Text variant="xs" weight="medium" color={lightColors.textPrimary} style={styles.label}>
                  {action.label}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </FadeInUp>
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
