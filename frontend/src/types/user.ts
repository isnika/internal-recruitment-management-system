export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: string;
  status?: string;
  phone?: string;
}