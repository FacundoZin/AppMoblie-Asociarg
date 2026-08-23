import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SectionTitle } from '@/components';
import { ProfileHero, ProfileInfoCard, ProfileStatsCard, ProfileActions } from '../components';
import { useProfile } from '../hooks';
import { lightColors, spacing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { data: profile, stats } = useProfile();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Mi Perfil" />

      <ProfileHero profile={profile} />

      <ProfileStatsCard
        paymentsCompleted={stats.paymentsCompleted}
        eventsAttended={stats.eventsAttended}
        yearsAsMember={stats.yearsAsMember}
        invitations={stats.invitations}
      />

      <ProfileInfoCard profile={profile} />

      <ProfileActions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  content: {
    flexGrow: 1,
  },
});
