import { request } from "./axiosClient";

// ======================
// TYPES
// ======================

// ---- Time Series ----
export interface TimeSeriesItem {
  label: string;
  applications: number;
  hires: number;
  interviews: number;
}

export interface TimeSeriesReport {
  period: string;
  data: TimeSeriesItem[];
}

// ---- Recruiter Report ----
export interface RecruiterReport {
  recruiterId: number;
  recruiterName: string;
  totalJobsManaged: number;
  totalCandidatesHandled: number;
  totalHired: number;
  avgTimeToFillDays: number;
  successRate: number;
}

// ---- Pipeline ----
export interface PipelineReport {
  applied: number;
  screening: number;
  interview: number;
  test: number;
  offer: number;
  hired: number;
  rejected: number;
}

// ---- Overview ----
export interface OverviewReport {
  totalOpenJobs: number;
  totalClosedJobs: number;
  totalCandidates: number;
  totalApplications: number;
  conversionApplyToInterview: number;
  conversionInterviewToHired: number;
  totalSuccessfulHires: number;
}

// ---- New Candidates ----
export interface NewCandidatesItem {
  label: string;
  count: number;
}

export interface NewCandidatesReport {
  period: string;
  data: NewCandidatesItem[];
}

// ---- Job Report ----
export interface JobReport {
  jobId: number;
  jobTitle: string;
  totalApplied: number;
  totalCvPassed: number;
  totalInterviewed: number;
  totalOffered: number;
  totalHired: number;
  avgTimeToHireDays: number;
}

// ---- Department Report ----
export interface DepartmentReport {
  departmentName: string;
  totalJobs: number;
  totalCandidates: number;
  totalHired: number;
  avgTimeToHireDays: number;
  openHeadcount: number;
}

// ---- Candidate Report ----
export interface CandidateReport {
  totalCandidates: number;
  bySource: Record<string, number>;
  byStatus: Record<string, number>;
  topSkills: {
    skillName: string;
    count: number;
  }[];
  byLevel: Record<string, number>;
}

// ======================
// API
// ======================

const ENDPOINT = "/api/reports";

export const reportApi = {
  // TIME SERIES
  getTimeSeries: (params?: {
    period?: "day" | "month" | "year";
    from?: string;
    to?: string;
  }): Promise<TimeSeriesReport> => {
    return request.get<TimeSeriesReport>(
      `${ENDPOINT}/time-series`,
      { params }
    );
  },

  // RECRUITERS
  getRecruiters: (): Promise<RecruiterReport[]> => {
    return request.get<RecruiterReport[]>(
      `${ENDPOINT}/recruiters`
    );
  },

  // PIPELINE
  getPipeline: (): Promise<PipelineReport> => {
    return request.get<PipelineReport>(
      `${ENDPOINT}/pipeline`
    );
  },

  // OVERVIEW
  getOverview: (): Promise<OverviewReport> => {
    return request.get<OverviewReport>(
      `${ENDPOINT}/overview`
    );
  },

  // NEW CANDIDATES
  getNewCandidates: (params?: {
    period?: "day" | "month" | "year";
    from?: string;
    to?: string;
  }): Promise<NewCandidatesReport> => {
    return request.get<NewCandidatesReport>(
      `${ENDPOINT}/new-candidates`,
      { params }
    );
  },

  // JOBS REPORT
  getJobs: (): Promise<JobReport[]> => {
    return request.get<JobReport[]>(
      `${ENDPOINT}/jobs`
    );
  },

  // DEPARTMENTS
  getDepartments: (): Promise<DepartmentReport[]> => {
    return request.get<DepartmentReport[]>(
      `${ENDPOINT}/departments`
    );
  },

  // CANDIDATES ANALYTICS
  getCandidates: (): Promise<CandidateReport> => {
    return request.get<CandidateReport>(
      `${ENDPOINT}/candidates`
    );
  },
};

export default reportApi;
