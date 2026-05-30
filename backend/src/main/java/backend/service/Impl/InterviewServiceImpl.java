package backend.service.Impl;

import backend.DTO.interview.CreateInterviewRequest;
import backend.DTO.interview.UpdateInterviewResultRequest;
import backend.DTO.interview.UpdateInterviewStatusRequest;
import backend.Enum.InterviewStatus;
import backend.Enum.NotificationType;
import backend.Enum.UserRole;
import backend.entity.Application;
import backend.entity.Interview;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.repository.ApplicationRepository;
import backend.repository.InterviewRepository;
import backend.repository.UserRepository;
import backend.security.AuthUser;
import backend.service.InterviewService;
import backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {

    private final InterviewRepository interviewRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    // ================= USER =================
    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (!(principal instanceof AuthUser authUser)) {
            throw new BadRequestException("User chưa đăng nhập");
        }

        return userRepository.findById(authUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User không tồn tại"));
    }

    private void checkRole(User user, UserRole... roles) {
        for (UserRole role : roles) {
            if (user.getRole() == role) {
                return;
            }
        }
        throw new BadRequestException("Không có quyền truy cập");
    }

    // ================= CANDIDATE =================

    @Override
    public List<Interview> getMyInterviews() {
        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE);

        return interviewRepository.findByApplication_User_Id(user.getId());
    }

    @Transactional
    @Override
    public Interview acceptInterview(Long id) {

        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE, UserRole.ADMIN);

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch"));

        if (user.getRole() == UserRole.CANDIDATE) {
            validateOwnership(user, interview);
        }

        if (interview.getStatus() != InterviewStatus.PENDING) {
            throw new BadRequestException("Lịch đã được xử lý");
        }

        interview.setStatus(InterviewStatus.ACCEPTED);
        interview.setResult("CANDIDATE_ACCEPTED");

        Interview saved = interviewRepository.save(interview);


        Long companyId = interview.getApplication()
                .getJob()
                .getCompany()
                .getId();

        User recruiter = userRepository.findAll()
                .stream()
                .filter(u -> u.getRole() == UserRole.RECRUITER)
                .filter(u -> u.getCompany() != null)
                .filter(u -> u.getCompany().getId().equals(companyId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user nhận"));

        notificationService.createNotification(
                recruiter.getId(),
                "Ứng viên đã CHẤP NHẬN lịch phỏng vấn",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW,
                true
        );


        notificationService.createNotification(
                interview.getApplication().getUser().getId(),
                "Bạn đã CHẤP NHẬN lịch phỏng vấn thành công",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW,
                false
        );

        return saved;
    }

    @Transactional
    @Override
    public Interview rejectInterview(Long id) {

        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE, UserRole.ADMIN);

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch"));

        if (user.getRole() == UserRole.CANDIDATE) {
            validateOwnership(user, interview);
        }

        if (interview.getStatus() != InterviewStatus.PENDING) {
            throw new BadRequestException("Lịch đã được xử lý");
        }

        interview.setStatus(InterviewStatus.REJECTED);
        interview.setResult("CANDIDATE_REJECTED");

        Interview saved = interviewRepository.save(interview);

        Long companyId = interview.getApplication()
                .getJob()
                .getCompany()
                .getId();

        User recruiter = userRepository.findAll()
                .stream()
                .filter(u -> u.getRole() == UserRole.RECRUITER)
                .filter(u -> u.getCompany() != null)
                .filter(u -> u.getCompany().getId().equals(companyId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user nhận"));


        notificationService.createNotification(
                recruiter.getId(),
                "Ứng viên đã TỪ CHỐI lịch phỏng vấn",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW,
                true
        );


        notificationService.createNotification(
                interview.getApplication().getUser().getId(),
                "Bạn đã TỪ CHỐI lịch phỏng vấn thành công",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW,
                false
        );

        return saved;
    }

    @Override
    public Interview getInterviewById(Long id) {

        User user = getCurrentUser();

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy interview"));

        // ===== CANDIDATE =====
        if (user.getRole() == UserRole.CANDIDATE) {

            if (interview.getApplication() == null ||
                    interview.getApplication().getUser() == null ||
                    !interview.getApplication().getUser().getId().equals(user.getId())) {

                throw new BadRequestException("Không có quyền");
            }
        }

        // ===== RECRUITER =====
        if (user.getRole() == UserRole.RECRUITER) {

            if (!interview.getApplication().getJob().getCompany().getId()
                    .equals(user.getCompany().getId())) {

                throw new BadRequestException("Không có quyền");
            }
        }
        return interview;
    }

    // ================= RECRUITER =================

    @Override
    public Interview createInterview(CreateInterviewRequest request) {

        User user = getCurrentUser();
        checkRole(user, UserRole.RECRUITER);

        Application application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy application"));


        if (!application.getJob().getCompany().getId()
                .equals(user.getCompany().getId())) {
            throw new BadRequestException("Không có quyền");
        }


        if (interviewRepository.findByApplicationId(application.getId()).isPresent()) {
            throw new BadRequestException("Application đã có lịch phỏng vấn");
        }

        Interview interview = Interview.builder()
                .application(application)
                .scheduleTime(request.getScheduleTime())
                .location(request.getLocation())
                .note(request.getNote())
                .status(InterviewStatus.PENDING)
                .result("WAITING")
                .build();

        Interview saved = interviewRepository.save(interview);

        notificationService.createNotification(
                application.getUser().getId(),
                "Bạn có lịch phỏng vấn mới",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW,
                true
        );

        return saved;
    }

    @Transactional
    @Override
    public Interview updateInterviewStatus(Long id, UpdateInterviewStatusRequest request) {

        User user = getCurrentUser();
        checkRole(user, UserRole.RECRUITER, UserRole.ADMIN);

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy interview"));

        if (user.getRole() == UserRole.RECRUITER) {
            if (!interview.getApplication().getJob().getCompany().getId()
                    .equals(user.getCompany().getId())) {
                throw new BadRequestException("Không có quyền cập nhật interview này");
            }
        }

        if (request.getStatus() == null || request.getStatus().isBlank()) {
            throw new BadRequestException("Status không được để trống");
        }

        InterviewStatus newStatus;
        try {
            newStatus = InterviewStatus.valueOf(request.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Status không hợp lệ: " + request.getStatus()
                    + ". Các giá trị hợp lệ: scheduled, in_progress, completed, cancelled, no_show");
        }

        // Chỉ cho phép các status hợp lệ qua endpoint này
        java.util.Set<InterviewStatus> allowed = java.util.Set.of(
                InterviewStatus.SCHEDULED,
                InterviewStatus.IN_PROGRESS,
                InterviewStatus.COMPLETED,
                InterviewStatus.CANCELLED,
                InterviewStatus.NO_SHOW
        );
        if (!allowed.contains(newStatus)) {
            throw new BadRequestException("Status không được phép cập nhật qua endpoint này");
        }

        interview.setStatus(newStatus);
        Interview saved = interviewRepository.save(interview);

        // Thông báo cho ứng viên khi trạng thái thay đổi đáng kể
        if (newStatus == InterviewStatus.CANCELLED || newStatus == InterviewStatus.COMPLETED) {
            String msg = switch (newStatus) {
                case CANCELLED -> "Lịch phỏng vấn của bạn đã bị HỦY";
                case COMPLETED -> "Buổi phỏng vấn của bạn đã hoàn thành";
                default        -> "Trạng thái lịch phỏng vấn đã được cập nhật: " + newStatus;
            };
            notificationService.createNotification(
                    saved.getApplication().getUser().getId(),
                    msg,
                    "/api/interviews/" + saved.getId(),
                    NotificationType.INTERVIEW,
                    true
            );
        }

        return saved;
    }

    @Transactional
    @Override
    public Interview updateInterviewResult(Long id, UpdateInterviewResultRequest request) {

        User user = getCurrentUser();
        checkRole(user, UserRole.RECRUITER, UserRole.ADMIN);

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy interview"));

        // RECRUITER chỉ cập nhật được interview thuộc công ty của mình
        if (user.getRole() == UserRole.RECRUITER) {
            if (!interview.getApplication().getJob().getCompany().getId()
                    .equals(user.getCompany().getId())) {
                throw new BadRequestException("Không có quyền cập nhật interview này");
            }
        }

        if (request.getResult() != null) {
            interview.setResult(request.getResult());
        }
        if (request.getNote() != null) {
            interview.setNote(request.getNote());
        }

        Interview saved = interviewRepository.save(interview);

        // Thông báo cho ứng viên biết kết quả
        String candidateMsg = switch (saved.getResult().toUpperCase()) {
            case "PASSED"  -> "Chúc mừng! Bạn đã PASSED buổi phỏng vấn";
            case "FAILED"  -> "Rất tiếc, bạn chưa vượt qua buổi phỏng vấn lần này";
            case "ON_HOLD" -> "Kết quả phỏng vấn của bạn đang được xem xét (ON_HOLD)";
            default        -> "Kết quả phỏng vấn của bạn đã được cập nhật: " + saved.getResult();
        };

        notificationService.createNotification(
                saved.getApplication().getUser().getId(),
                candidateMsg,
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW,
                true
        );

        return saved;
    }

    // ================= PRIVATE =================

    private void validateOwnership(User user, Interview interview) {
        if (interview.getApplication() == null ||
                interview.getApplication().getUser() == null ||
                !interview.getApplication().getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Không có quyền");
        }
    }
}