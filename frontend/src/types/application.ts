export type ApplicationStatus =
  | "applied"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "withdrawn"
  | "hired";

export interface Application {
  id: number;
  status: ApplicationStatus;
  appliedAt: string;

  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };

  job: {
    id: number;
    title: string;
    location: string;
  };

  cv: {
    id: number;
    fileUrl: string;
  };
}