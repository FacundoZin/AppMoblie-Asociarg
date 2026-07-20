import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SectionTitle } from '@/components';
import { ProfileHero, ProfileInfoCard, ProfileStatsCard, ProfileActions } from '../components';
import { mockProfile, mockStats } from '../hooks';
import { lightColors, spacing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Mi Perfil" />

      <ProfileHero profile={mockProfile} />

      <ProfileStatsCard
        paymentsCompleted={mockStats.paymentsCompleted}
        eventsAttended={mockStats.eventsAttended}
        yearsAsMember={mockStats.yearsAsMember}
        invitations={mockStats.invitations}
      />

      <ProfileInfoCard profile={mockProfile} />

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
