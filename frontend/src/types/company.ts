export interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  website: string;
  logoUrl: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface CreateCompanyRequest {
  name: string;
  description: string;
  address: string;
  website: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface UpdateCompanyRequest {
  name: string;
  description: string;
  address: string;
  website: string;
  status: "ACTIVE" | "INACTIVE";
}