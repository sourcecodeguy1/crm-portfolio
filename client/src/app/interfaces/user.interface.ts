export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
}
