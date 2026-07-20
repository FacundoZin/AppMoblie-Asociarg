import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Icon, FadeInUp } from '@/components';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
import { Profile } from '../types';

interface ProfileInfoCardProps {
  profile: Profile;
}

export function ProfileInfoCard({ profile }: ProfileInfoCardProps) {
  const birthDate = new Date(profile.birthDate);
  const formattedBirthDate = birthDate.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const memberSince = new Date(profile.memberSince);
  const formattedMemberSince = memberSince.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <FadeInUp delay={200}>
      <Card padding="xl" style={styles.card}>
        <Text variant="lg" weight="bold" color={lightColors.textPrimary} style={styles.title}>
          Información Personal
        </Text>

        <View style={styles.divider} />

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={User} size={18} color={lightColors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={lightColors.textSecondary}>
                NOMBRE COMPLETO
              </Text>
              <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
                {profile.name}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={Mail} size={18} color={lightColors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={lightColors.textSecondary}>
                EMAIL
              </Text>
              <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
                {profile.email}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={Phone} size={18} color={lightColors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={lightColors.textSecondary}>
                TELÉFONO
              </Text>
              <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
                {profile.phone}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={Calendar} size={18} color={lightColors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={lightColors.textSecondary}>
                FECHA DE NACIMIENTO
              </Text>
              <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
                {formattedBirthDate}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={Calendar} size={18} color={lightColors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={lightColors.textSecondary}>
                MIEMBRO DESDE
              </Text>
              <Text variant="sm" weight="medium" color={lightColors.textPrimary}>
                {formattedMemberSince}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </FadeInUp>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: lightColors.border,
    marginBottom: spacing.lg,
  },
  infoList: {
    gap: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: lightColors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
  },
});
