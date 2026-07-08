import { Payment } from '../types';

export const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 15000,
    dueDate: '2026-07-10',
    status: 'pending',
  },
  {
    id: '2',
    amount: 15000,
    dueDate: '2026-06-10',
    status: 'paid',
  },
  {
    id: '3',
    amount: 15000,
    dueDate: '2026-05-10',
    status: 'paid',
  },
  {
    id: '4',
    amount: 15000,
    dueDate: '2026-04-10',
    status: 'paid',
  },
  {
    id: '5',
    amount: 15000,
    dueDate: '2026-03-10',
    status: 'overdue',
  },
];
