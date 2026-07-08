import React from 'react';
import { ScrollView, StyleSheet, View, Text as RNText } from 'react-native';
import { SectionTitle, Text } from '@/components';
import { NotificationItem } from '../components';
import { mockNotifications } from '../hooks';
import { lightColors, spacing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const unread = mockNotifications.filter((n) => !n.read);
  const read = mockNotifications.filter((n) => n.read);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Notificaciones" />

      {unread.length > 0 && (
        <View style={styles.section}>
          <RNText style={styles.sectionLabel}>Nuevas ({unread.length})</RNText>
          {unread.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </View>
      )}

      {read.length > 0 && (
        <View style={styles.section}>
          <RNText style={styles.sectionLabel}>Leídas ({read.length})</RNText>
          {read.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  content: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.md,
    flexGrow: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: lightColors.textSecondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
