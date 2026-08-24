import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen, SectionTitle, FadeInUp, EmptyState, Skeleton } from '@/components';
import { ProfileHero, ProfileInfoCard, ProfileStatsCard, ProfileActions, ProfileContactSection, ThemeToggle } from '../components';
import { useProfile } from '../hooks';
import { spacing, radii } from '@/theme';

export function ProfileScreen() {
  const { data: profile, stats, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <SectionTitle title="Mi Perfil" />
          <View style={styles.skeletonContainer}>
            <Skeleton height={160} borderRadius={radii['2xl']} />
            <Skeleton height={120} style={styles.skeletonGap} />
            <Skeleton height={180} style={styles.skeletonGap} />
          </View>
        </ScrollView>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <EmptyState
          title="Sin información"
          description="No pudimos cargar tu perfil"
        />
      </Screen>
    );
  }

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

        <FadeInUp delay={500}>
          <ProfileContactSection />
        </FadeInUp>

        <FadeInUp delay={600}>
          <SectionTitle title="Apariencia" />
          <ThemeToggle />
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
  skeletonContainer: {
    paddingHorizontal: spacing.base,
  },
  skeletonGap: {
    marginTop: spacing.md,
  },
});