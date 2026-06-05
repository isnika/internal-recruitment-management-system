package backend.service.Impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.DTO.application.ApplicationResponse;
import backend.DTO.application.CreateApplicationRequest;
import backend.DTO.application.UpdateApplicationStatusRequest;
import backend.Enum.ApplicationStatus;
import backend.Enum.UserRole;
import backend.entity.Application;
import backend.entity.Cv;
import backend.entity.Job;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.exception.UnauthorizedException;
import backend.mapper.ApplicationMapper;
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
                        .intro(request.getIntro())
                        .expectedSalary(request.getExpectedSalary())
                        .startDate(request.getStartDate())
                        .build();

                applicationRepository.save(application);

                return ApplicationMapper.toResponse(application);
        }

        @Override
        @Transactional(readOnly = true)
        public List<ApplicationResponse> getMyApplications() {
                User currentUser = getCurrentAuthenticatedUser();

                return applicationRepository.findByUserId(currentUser.getId())
                        .stream()
                        .map(ApplicationMapper::toResponse)
                        .toList();
        }


        @Override
        @Transactional(readOnly = true)
        public List<ApplicationResponse> getAllApplications(Long companyId) {
                User user = getCurrentAuthenticatedUser();

                if (user.getRole() == UserRole.ADMIN) {
                        if (companyId != null) {
                                // Admin lọc theo công ty cụ thể
                                return applicationRepository.findByJobCompanyId(companyId)
                                        .stream()
                                        .map(ApplicationMapper::toResponse)
                                        .toList();
                        }
                        // Admin xem tất cả
                        return applicationRepository.findAll()
                                .stream()
                                .map(ApplicationMapper::toResponse)
                                .toList();
                }

                // RECRUITER: luôn dùng companyId của chính mình, bỏ qua param
                if (user.getCompany() == null) {
                        throw new UnauthorizedException("Recruiter chưa được gán vào công ty nào");
                }

                return applicationRepository.findByJobCompanyId(user.getCompany().getId())
                        .stream()
                        .map(ApplicationMapper::toResponse)
                        .toList();
        }

        @Override
        @Transactional(readOnly = true)
        public List<ApplicationResponse> getAllApplicationsForAdmin() {
                return applicationRepository.findAll()
                        .stream()
                        .map(ApplicationMapper::toResponse)
                        .toList();
        }


        @Override
        @Transactional(readOnly = true)
        public List<ApplicationResponse> getApplicationsByJob(Long jobId) {
                User user = getCurrentAuthenticatedUser();

                Job job = jobRepository.findById(jobId)
                        .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

                if (user.getRole() == UserRole.ADMIN) {
                        return applicationRepository.findByJobId(jobId)
                                .stream()
                                .map(ApplicationMapper::toResponse)
                                .toList();
                }

                // RECRUITER
                if (user.getCompany() == null) {
                        throw new UnauthorizedException("Recruiter chưa được gán vào công ty nào");
                }

                if (!job.getCompany().getId().equals(user.getCompany().getId())) {
                        throw new UnauthorizedException("Bạn không có quyền xem đơn của job này");
                }

                return applicationRepository.findByJobIdAndCompanyId(jobId, user.getCompany().getId())
                        .stream()
                        .map(ApplicationMapper::toResponse)
                        .toList();
        }

        @Override
        @Transactional
        public ApplicationResponse updateStatus(Long applicationId, UpdateApplicationStatusRequest request) {
                if (request == null || request.getStatus() == null || request.getStatus().isBlank()) {
                        throw new BadRequestException("Status is required");
                }

                User user = getCurrentAuthenticatedUser();

                Application application = applicationRepository.findById(applicationId)
                        .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

                if (user.getRole() != UserRole.ADMIN) {
                        if (user.getCompany() == null ||
                                !application.getJob().getCompany().getId().equals(user.getCompany().getId())) {
                                throw new UnauthorizedException("Bạn không có quyền cập nhật đơn này");
                        }
                }

                ApplicationStatus status;
                try {
                        status = ApplicationStatus.fromValue(request.getStatus());
                } catch (IllegalArgumentException ex) {
                        throw new BadRequestException("Invalid application status");
                }

                application.setStatus(status);
                applicationRepository.save(application);

                return ApplicationMapper.toResponse(application);
        }

        private User getCurrentAuthenticatedUser() {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                if (authentication == null || !(authentication.getPrincipal() instanceof AuthUser authUser)) {
                        throw new UnauthorizedException("Bạn chưa đăng nhập");
                }

                return userRepository.findById(authUser.getId())
                        .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user hiện tại"));
        }
}