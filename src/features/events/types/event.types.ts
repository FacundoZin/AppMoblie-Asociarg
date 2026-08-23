export type EventStatus = 'upcoming' | 'active' | 'completed';

export type EventCategory = 'training' | 'match' | 'meeting' | 'event';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: EventStatus;
  category: EventCategory;
}
