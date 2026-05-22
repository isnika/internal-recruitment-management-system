import type { Job } from "../types/job";
import type { JobApiResponse } from "../types/jobApi";

export const mapJobFromApi = (
  job: JobApiResponse
): Job => ({
  id: String(job.id),

  title: job.title,

  description: job.description,

  requirements: job.requirements,

  benefits: job.benefits,

  category: job.category.name,

  experienceLevel:
    job.experienceLevel.name,

  skills: job.skills.map(s => s.name),

  salary: {
    min: job.salaryMin,
    max: job.salaryMax,
    currency: "VND",
  },

  location: job.location,

  jobType: job.type,

  status: job.status,

  deadline: job.deadline,

  company: {
    id: String(job.company.id),
    name: job.company.name,
    logo: job.company.logoUrl,
    website: job.company.website,
    address: job.company.address,
  },

  isBookmarked: false,
});