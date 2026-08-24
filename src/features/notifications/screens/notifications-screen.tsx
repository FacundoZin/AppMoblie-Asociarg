import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen, Chip, FadeInUp, EmptyState, StatCard, ScreenHeader } from '@/components';
import { NotificationItem, NotificationSkeleton } from '../components';
import { useNotifications } from '../hooks';
import { spacing } from '@/theme';
import { Bell, Mail, CreditCard, Calendar } from 'lucide-react-native';
import { NotificationType } from '../types';

type FilterType = 'all' | 'unread' | NotificationType;

export function NotificationsScreen() {
  const { data: notifications, isLoading, error } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  if (isLoading) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ScreenHeader title="Actividad" />
          {[0, 1, 2].map((index) => (
            <NotificationSkeleton key={index} />
          ))}
        </ScrollView>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <EmptyState
          icon={Bell}
          title="Sin notificaciones"
          description="No pudimos cargar tus notificaciones"
        />
      </Screen>
    );
  }

  // Counters
  const unreadCount = notifications.filter((n) => !n.read).length;
  const paymentCount = notifications.filter((n) => n.type === 'success').length;
  const eventCount = notifications.filter((n) => n.type === 'event').length;
  const infoCount = notifications.filter((n) => n.type === 'info').length;

  // Filtering
  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'unread':
        return notifications.filter((n) => !n.read);
      case 'success':
        return notifications.filter((n) => n.type === 'success');
      case 'event':
        return notifications.filter((n) => n.type === 'event');
      case 'info':
        return notifications.filter((n) => n.type === 'info');
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  // Dynamic message
  const getHeaderMessage = () => {
    if (unreadCount === 0) return 'Todo está actualizado';
    if (unreadCount === 1) return 'Tenés 1 novedad importante';
    return `Tenés ${unreadCount} novedades importantes`;
  };

  // Summary cards (single category system, driven by NotificationType)
  const summaryItems = [
    { icon: Mail, label: 'Sin leer', count: unreadCount, color: 'primary' as const },
    { icon: CreditCard, label: 'Pagos', count: paymentCount, color: 'success' as const },
    { icon: Calendar, label: 'Eventos', count: eventCount, color: 'info' as const },
    { icon: Bell, label: 'Info', count: infoCount, color: 'neutral' as const },
  ];

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Actividad" subtitle={getHeaderMessage()} />

        <FadeInUp delay={100}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.summaryScroll}
          >
            {summaryItems.map((item) => (
              <StatCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.count}
                color={item.color}
                style={styles.summaryCard}
              />
            ))}
          </ScrollView>
        </FadeInUp>

        <FadeInUp delay={150}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            <Chip
              icon={Bell}
              label="Todos"
              selected={activeFilter === 'all'}
              onPress={() => setActiveFilter('all')}
              count={notifications.length}
            />
            <Chip
              icon={Mail}
              label="Sin leer"
              selected={activeFilter === 'unread'}
              onPress={() => setActiveFilter('unread')}
              count={unreadCount}
            />
            <Chip
              icon={CreditCard}
              label="Pagos"
              selected={activeFilter === 'success'}
              onPress={() => setActiveFilter('success')}
              count={paymentCount}
            />
            <Chip
              icon={Calendar}
              label="Eventos"
              selected={activeFilter === 'event'}
              onPress={() => setActiveFilter('event')}
              count={eventCount}
            />
            <Chip
              icon={Bell}
              label="Info"
              selected={activeFilter === 'info'}
              onPress={() => setActiveFilter('info')}
              count={infoCount}
            />
          </ScrollView>
        </FadeInUp>

        {filteredNotifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="Sin notificaciones"
            description="No hay notificaciones en esta categoría"
          />
        ) : (
          <View style={styles.list}>
            {filteredNotifications.map((notification) => (
              <FadeInUp key={notification.id} delay={200}>
                <NotificationItem notification={notification} />
              </FadeInUp>
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
  summaryScroll: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  summaryCard: {
    width: 100,
  },
  filtersScroll: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.md,
  },
});