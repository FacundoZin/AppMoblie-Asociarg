export type NotificationType = 'info' | 'event' | 'success';

export interface Notification {
  id: string;
  from: string;
  text: string;
  time: string;
  type: NotificationType;
  read: boolean;
}
