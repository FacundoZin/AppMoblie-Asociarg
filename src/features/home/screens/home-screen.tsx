import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AppHeader, SectionTitle } from '@/components';
import { HeroCard, QuickActions, SummaryCard, RecentActivity } from '../components';
import { mockUser } from '../hooks';
import { lightColors, spacing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const initials = mockUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
      showsVerticalScrollIndicator={false}
    >
      <AppHeader
        greeting={greeting}
        userName={mockUser.name}
        avatarInitials={initials}
      />

      <HeroCard
        memberNumber={mockUser.dni}
        status="active"
        dueDate="10/07/2026"
      />

      <QuickActions />

      <SectionTitle title="Resumen" />
      <SummaryCard
        pendingPayments={1}
        activeEvents={2}
        newNotifications={3}
      />

      <SectionTitle title="Actividad reciente" />
      <RecentActivity />
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
