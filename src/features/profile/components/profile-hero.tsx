import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Badge, Icon } from '@/components';
import { PatternCard } from '@/components/common';
import { CreditCard, Award } from 'lucide-react-native';
import { lightColors, spacing } from '@/theme';
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
    <View style={styles.container}>
      <PatternCard variant="primary" style={styles.card}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text variant="2xl" weight="bold" color={lightColors.surface}>
              {initials}
            </Text>
          </View>
        </View>

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
      </PatternCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  card: {
    alignItems: 'center',
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