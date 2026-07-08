export type EventStatus = 'upcoming' | 'active' | 'completed';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: EventStatus;
}
