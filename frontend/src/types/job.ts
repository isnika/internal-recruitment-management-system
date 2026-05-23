// =========================
// JOB
// =========================

export interface Job {
  id: string;

  title: string;

  category: string;

  skills: string[];

  salary: {
    min: number;

    max: number;

    currency: string;
  };

  location: string;

  postedAt: string;

  isBookmarked: boolean;

  logo: string;

  jobType: string;

  experienceLevel: string;

  department: string;

  description?: string[];

  requirements?: string[];

  benefits?: string[];

  company?: {
    name: string;

    address: string;

    bio?: string;
  };

  workingHours?: string;

  deadline?: string;

  createdBy?: string;

  status?: string;
}

// =========================
// METADATA
// =========================

export interface HomeMetadata {
  categories: string[];

  jobTypes: string[];

  experienceLevels: string[];

  departments: string[];

  salaryRanges: string[];

  skillTags: string[];
}

// =========================
// FETCH JOB RESPONSE
// =========================

export interface FetchJobsResponse {
  jobs: Job[];

  total: number;

  totalPages: number;

  currentPage: number;
}

// =========================
// UI FILTERS
// =========================

export interface JobFilters {
  jobTypes: string[];

  experienceLevels: string[];

  departments: string[];

  salaryRanges: string[];

  skillTags: string[];

  keyword?: string;

  location?: string;

  status?: string;
}

// =========================
// CREATE JOB DTO
// =========================

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

  companyId: number;

  categoryId: number;

  experienceLevelId: number;

  skillIds: number[];
}

// =========================
// UPDATE JOB DTO
// =========================

export interface UpdateJobRequest
  extends CreateJobRequest {}

// =========================
// FILTER JOB API REQUEST
// =========================

export interface FilterJobsRequest {
  keywords?: string;

  minSalary?: number;

  maxSalary?: number;

  skillIds?: number[];

  location?: string;

  categoryId?: number;

  jobType?: string;

  status?: string;
}