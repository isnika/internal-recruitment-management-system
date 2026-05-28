  
// ENUMS
  

export enum JobStatus {
  DRAFT = "DRAFT",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
  REMOTE = "REMOTE",
}

  
// COMMON TYPES
  

export interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  website: string;
  logoUrl: string;
  status: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ExperienceLevel {
  id: number;
  name: string;
}

export interface Skill {
  id: number;
  name: string;
}

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

// JOB RESPONSE

export interface Job {
  id: number;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  salaryMin: number;
  salaryMax: number;
  location: string;
  type: string;
  status: JobStatus;
  deadline: string;

  company: Company;
  category: Category;
  experienceLevel: ExperienceLevel;
  skills: Skill[];
}


// REQUEST TYPES

export interface CreateJobRequest {
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  salaryMin: number;
  salaryMax: number;
  location: string;
  type: string;
  deadline: string;
  status: JobStatus;

  companyId: number;
  categoryId: number;
  experienceLevelId: number;
  skillIds: number[];
}

export interface UpdateJobRequest
  extends CreateJobRequest {}

export interface JobFilters {
  keywords?: string;
  minSalary?: number;
  maxSalary?: number;

  skillIds: number[];
  location?: string;

  categoryId?: number | null;
  experienceLevelId?: number | null;

  jobType?: string;
  status?: JobStatus | "";
}

export interface HomeMetadata {
  categories: Category[];
  skills: Skill[];
  experienceLevels: ExperienceLevel[];
  companies: Company[];
}