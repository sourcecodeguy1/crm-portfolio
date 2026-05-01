import { Invoice } from './invoice.interface';

export interface ClientDetail {
  id: number;
  name: string;
  email: string;
  phone_number?: string | null;
  company?: string | null;
  created_at: string;
  updated_at: string;
  invoices: Invoice[];
}
