import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, FadeInUp } from '@/components';
import { lightColors, spacing, radii } from '@/theme';
import { Notification } from '../types';

interface NotificationItemProps {
  notification: Notification;
}

const badgeLabel: Record<string, string> = {
  success: 'Pago',
  event: 'Evento',
  info: 'Info',
};

const badgeVariant: Record<string, 'success' | 'info' | 'default'> = {
  success: 'success',
  event: 'info',
  info: 'default',
};

export function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <FadeInUp>
      <View style={[styles.card, !notification.read && styles.unread]}>
        <Card padding="xl">
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text variant="base" weight="semibold" color={lightColors.textPrimary}>
                {notification.from}
              </Text>
              {!notification.read && <View style={styles.dot} />}
            </View>
            <Badge
              variant={badgeVariant[notification.type] || 'default'}
              label={badgeLabel[notification.type] || 'Info'}
            />
          </View>

          <Text variant="sm" color={lightColors.textPrimary} style={styles.text}>
            {notification.text}
          </Text>

          <Text variant="xs" color={lightColors.textSecondary}>
            {notification.time}
          </Text>
        </Card>
      </View>
    </FadeInUp>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: lightColors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: lightColors.primary,
  },
  text: {
    marginBottom: spacing.md,
  },
});
