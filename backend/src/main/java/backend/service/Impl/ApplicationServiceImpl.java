package backend.service.Impl;

import java.time.LocalDateTime;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import backend.DTO.Cv.CvResponse;
import backend.DTO.application.ApplicationResponse;
import backend.DTO.application.CreateApplicationRequest;
import backend.DTO.job.JobResponse;
import backend.DTO.user.UserResponse;
import backend.entity.Application;
import backend.entity.Cv;
import backend.entity.Job;
import backend.entity.User;
import backend.repository.ApplicationRepository;
import backend.repository.CvRepository;
import backend.repository.JobRepository;
import backend.repository.UserRepository;
import backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {
  private final ApplicationRepository applicationRepository;
  private final JobRepository jobRepository;
  private final CvRepository cvRepository;
  private final UserRepository userRepository;

  @Override
  public ApplicationResponse applyJob(CreateApplicationRequest request) {

    String email = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getName();

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    Job job = jobRepository.findById(request.getJobId())
        .orElseThrow(() -> new RuntimeException("Job not found"));

    Cv cv = cvRepository.findById(request.getCvId())
        .orElseThrow(() -> new RuntimeException("CV not found"));

    boolean alreadyApplied = applicationRepository.existsByUserIdAndJobId(
        user.getId(),
        job.getId());

    if (alreadyApplied) {
      throw new RuntimeException(
          "You already applied this job");
    }

    Application application = Application.builder()
        .status("PENDING")
        .appliedAt(LocalDateTime.now())
        .user(user)
        .job(job)
        .cv(cv)
        .build();

    applicationRepository.save(application);

    return mapToResponse(application);
  }

  private ApplicationResponse mapToResponse(
      Application application) {

    User user = application.getUser();
    Job job = application.getJob();
    Cv cv = application.getCv();

    return ApplicationResponse.builder()
        .id(application.getId())
        .status(application.getStatus())
        .appliedAt(application.getAppliedAt())

        .user(
            UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build())

        .job(
            JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .build())

        .cv(
            CvResponse.builder()
                .id(cv.getId())
                .fileUrl(cv.getFileUrl())
                .build())

        .build();
  }

}
