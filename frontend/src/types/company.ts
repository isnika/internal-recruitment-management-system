export interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  website: string;
  logoUrl: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "VERIFIED" | "UNVERIFIED" | string;
  verified?: boolean; // Keep for backward compatibility temporarily
}

export interface CreateCompanyRequest {
  name: string;
  description: string;
  address: string;
  website: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "VERIFIED" | "UNVERIFIED" | string;
}

export interface UpdateCompanyRequest {
  name: string;
  description: string;
  address: string;
  website: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED" | "VERIFIED" | "UNVERIFIED" | string;
}