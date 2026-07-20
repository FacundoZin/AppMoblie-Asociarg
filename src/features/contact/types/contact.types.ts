export interface ClubContact {
  id: string;
  name: string;
  logo?: string;
  status: 'online' | 'offline' | 'busy';
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  schedule: ScheduleItem[];
}

export interface ScheduleItem {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface ContactFormData {
  subject: string;
  message: string;
}

export type ContactAction = 'whatsapp' | 'call' | 'email' | 'maps' | 'schedule';
