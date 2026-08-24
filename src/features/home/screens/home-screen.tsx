import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen, AppHeader, SectionTitle, FadeInUp, EmptyState, Skeleton } from '@/components';
import { HeroCard, QuickActions, SummaryCard, RecentActivity } from '../components';
import { useUser } from '../hooks';
import { spacing } from '@/theme';

export function HomeScreen() {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.skeletonContainer}>
            <Skeleton height={56} />
            <Skeleton height={180} style={styles.skeletonGap} />
            <Skeleton height={120} style={styles.skeletonGap} />
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

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader greeting={greeting} userName={user.name} avatarInitials={initials} />

        <FadeInUp delay={100}>
          <HeroCard memberNumber={user.dni} status="active" dueDate="2026-07-10" />
        </FadeInUp>

        <FadeInUp delay={200}>
          <QuickActions />
        </FadeInUp>

        <SectionTitle title="Resumen" />
        <FadeInUp delay={300}>
          <SummaryCard pendingPayments={1} activeEvents={2} newNotifications={3} />
        </FadeInUp>

        <SectionTitle title="Actividad reciente" />
        <FadeInUp delay={400}>
          <RecentActivity />
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
    paddingTop: spacing.lg,
  },
  skeletonGap: {
    marginTop: spacing.md,
  },
});