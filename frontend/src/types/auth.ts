export interface AuthResponse {
  status: number;
  message: string;
  token: string;
  type: string;
  userId: number;
  email: string;
  role: string;
}