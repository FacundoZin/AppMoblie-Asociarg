import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Icon, FadeInUp } from '@/components';
import { Building2, Phone, Mail, MapPin, Clock } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
import { ClubContact } from '../types';

interface ClubInfoCardProps {
  club: ClubContact;
}

const statusConfig = {
  online: { label: 'En línea', variant: 'success' as const },
  offline: { label: 'Fuera de línea', variant: 'default' as const },
  busy: { label: 'Ocupado', variant: 'warning' as const },
};

export function ClubInfoCard({ club }: ClubInfoCardProps) {
  const status = statusConfig[club.status];
  const todaySchedule = club.schedule.find((s) => {
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return s.day === dayNames[new Date().getDay()];
  });

  return (
    <FadeInUp delay={100}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.pattern} />

          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Icon name={Building2} size={24} color={lightColors.surface} />
            </View>
            <View style={styles.headerInfo}>
              <Text variant="base" weight="bold" color={lightColors.surface} numberOfLines={1}>
                {club.name}
              </Text>
              <Badge variant={status.variant} label={status.label} />
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name={Phone} size={14} color={lightColors.primaryLight} />
            <Text variant="xs" color={lightColors.primaryLight}>
              {club.phone}
            </Text>
          </View>

          {todaySchedule && (
            <View style={styles.infoRow}>
              <Icon name={Clock} size={14} color={lightColors.primaryLight} />
              <Text variant="xs" color={lightColors.primaryLight}>
                {todaySchedule.isOpen
                  ? `Hoy: ${todaySchedule.open} - ${todaySchedule.close}`
                  : 'Hoy cerrado'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </FadeInUp>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: lightColors.primary,
    borderRadius: radii.xl,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  pattern: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    backgroundColor: lightColors.primaryDark,
    borderRadius: 50,
    opacity: 0.3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  headerInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
