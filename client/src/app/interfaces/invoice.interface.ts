import { Client } from './client.interface';
export interface Invoice {
  id: number;
  client_id: number;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  due_date: string;
  created_at: string;
  updated_at: string;
  client?: Client;
}
