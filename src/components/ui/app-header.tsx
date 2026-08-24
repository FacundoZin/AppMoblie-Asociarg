import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { Avatar } from './avatar';
import { lightColors, spacing } from '@/theme';

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
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.accentBar} />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="bodyMedium" color={lightColors.onSurfaceVariant}>
            {greeting}
          </Text>
          <Text variant="titleLarge" color={lightColors.textPrimary}>
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
    paddingTop: spacing.md,
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
