import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { Avatar } from './avatar';
import { lightColors, spacing, radii } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
  greeting: string;
  userName: string;
  avatarUri?: string;
  avatarInitials?: string;
  onNotificationPress?: () => void;
}

export function AppHeader({
  greeting,
  userName,
  avatarUri,
  avatarInitials,
  onNotificationPress,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.accentBar} />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="sm" color={lightColors.textSecondary}>
            {greeting}
          </Text>
          <Text variant="xl" weight="bold" color={lightColors.textPrimary}>
            {userName}
          </Text>
        </View>

        <View style={styles.actions}>
          <Avatar uri={avatarUri} initials={avatarInitials} size="md" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.surface,
    paddingBottom: spacing.md,
  },
  accentBar: {
    height: 3,
    backgroundColor: lightColors.primary,
    marginBottom: spacing.md,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
  },
  textContainer: {
    flex: 1,
  },
  actions: {
    marginLeft: spacing.md,
  },
});
