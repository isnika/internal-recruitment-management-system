export type ApplicationStatus =
  | "PENDING"
  | "REVIEWING"
  | "PASSED"
  | "FAILED";

export type RecruitmentInfo = {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  citizenId: string;
  releaseDate: string;
  social: string;
  bankAccount: string;
  selfIntro: string;
  jobTitle: string;
  salary: string;
  startDate: string;
};

export type Application = {
  id: number;
  candidateName: string;
  jobTitle: string;
  cvUrl: string;
  status: ApplicationStatus;
  recruitment: RecruitmentInfo;
};