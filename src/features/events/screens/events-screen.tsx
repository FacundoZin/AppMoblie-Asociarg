import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SectionTitle, Chip, Text, FadeInUp, EmptyState } from '@/components';
import { FeaturedEventCard, EventCard, CalendarWidget, EventSkeleton } from '../components';
import { mockEvents } from '../hooks';
import { lightColors, spacing } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Dumbbell, Trophy, Users, PartyPopper } from 'lucide-react-native';

type FilterType = 'all' | 'training' | 'match' | 'meeting' | 'event';

export function EventsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Simular carga para demo de skeleton
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const upcomingEvents = mockEvents.filter((e) => {
    const eventDate = new Date(e.date);
    const today = new Date();
    return eventDate >= today;
  });

  const featuredEvent = upcomingEvents[0];
  const otherEvents = upcomingEvents.slice(1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        // Pull to refresh podría agregarse aquí
        undefined
      }
    >
      <SectionTitle title="Convocatorias" />

      {isLoading ? (
        <>
          <EventSkeleton />
          <EventSkeleton />
          <EventSkeleton />
        </>
      ) : (
        <>
          {/* Hero Card */}
          {featuredEvent && <FeaturedEventCard event={featuredEvent} />}

          {/* Calendario */}
          <FadeInUp delay={200}>
            <CalendarWidget />
          </FadeInUp>

          {/* Filtros */}
          <FadeInUp delay={300}>
            <View style={styles.chipsContainer}>
              <Chip
                icon={Calendar}
                label="Todos"
                selected={activeFilter === 'all'}
                onPress={() => setActiveFilter('all')}
                count={mockEvents.length}
              />
              <Chip
                icon={Dumbbell}
                label="Entrenamientos"
                selected={activeFilter === 'training'}
                onPress={() => setActiveFilter('training')}
              />
              <Chip
                icon={Trophy}
                label="Partidos"
                selected={activeFilter === 'match'}
                onPress={() => setActiveFilter('match')}
              />
              <Chip
                icon={Users}
                label="Reuniones"
                selected={activeFilter === 'meeting'}
                onPress={() => setActiveFilter('meeting')}
              />
              <Chip
                icon={PartyPopper}
                label="Eventos"
                selected={activeFilter === 'event'}
                onPress={() => setActiveFilter('event')}
              />
            </View>
          </FadeInUp>

          {/* Lista de eventos */}
          {otherEvents.length > 0 ? (
            <View style={styles.list}>
              <FadeInUp delay={400}>
                <Text variant="lg" weight="bold" color={lightColors.textPrimary} style={styles.sectionHeader}>
                  Próximos eventos
                </Text>
              </FadeInUp>
              {otherEvents.map((event, index) => (
                <FadeInUp key={event.id} delay={500 + index * 100}>
                  <EventCard event={event} />
                </FadeInUp>
              ))}
            </View>
          ) : (
            <EmptyState
              icon={Calendar}
              title="Sin convocatorias"
              description="No hay eventos programados próximamente"
            />
          )}
        </>
      )}
    </ScrollView>
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
  chipsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  list: {
    paddingHorizontal: spacing.base,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
});
