import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Skeleton } from '@/components';
import { lightColors, spacing, radii } from '@/theme';

export function NotificationSkeleton() {
  return (
    <View style={styles.container}>
      <Card padding="xl" style={styles.card}>
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
  card: {
    backgroundColor: lightColors.surface,
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
