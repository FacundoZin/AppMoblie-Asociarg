import { ClubContact, ContactFormData, ScheduleItem } from '../types';

const mockSchedule: ScheduleItem[] = [
  { day: 'Lunes', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Martes', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Miércoles', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Jueves', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Viernes', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Sábado', open: '09:00', close: '13:00', isOpen: true },
  { day: 'Domingo', open: '00:00', close: '00:00', isOpen: false },
];

const mockClub: ClubContact = {
  id: '1',
  name: 'Asociación Deportiva San Francisco',
  status: 'online',
  phone: '3564123456',
  whatsapp: '5493564123456',
  email: 'contacto@asociarg.com',
  address: 'Av. San Martín 1234, San Francisco, Córdoba',
  schedule: mockSchedule,
};

export const contactService = {
  getClubContact: async (): Promise<ClubContact> => {
    // Preparado para conectar con backend
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockClub), 300);
    });
  },

  sendContactForm: async (data: ContactFormData): Promise<{ success: boolean }> => {
    // Preparado para conectar con backend
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 500);
    });
  },

  openWhatsApp: (whatsappNumber: string): void => {
    const url = `https://wa.me/${whatsappNumber}`;
    // Linking.openURL(url) se manejará desde el hook
  },

  openPhone: (phoneNumber: string): void => {
    const url = `tel:${phoneNumber}`;
    // Linking.openURL(url) se manejará desde el hook
  },

  openMaps: (address: string): void => {
    const encoded = encodeURIComponent(address);
    const url = `https://maps.google.com/?q=${encoded}`;
    // Linking.openURL(url) se manejará desde el hook
  },
};
