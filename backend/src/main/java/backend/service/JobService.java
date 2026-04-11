package backend.service;

import java.util.List;

import backend.DTO.job.CreateJobRequest;
import backend.DTO.job.JobResponse;

public interface JobService {

  List<JobResponse> getAllJobs();

  JobResponse createJob(CreateJobRequest request);

  JobResponse getJobById(Long jobId);

  JobResponse updateJob(Long jobId, CreateJobRequest request);

  void deleteJob(Long jobId);

  JobResponse softDeleteJob(Long jobId);
}
