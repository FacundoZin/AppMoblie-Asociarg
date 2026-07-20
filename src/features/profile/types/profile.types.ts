export interface Profile {
  id: string;
  name: string;
  dni: string;
  email: string;
  phone: string;
  birthDate: string;
  memberSince: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: string;
  discipline: string;
  avatar?: string;
}
