import { ScrollView, StyleSheet } from 'react-native';
import { Screen, SectionTitle, FadeInUp } from '@/components';
import { ProfileHero, ProfileInfoCard, ProfileStatsCard, ProfileActions } from '../components';
import { useProfile } from '../hooks';
import { spacing } from '@/theme';

export function ProfileScreen() {
  const { data: profile, stats } = useProfile();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Mi Perfil" />

        <FadeInUp delay={100}>
          <ProfileHero profile={profile} />
        </FadeInUp>

        <FadeInUp delay={200}>
          <ProfileStatsCard
            paymentsCompleted={stats.paymentsCompleted}
            eventsAttended={stats.eventsAttended}
            yearsAsMember={stats.yearsAsMember}
            invitations={stats.invitations}
          />
        </FadeInUp>

        <FadeInUp delay={300}>
          <ProfileInfoCard profile={profile} />
        </FadeInUp>

        <FadeInUp delay={400}>
          <ProfileActions />
        </FadeInUp>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
});