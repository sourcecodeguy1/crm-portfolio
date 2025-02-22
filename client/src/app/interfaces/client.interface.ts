export interface Client {
  id: number;
  name: string;
  email: string;
  phone_number?: string | null;
  company?: string | null;
  created_at: string;
  updated_at: string;
}
