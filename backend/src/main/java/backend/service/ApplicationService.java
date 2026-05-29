package backend.service;

import java.util.List;

import backend.DTO.application.ApplicationResponse;
import backend.DTO.application.CreateApplicationRequest;
import backend.DTO.application.UpdateApplicationStatusRequest;

public interface ApplicationService {
  ApplicationResponse applyJob(CreateApplicationRequest request);

  List<ApplicationResponse> getMyApplications();

  ApplicationResponse updateStatus(Long applicationId, UpdateApplicationStatusRequest request);

  List<ApplicationResponse> getApplicationsByJob(Long jobId);
}
