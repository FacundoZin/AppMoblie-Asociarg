import { Event } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Entrenamiento Fútbol',
    date: '2026-07-15',
    location: 'Cancha 1',
    attendees: 18,
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Partido Amistoso',
    date: '2026-07-20',
    location: 'Estadio Municipal',
    attendees: 22,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Torneo Interno',
    date: '2026-07-05',
    location: 'Cancha 2',
    attendees: 16,
    status: 'completed',
  },
  {
    id: '4',
    title: 'Práctica Especial',
    date: '2026-07-12',
    location: 'Cancha 1',
    attendees: 14,
    status: 'active',
  },
];
