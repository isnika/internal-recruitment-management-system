export interface ApplyJobPayload {
  jobId: number;
  cvId: number;
  intro: string;
  salary: string;
  startDate: string;
}

export interface CV {
  id: number;
  fileUrl: string;
  taxId?: string;
  citizenId?: string;
  bank?: string;
}