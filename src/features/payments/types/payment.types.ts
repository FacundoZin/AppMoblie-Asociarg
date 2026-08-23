export type PaymentStatus = 'pending' | 'paid' | 'overdue';

export interface Payment {
  id: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}
