import { Profile } from '../types';

export const mockProfile: Profile = {
  id: '1',
  name: 'Nahuel Attar',
  dni: '12345678',
  email: 'nahuel.attar@email.com',
  phone: '+54 9 11 1234-5678',
  birthDate: '1990-05-15',
  memberSince: '2023-03-10',
  status: 'active',
  plan: 'Mensual',
  discipline: 'Fútbol',
};

export const mockStats = {
  paymentsCompleted: 24,
  eventsAttended: 18,
  yearsAsMember: 2,
  invitations: 12,
};
