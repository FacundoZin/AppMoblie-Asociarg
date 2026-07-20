import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { SectionTitle, Chip, Text, FadeInUp, EmptyState } from '@/components';
import { NotificationItem, NotificationSkeleton } from '../components';
import { mockNotifications } from '../hooks';
import { lightColors, spacing, radii } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Mail, Star, CreditCard, Calendar, Users, Settings } from 'lucide-react-native';

type FilterType = 'all' | 'unread' | 'important' | 'payment' | 'event' | 'club' | 'system';

export function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Contadores
  const unreadCount = mockNotifications.filter((n) => !n.read).length;
  const importantCount = mockNotifications.filter((n) => n.type === 'success').length;
  const paymentCount = mockNotifications.filter((n) => n.type === 'success').length;
  const eventCount = mockNotifications.filter((n) => n.type === 'event').length;
  const clubCount = mockNotifications.filter((n) => n.type === 'info').length;
  const systemCount = mockNotifications.filter((n) => n.type === 'info').length;

  // Filtrado
  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'unread':
        return mockNotifications.filter((n) => !n.read);
      case 'important':
      case 'payment':
        return mockNotifications.filter((n) => n.type === 'success');
      case 'event':
        return mockNotifications.filter((n) => n.type === 'event');
      case 'club':
      case 'system':
        return mockNotifications.filter((n) => n.type === 'info');
      default:
        return mockNotifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  // Mensaje dinámico
  const getHeaderMessage = () => {
    if (unreadCount === 0) return 'Todo está actualizado';
    if (unreadCount === 1) return 'Tenés 1 novedad importante';
    return `Tenés ${unreadCount} novedades importantes`;
  };

  // Resumen horizontal
  const summaryItems = [
    { icon: Mail, label: 'Sin leer', count: unreadCount, color: lightColors.primary, bgColor: lightColors.primaryLight },
    { icon: Star, label: 'Importantes', count: importantCount, color: lightColors.warning, bgColor: '#FFF8E7' },
    { icon: CreditCard, label: 'Pagos', count: paymentCount, color: lightColors.success, bgColor: '#E8F8E7' },
    { icon: Calendar, label: 'Eventos', count: eventCount, color: lightColors.info, bgColor: '#E8F4FD' },
    { icon: Users, label: 'Club', count: clubCount, color: lightColors.primary, bgColor: lightColors.primaryLight },
    { icon: Settings, label: 'Sistema', count: systemCount, color: lightColors.neutral, bgColor: '#F3F4F6' },
  ];

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="2xl" weight="bold" color={lightColors.textPrimary}>
            Actividad
          </Text>
          <Text variant="sm" color={lightColors.textSecondary} style={styles.subtitle}>
            {getHeaderMessage()}
          </Text>
        </View>

        {isLoading ? (
          <>
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
          </>
        ) : (
          <>
            {/* Resumen horizontal scrollable */}
            <FadeInUp delay={100}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.summaryScroll}
              >
                {summaryItems.map((item, index) => (
                  <View key={item.label} style={styles.summaryCard}>
                    <View style={[styles.summaryIcon, { backgroundColor: item.bgColor }]}>
                      <item.icon size={20} color={item.color} />
                    </View>
                    <Text variant="2xl" weight="bold" color={lightColors.textPrimary}>
                      {item.count}
                    </Text>
                    <Text variant="xs" color={lightColors.textSecondary}>
                      {item.label}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </FadeInUp>

            {/* Filtros horizontal scrollable */}
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
                  count={mockNotifications.length}
                />
                <Chip
                  icon={Mail}
                  label="Sin leer"
                  selected={activeFilter === 'unread'}
                  onPress={() => setActiveFilter('unread')}
                  count={unreadCount}
                />
                <Chip
                  icon={Star}
                  label="Importantes"
                  selected={activeFilter === 'important'}
                  onPress={() => setActiveFilter('important')}
                  count={importantCount}
                />
                <Chip
                  icon={CreditCard}
                  label="Pagos"
                  selected={activeFilter === 'payment'}
                  onPress={() => setActiveFilter('payment')}
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
                  icon={Users}
                  label="Club"
                  selected={activeFilter === 'club'}
                  onPress={() => setActiveFilter('club')}
                  count={clubCount}
                />
                <Chip
                  icon={Settings}
                  label="Sistema"
                  selected={activeFilter === 'system'}
                  onPress={() => setActiveFilter('system')}
                  count={systemCount}
                />
              </ScrollView>
            </FadeInUp>

            {/* Lista de notificaciones */}
            {filteredNotifications.length === 0 ? (
              <EmptyState
                icon={Bell}
                title="Sin notificaciones"
                description="No hay notificaciones en esta categoría"
              />
            ) : (
              <View style={styles.list}>
                {filteredNotifications.map((notification, index) => (
                  <FadeInUp key={notification.id} delay={200 + index * 80}>
                    <NotificationItem notification={notification} />
                  </FadeInUp>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  summaryScroll: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  summaryCard: {
    width: 100,
    padding: spacing.md,
    backgroundColor: lightColors.surface,
    borderRadius: radii.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: lightColors.border,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
