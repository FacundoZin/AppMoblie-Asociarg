import { View, StyleSheet } from 'react-native';
import { Card, Skeleton } from '@/components';
import { spacing, radii, useTheme } from '@/theme';

export function NotificationSkeleton() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Card padding="xl" style={{ backgroundColor: colors.surface }}>
        <View style={styles.header}>
          <Skeleton width={40} height={40} borderRadius={radii.full} />
          <View style={styles.content}>
            <Skeleton width="60%" height={18} />
            <Skeleton width="80%" height={14} style={styles.skeletonMargin} />
            <Skeleton width="40%" height={12} style={styles.skeletonMargin} />
          </View>
          <Skeleton width={50} height={20} borderRadius={radii.full} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  content: {
    flex: 1,
  },
  skeletonMargin: {
    marginTop: spacing.sm,
  },
});
