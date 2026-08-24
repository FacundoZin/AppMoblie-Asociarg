import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen, SectionTitle, Chip, Text, FadeInUp, EmptyState, SearchBar } from '@/components';
import { FeaturedEventCard, EventCard, CalendarWidget, EventSkeleton } from '../components';
import { useEvents } from '../hooks';
import { spacing, useTheme } from '@/theme';
import { Calendar, Dumbbell, Trophy, Users, PartyPopper } from 'lucide-react-native';
import { EventCategory } from '../types';

type FilterType = 'all' | EventCategory;

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export function EventsScreen() {
  const { colors } = useTheme();
  const { data: events, isLoading, error } = useEvents();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');

  if (isLoading) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <SectionTitle title="Convocatorias" />
          {[0, 1, 2].map((index) => (
            <EventSkeleton key={index} />
          ))}
        </ScrollView>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <EmptyState
          icon={Calendar}
          title="Sin convocatorias"
          description="No pudimos cargar los eventos"
        />
      </Screen>
    );
  }

  const upcomingEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    const today = new Date();
    return eventDate >= today;
  });

  const normalizedQuery = normalizeText(query.trim());

  const visibleEvents = upcomingEvents.filter((e) => {
    if (activeFilter !== 'all' && e.category !== activeFilter) return false;
    if (!normalizedQuery) return true;
    const searchableText = `${e.title} ${e.location}`;
    return normalizeText(searchableText).includes(normalizedQuery);
  });

  const featuredEvent = visibleEvents[0];
  const otherEvents = visibleEvents.slice(1);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Convocatorias" />

        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar convocatoria"
          style={styles.searchBar}
        />

        {featuredEvent && (
          <FadeInUp delay={100}>
            <FeaturedEventCard event={featuredEvent} />
          </FadeInUp>
        )}

        <FadeInUp delay={200}>
          <CalendarWidget events={upcomingEvents} />
        </FadeInUp>

        <FadeInUp delay={300}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
          >
            <Chip
              icon={Calendar}
              label="Todos"
              selected={activeFilter === 'all'}
              onPress={() => setActiveFilter('all')}
              count={events.length}
            />
            <Chip
              icon={Dumbbell}
              label="Entrenamientos"
              selected={activeFilter === 'training'}
              onPress={() => setActiveFilter('training')}
              count={events.filter((e) => e.category === 'training').length}
            />
            <Chip
              icon={Trophy}
              label="Partidos"
              selected={activeFilter === 'match'}
              onPress={() => setActiveFilter('match')}
              count={events.filter((e) => e.category === 'match').length}
            />
            <Chip
              icon={Users}
              label="Reuniones"
              selected={activeFilter === 'meeting'}
              onPress={() => setActiveFilter('meeting')}
              count={events.filter((e) => e.category === 'meeting').length}
            />
            <Chip
              icon={PartyPopper}
              label="Eventos"
              selected={activeFilter === 'event'}
              onPress={() => setActiveFilter('event')}
              count={events.filter((e) => e.category === 'event').length}
            />
          </ScrollView>
        </FadeInUp>

        {otherEvents.length > 0 ? (
          <View style={styles.list}>
            <FadeInUp delay={400}>
              <Text variant="lg" weight="bold" color={colors.textPrimary} style={styles.sectionHeader}>
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
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
  searchBar: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  chipsContainer: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.base,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
});