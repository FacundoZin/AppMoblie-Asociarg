import type { ChatMessage, ClubContact } from '../types';

export const MOCK_CLUB_CONTACT: ClubContact = {
  name: 'Administración Asociarg',
  role: 'Soporte del club',
};

// Seed conversation: the club greets the member first so the sheet opens
// with believable context instead of an empty thread.
export const MOCK_SEED_MESSAGES: ChatMessage[] = [
  {
    id: 'seed-1',
    text: '¡Hola! Gracias por comunicarte con Asociarg. ¿En qué podemos ayudarte hoy?',
    sentAt: '2026-08-21T10:02:00.000Z',
    author: 'club',
  },
  {
    id: 'seed-2',
    text: 'Hola, quería consultar si ya está acreditado el pago de la cuota de agosto.',
    sentAt: '2026-08-21T10:05:00.000Z',
    author: 'user',
  },
  {
    id: 'seed-3',
    text: 'Gracias por esperar. Estamos verificando el pago y te confirmamos en breve.',
    sentAt: '2026-08-21T10:07:00.000Z',
    author: 'club',
  },
];
