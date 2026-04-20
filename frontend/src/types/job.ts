// types
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
}

export interface HomeMetadata {
  categories: string[];
  jobTypes: string[];
  experienceLevels: string[];
  departments: string[];
  salaryRanges: string[];
  skillTags: string[];
}

export interface FetchJobsResponse {
  jobs: Job[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface JobFilters {
  jobTypes: string[];
  experienceLevels: string[];
  departments: string[];
  salaryRanges: string[];
  skillTags: string[];
}