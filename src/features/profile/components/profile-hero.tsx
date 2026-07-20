import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Icon, FadeInUp } from '@/components';
import { User, CreditCard, Calendar, Award } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
import { Profile } from '../types';

interface ProfileHeroProps {
  profile: Profile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const memberYears = new Date().getFullYear() - new Date(profile.memberSince).getFullYear();

  return (
    <FadeInUp delay={100}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Patrones decorativos */}
          <View style={styles.pattern} />
          <View style={styles.patternSmall} />

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text variant="2xl" weight="bold" color={lightColors.surface}>
                {initials}
              </Text>
            </View>
          </View>

          {/* Info */}
          <View style={styles.info}>
            <Text variant="xl" weight="bold" color={lightColors.surface} style={styles.name}>
              {profile.name}
            </Text>
            <Text variant="sm" color={lightColors.primaryLight}>
              Socio #{profile.dni}
            </Text>
            <View style={styles.badgeContainer}>
              <Badge variant="success" label="Miembro Activo" />
            </View>
            <Text variant="xs" color={lightColors.primaryLight} style={styles.memberSince}>
              Socio desde {memberYears} {memberYears === 1 ? 'año' : 'años'}
            </Text>
          </View>

          {/* Stats rápidas */}
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Icon name={CreditCard} size={20} color={lightColors.primaryLight} />
              <Text variant="xs" color={lightColors.primaryLight} style={styles.statLabel}>
                Plan {profile.plan}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Icon name={Award} size={20} color={lightColors.primaryLight} />
              <Text variant="xs" color={lightColors.primaryLight} style={styles.statLabel}>
                {profile.discipline}
              </Text>
            </View>
          </View>
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
  card: {
    backgroundColor: lightColors.primary,
    borderRadius: radii.xl,
    padding: spacing.xl,
    overflow: 'hidden',
    alignItems: 'center',
  },
  pattern: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    backgroundColor: lightColors.primaryDark,
    borderRadius: 70,
    opacity: 0.3,
  },
  patternSmall: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    backgroundColor: lightColors.primaryDark,
    borderRadius: 50,
    opacity: 0.2,
  },
  avatarContainer: {
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: lightColors.surface,
  },
  info: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  name: {
    marginBottom: spacing.xs,
  },
  badgeContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  memberSince: {
    marginTop: spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statLabel: {
    fontWeight: '600',
  },
});
