export interface Invoice {
  id: number;
  client_id: number;
  amount: string;
  status: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}
