export interface User {
  id: number;
  userId: number;

  email: string;
  firstName: string;
  lastName: string;

  avatarUrl?: string;

  gender?: string;
  dateOfBirth?: string;
  phone?: string;
  address?: string;

  taxCode?: string;
  citizenId?: string;
  releaseDate?: string;
  socialLink?: string;
  bankAccountName?: string;
}