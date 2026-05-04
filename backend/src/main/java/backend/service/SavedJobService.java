package backend.service;

import java.util.List;

import backend.DTO.job.JobResponse;
import backend.DTO.savedjob.SavedJobStatusResponse;

public interface SavedJobService {

  SavedJobStatusResponse saveJob(Long jobId);

  SavedJobStatusResponse unsaveJob(Long jobId);

  List<JobResponse> getSavedJobs();

  SavedJobStatusResponse getSavedJobStatus(Long jobId);
}
