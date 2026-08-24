import { View, StyleSheet } from 'react-native';
import { Card, Skeleton } from '@/components';
import { spacing, radii, useTheme } from '@/theme';

export function EventSkeleton() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Card padding="lg" style={{ backgroundColor: colors.surface }}>
        <View style={styles.header}>
          <Skeleton width={50} height={60} borderRadius={radii.md} />
          <View style={styles.content}>
            <Skeleton width="70%" height={20} />
            <Skeleton width="50%" height={14} style={styles.skeletonMargin} />
            <Skeleton width="40%" height={14} />
          </View>
          <Skeleton width={60} height={24} borderRadius={radii.full} />
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
