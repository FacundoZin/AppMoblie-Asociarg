import { Notification } from '../types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    from: 'Club Asociarg',
    text: 'Recordatorio: la cuota vence el 10 de cada mes.',
    time: '10:30',
    type: 'info',
    read: false,
  },
  {
    id: '2',
    from: 'Club Asociarg',
    text: 'Nueva convocatoria disponible para fútbol.',
    time: '09:15',
    type: 'event',
    read: false,
  },
  {
    id: '3',
    from: 'Administración',
    text: 'Tu pago fue registrado correctamente.',
    time: 'Ayer',
    type: 'success',
    read: true,
  },
  {
    id: '4',
    from: 'Club Asociarg',
    text: 'Resultado del partido: Victoria 3-1',
    time: 'Ayer',
    type: 'event',
    read: true,
  },
  {
    id: '5',
    from: 'Administración',
    text: 'Tu credencial está lista para retirar.',
    time: 'Hace 2 días',
    type: 'info',
    read: true,
  },
];
