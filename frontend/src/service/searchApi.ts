import { request } from "./axiosClient";
import { IS_MOCK } from "../config";
import { jobs } from "../dataMock/Job";
import type { Job } from "../types/job";

export const searchApi = {
  searchJobs: async (keyword: string): Promise<Job[]> => {
    // mock
    if (IS_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const key = keyword.toLowerCase();

          const result = jobs.filter((job) => {
            return (
              job.title.toLowerCase().includes(key) ||
              job.category.toLowerCase().includes(key) ||
              job.skills.some((s) => s.toLowerCase().includes(key)) ||
              job.company.name.toLowerCase().includes(key) ||
              job.location.toLowerCase().includes(key)
            );
          });

          resolve(result);
        }, 400); // fake delay
      });
    }

    // real api
    return request.get<Job[]>("/jobs/search", {
      q: keyword,
    });
  },
};