import { Event } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Entrenamiento Fútbol',
    date: '2026-08-28',
    location: 'Cancha 1',
    attendees: 18,
    status: 'upcoming',
    category: 'training',
  },
  {
    id: '2',
    title: 'Partido Amistoso',
    date: '2026-09-12',
    location: 'Estadio Municipal',
    attendees: 22,
    status: 'upcoming',
    category: 'match',
  },
  {
    id: '3',
    title: 'Reunión de socios',
    date: '2026-09-20',
    location: 'Salón del club',
    attendees: 30,
    status: 'upcoming',
    category: 'meeting',
  },
  {
    id: '4',
    title: 'Torneo Interno',
    date: '2026-08-05',
    location: 'Cancha 2',
    attendees: 16,
    status: 'completed',
    category: 'event',
  },
  {
    id: '5',
    title: 'Festejo del club',
    date: '2026-10-03',
    location: 'Predio Asociarg',
    attendees: 25,
    status: 'upcoming',
    category: 'event',
  },
];