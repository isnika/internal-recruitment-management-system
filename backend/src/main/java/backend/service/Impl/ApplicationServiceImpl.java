package backend.service.Impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import backend.DTO.Cv.CvResponse;
import backend.DTO.application.ApplicationResponse;
import backend.DTO.application.CreateApplicationRequest;
import backend.DTO.application.UpdateApplicationStatusRequest;
import backend.DTO.job.JobResponse;
import backend.DTO.user.UserResponse;
import backend.Enum.ApplicationStatus;
import backend.entity.Application;
import backend.entity.Cv;
import backend.entity.Job;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.exception.UnauthorizedException;
import backend.repository.ApplicationRepository;
import backend.repository.CvRepository;
import backend.repository.JobRepository;
import backend.repository.UserRepository;
import backend.security.AuthUser;
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
                User user = getCurrentAuthenticatedUser();

                Job job = jobRepository.findById(request.getJobId())
                                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

                Cv cv = cvRepository.findById(request.getCvId())
                                .orElseThrow(() -> new ResourceNotFoundException("CV not found"));

                boolean alreadyApplied = applicationRepository.existsByUserIdAndJobId(
                                user.getId(),
                                job.getId());

                if (alreadyApplied) {
                        throw new BadRequestException("You already applied this job");
                }

                Application application = Application.builder()
                                .status(ApplicationStatus.APPLIED)
                                .appliedAt(LocalDateTime.now())
                                .user(user)
                                .job(job)
                                .cv(cv)
                                .build();

                applicationRepository.save(application);

                return mapToResponse(application);
        }

        @Override
        public List<ApplicationResponse> getMyApplications() {
                User currentUser = getCurrentAuthenticatedUser();
                return applicationRepository.findByUserId(currentUser.getId())
                                .stream()
                                .map(this::mapToResponse)
                                .toList();
        }

        @Override
        public List<ApplicationResponse> getAllApplications() {
                return applicationRepository.findAll()
                                .stream()
                                .map(this::mapToResponse)
                                .toList();
        }

        @Override
        public ApplicationResponse updateStatus(Long applicationId, UpdateApplicationStatusRequest request) {
                if (request == null || request.getStatus() == null || request.getStatus().isBlank()) {
                        throw new BadRequestException("Status is required");
                }

                Application application = applicationRepository.findById(applicationId)
                                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

                ApplicationStatus status;
                try {
                        status = ApplicationStatus.fromValue(request.getStatus());
                } catch (IllegalArgumentException ex) {
                        throw new BadRequestException("Invalid application status");
                }

                application.setStatus(status);
                applicationRepository.save(application);

                return mapToResponse(application);
        }

        @Override
        public List<ApplicationResponse> getApplicationsByJob(Long jobId) {
                jobRepository.findById(jobId)
                                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

                return applicationRepository.findByJobId(jobId)
                                .stream()
                                .map(this::mapToResponse)
                                .toList();
        }

        private User getCurrentAuthenticatedUser() {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                if (authentication == null || !(authentication.getPrincipal() instanceof AuthUser authUser)) {
                        throw new UnauthorizedException("Ban chua dang nhap");
                }

                return userRepository.findById(authUser.getId())
                                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user hien tai"));
        }

        private ApplicationResponse mapToResponse(Application application) {
                User user = application.getUser();
                Job job = application.getJob();
                Cv cv = application.getCv();

                return ApplicationResponse.builder()
                                .id(application.getId())
                                .status(application.getStatus() != null ? application.getStatus().toValue() : null)
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
