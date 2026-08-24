import { View, StyleSheet } from 'react-native';
import { Card, Text, Icon } from '@/components';
import { User, Mail, Phone, Calendar } from 'lucide-react-native';
import { spacing, radii, useTheme } from '@/theme';
import { Profile } from '../types';

interface ProfileInfoCardProps {
  profile: Profile;
}

export function ProfileInfoCard({ profile }: ProfileInfoCardProps) {
  const { colors } = useTheme();
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
    <Card padding="xl" style={styles.card}>
        <Text variant="lg" weight="bold" color={colors.textPrimary} style={styles.title}>
          Información Personal
        </Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Icon name={User} size={18} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={colors.textSecondary}>
                NOMBRE COMPLETO
              </Text>
              <Text variant="sm" weight="medium" color={colors.textPrimary}>
                {profile.name}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Icon name={Mail} size={18} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={colors.textSecondary}>
                EMAIL
              </Text>
              <Text variant="sm" weight="medium" color={colors.textPrimary}>
                {profile.email}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Icon name={Phone} size={18} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={colors.textSecondary}>
                TELÉFONO
              </Text>
              <Text variant="sm" weight="medium" color={colors.textPrimary}>
                {profile.phone}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Icon name={Calendar} size={18} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={colors.textSecondary}>
                FECHA DE NACIMIENTO
              </Text>
              <Text variant="sm" weight="medium" color={colors.textPrimary}>
                {formattedBirthDate}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Icon name={Calendar} size={18} color={colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text variant="xs" color={colors.textSecondary}>
                MIEMBRO DESDE
              </Text>
              <Text variant="sm" weight="medium" color={colors.textPrimary}>
                {formattedMemberSince}
              </Text>
            </View>
          </View>
        </View>
      </Card>
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
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
  },
});
