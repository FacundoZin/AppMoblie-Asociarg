import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { Avatar } from './avatar';
import { lightColors, spacing } from '@/theme';
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
      <View style={styles.textContainer}>
        <Text variant="sm" color={lightColors.textSecondary}>
          {greeting}
        </Text>
        <Text variant="xl" weight="bold">
          {userName}
        </Text>
      </View>

      <View style={styles.actions}>
        <Avatar uri={avatarUri} initials={avatarInitials} size="md" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  actions: {
    marginLeft: spacing.md,
  },
});
