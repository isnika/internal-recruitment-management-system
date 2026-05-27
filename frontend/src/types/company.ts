export interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  website: string;
  logoUrl?: string;
  status: string;
  verified?: boolean;
}
