import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge, Icon, FadeInUp } from '@/components';
import { CreditCard, Calendar, Bell, Users, Star, Settings } from 'lucide-react-native';
import { lightColors, spacing, radii } from '@/theme';
import { Notification } from '../types';

interface NotificationItemProps {
  notification: Notification;
  onPress?: () => void;
}

const categoryConfig: Record<string, { icon: any; color: string; bgColor: string }> = {
  payment: {
    icon: CreditCard,
    color: lightColors.success,
    bgColor: '#E8F8E7',
  },
  event: {
    icon: Calendar,
    color: lightColors.info,
    bgColor: '#E8F4FD',
  },
  club: {
    icon: Users,
    color: lightColors.primary,
    bgColor: lightColors.primaryLight,
  },
  system: {
    icon: Settings,
    color: lightColors.neutral,
    bgColor: '#F3F4F6',
  },
  important: {
    icon: Star,
    color: lightColors.warning,
    bgColor: '#FFF8E7',
  },
  default: {
    icon: Bell,
    color: lightColors.textSecondary,
    bgColor: lightColors.background,
  },
};

const badgeLabel: Record<string, string> = {
  payment: 'Pago',
  event: 'Evento',
  club: 'Club',
  system: 'Sistema',
  important: 'Importante',
  default: 'Info',
};

const badgeVariant: Record<string, 'success' | 'info' | 'warning' | 'default'> = {
  payment: 'success',
  event: 'info',
  club: 'info',
  system: 'default',
  important: 'warning',
  default: 'default',
};

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const category = notification.type || 'default';
  const config = categoryConfig[category] || categoryConfig.default;
  const IconComponent = config.icon;

  return (
    <FadeInUp>
      <View style={[styles.card, !notification.read && styles.unread]}>
        <Card padding="xl">
          <View style={styles.header}>
            {/* Icono de categoría */}
            <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
              <Icon name={IconComponent} size={20} color={config.color} />
            </View>

            {/* Contenido */}
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
                  variant={badgeVariant[category] || 'default'}
                  label={badgeLabel[category] || 'Info'}
                />
                <Text variant="xs" color={lightColors.textSecondary}>
                  {notification.time}
                </Text>
              </View>
            </View>
          </View>
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
