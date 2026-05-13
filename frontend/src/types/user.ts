export interface Recruitment {
  taxId?: string;
  citizenId?: string;
  bank?: string;
  social?: string;
  releaseDate?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  phone: string;
  fullName: string;
  role: string;
  address: string;
  dob: string;
  gender: string;
  status: string;

  recruitment?: Recruitment;
}