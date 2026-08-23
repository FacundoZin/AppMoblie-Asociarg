import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Icon } from '@/components';
import { Bell, Calendar, CheckCircle, type LucideIcon } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
import { Notification, NotificationType } from '../types';

interface NotificationItemProps {
  notification: Notification;
}

const categoryConfig: Record<NotificationType, { icon: LucideIcon; color: string; bgColor: string }> = {
  info: {
    icon: Bell,
    color: lightColors.primary,
    bgColor: lightColors.primaryLight,
  },
  event: {
    icon: Calendar,
    color: lightColors.info,
    bgColor: lightColors.infoLight,
  },
  success: {
    icon: CheckCircle,
    color: lightColors.success,
    bgColor: lightColors.successLight,
  },
};

const badgeLabel: Record<NotificationType, string> = {
  info: 'Info',
  event: 'Evento',
  success: 'Pago',
};

const badgeVariant: Record<NotificationType, 'success' | 'info' | 'warning' | 'default'> = {
  info: 'info',
  event: 'info',
  success: 'success',
};

export function NotificationItem({ notification }: NotificationItemProps) {
  const config = categoryConfig[notification.type];

  return (
    <View style={[styles.card, !notification.read && styles.unread]}>
      <Card padding="xl">
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
            <Icon name={config.icon} size={20} color={config.color} />
          </View>

          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text variant="base" weight="semibold" color={lightColors.textPrimary} style={styles.title}>
                {notification.from}
              </Text>
              {!notification.read && <View style={styles.dot} />}
            </View>

            <Text variant="sm" color={lightColors.textPrimary} style={styles.text} numberOfLines={2}>
              {notification.text}
            </Text>

            <View style={styles.footer}>
              <Badge
                variant={badgeVariant[notification.type]}
                label={badgeLabel[notification.type]}
              />
              <Text variant="xs" color={lightColors.textSecondary}>
                {notification.time}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
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
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  title: {
    flex: 1,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});