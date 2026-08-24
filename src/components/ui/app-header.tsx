import { View, StyleSheet } from 'react-native';
import { Text } from './text';
import { Avatar } from './avatar';
import { spacing } from '@/theme';
import { useTheme } from '@/theme';

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
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.accentBar, { backgroundColor: colors.primary }]} />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="bodyMedium" color={colors.onSurfaceVariant}>
            {greeting}
          </Text>
          <Text variant="titleLarge" color={colors.textPrimary}>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  accentBar: {
    height: 3,
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
