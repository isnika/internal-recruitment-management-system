package backend.service;

import backend.DTO.application.ApplicationResponse;
import backend.DTO.application.CreateApplicationRequest;

public interface ApplicationService {
  ApplicationResponse applyJob(CreateApplicationRequest request);
}
