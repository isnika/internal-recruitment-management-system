package backend.service.Impl;

import backend.DTO.interview.CreateInterviewRequest;
import backend.DTO.interview.InterviewResponse;
import backend.service.EmailService;
import backend.DTO.interview.UpdateInterviewResultRequest;
import backend.DTO.interview.UpdateInterviewScheduleRequest;
import backend.DTO.interview.UpdateInterviewStatusRequest;
import backend.Enum.InterviewStatus;
import backend.Enum.NotificationType;
import backend.Enum.UserRole;
import backend.entity.Application;
import backend.entity.Interview;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.mapper.InterviewMapper;
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
import java.util.Set;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {

    private final InterviewRepository interviewRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;

    // ================= HELPER =================

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
            if (user.getRole() == role)
                return;
        }
        throw new BadRequestException("Không có quyền truy cập");
    }

    private void validateOwnership(User user, Interview interview) {
        if (interview.getApplication() == null ||
                interview.getApplication().getUser() == null ||
                !interview.getApplication().getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Không có quyền");
        }
    }

    private User findRecruiterByCompany(Long companyId) {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole() == UserRole.RECRUITER)
                .filter(u -> u.getCompany() != null)
                .filter(u -> u.getCompany().getId().equals(companyId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy recruiter"));
    }

    // ================= CANDIDATE =================

    @Override
    @Transactional(readOnly = true)
    public List<InterviewResponse> getMyInterviews() {
        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE);

        return interviewRepository.findByApplication_User_Id(user.getId())
                .stream()
                .map(InterviewMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public InterviewResponse acceptInterview(Long id) {
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

        Long companyId = saved.getApplication().getJob().getCompany().getId();
        User recruiter = findRecruiterByCompany(companyId);

        notificationService.createNotification(
                recruiter.getId(),
                "Ứng viên đã CHẤP NHẬN lịch phỏng vấn",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW, true);

        notificationService.createNotification(
                saved.getApplication().getUser().getId(),
                "Bạn đã CHẤP NHẬN lịch phỏng vấn thành công",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW, false);

        return InterviewMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public InterviewResponse rejectInterview(Long id) {
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

        Long companyId = saved.getApplication().getJob().getCompany().getId();
        User recruiter = findRecruiterByCompany(companyId);

        notificationService.createNotification(
                recruiter.getId(),
                "Ứng viên đã TỪ CHỐI lịch phỏng vấn",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW, true);

        notificationService.createNotification(
                saved.getApplication().getUser().getId(),
                "Bạn đã TỪ CHỐI lịch phỏng vấn thành công",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW, false);

        return InterviewMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public InterviewResponse getInterviewById(Long id) {
        User user = getCurrentUser();

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy interview"));

        // ADMIN: xem được tất cả
        if (user.getRole() == UserRole.ADMIN) {
            return InterviewMapper.toResponse(interview);
        }

        if (user.getRole() == UserRole.CANDIDATE) {
            if (interview.getApplication() == null ||
                    interview.getApplication().getUser() == null ||
                    !interview.getApplication().getUser().getId().equals(user.getId())) {
                throw new BadRequestException("Không có quyền");
            }
        }

        if (user.getRole() == UserRole.RECRUITER) {
            if (!interview.getApplication().getJob().getCompany().getId()
                    .equals(user.getCompany().getId())) {
                throw new BadRequestException("Không có quyền");
            }
        }

        return InterviewMapper.toResponse(interview);
    }

    // ================= RECRUITER / ADMIN =================

    @Override
    @Transactional
    public InterviewResponse createInterview(CreateInterviewRequest request) {
        User user = getCurrentUser();
        checkRole(user, UserRole.RECRUITER, UserRole.ADMIN);

        Application application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy application"));

        if (user.getRole() == UserRole.RECRUITER) {
            if (!application.getJob().getCompany().getId().equals(user.getCompany().getId())) {
                throw new BadRequestException("Không có quyền");
            }
        }
        // ADMIN: không giới hạn companyId

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
                "You have new interview schedule",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW,
                true);

        emailService.sendSimpleMail(
                application.getUser().getEmail(),
                "Thư mời phỏng vấn",
                """
                        Hello %s,

                        You have been invited for an interview.

                        Site: %s
                        Time: %s
                        Location: %s

                        Note
                        %s

                        Best Reagard.
                        """
                        .formatted(
                                application.getUser().getFirstName() + " " + application.getUser().getLastName(),
                                application.getJob().getTitle(),
                                saved.getScheduleTime(),
                                saved.getLocation(),
                                saved.getNote() == null ? "" : saved.getNote()));

        return InterviewMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public InterviewResponse updateInterviewStatus(Long id, UpdateInterviewStatusRequest request) {
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
        // ADMIN: không giới hạn companyId

        if (request.getStatus() == null || request.getStatus().isBlank()) {
            throw new BadRequestException("Status không được để trống");
        }

        InterviewStatus newStatus;
        try {
            newStatus = InterviewStatus.valueOf(request.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Status không hợp lệ: " + request.getStatus()
                    + ". Các giá trị hợp lệ: SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW");
        }

        Set<InterviewStatus> allowed = Set.of(
                InterviewStatus.SCHEDULED,
                InterviewStatus.IN_PROGRESS,
                InterviewStatus.COMPLETED,
                InterviewStatus.CANCELLED,
                InterviewStatus.NO_SHOW);

        if (!allowed.contains(newStatus)) {
            throw new BadRequestException("Status không được phép cập nhật qua endpoint này");
        }

        interview.setStatus(newStatus);
        Interview saved = interviewRepository.save(interview);

        if (newStatus == InterviewStatus.CANCELLED) {

            emailService.sendSimpleMail(
                    saved.getApplication().getUser().getEmail(),
                    "Interview cancellation notice",
                    """
                            Hello %s,

                            The interview for the %s position has been cancelled.

                            Please monitor the system for new notifications.

                            Best Regard.
                            """
                            .formatted(
                                    saved.getApplication().getUser().getFirstName(),
                                    saved.getApplication().getJob().getTitle()));
        }
        if (newStatus == InterviewStatus.CANCELLED || newStatus == InterviewStatus.COMPLETED) {
            String msg = switch (newStatus) {
                case CANCELLED -> "Lịch phỏng vấn của bạn đã bị HỦY";
                case COMPLETED -> "Buổi phỏng vấn của bạn đã hoàn thành";
                default -> "Trạng thái lịch phỏng vấn đã được cập nhật: " + newStatus;
            };
            notificationService.createNotification(
                    saved.getApplication().getUser().getId(),
                    msg,
                    "/api/interviews/" + saved.getId(),
                    NotificationType.INTERVIEW, true);
        }

        return InterviewMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public InterviewResponse updateInterviewResult(Long id, UpdateInterviewResultRequest request) {
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
        // ADMIN: không giới hạn companyId

        if (request.getResult() != null)
            interview.setResult(request.getResult());
        if (request.getNote() != null)
            interview.setNote(request.getNote());

        Interview saved = interviewRepository.save(interview);

        String emailContent;

        switch (saved.getResult().toUpperCase()) {

            case "PASSED" ->
                emailContent = "Congratulations! You have passed the interview for the position. "
                        + saved.getApplication().getJob().getTitle();

            case "FAILED" ->
                emailContent = "Unfortunately, you did not pass the interview for the position. "
                        + saved.getApplication().getJob().getTitle();

            case "ON_HOLD" ->
                emailContent = "Your interview results are currently being reviewed.";

            default ->
                emailContent = "Your interview results have been updated.";
        }

        emailService.sendSimpleMail(
                saved.getApplication().getUser().getEmail(),
                "Kết quả phỏng vấn",
                emailContent);
        String candidateMsg = switch (saved.getResult().toUpperCase()) {
            case "PASSED" -> "Chúc mừng! Bạn đã PASSED buổi phỏng vấn";
            case "FAILED" -> "Rất tiếc, bạn chưa vượt qua buổi phỏng vấn lần này";
            case "ON_HOLD" -> "Kết quả phỏng vấn của bạn đang được xem xét (ON_HOLD)";
            default -> "Kết quả phỏng vấn của bạn đã được cập nhật: " + saved.getResult();
        };

        notificationService.createNotification(
                saved.getApplication().getUser().getId(),
                candidateMsg,
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW, true);

        return InterviewMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public InterviewResponse updateInterviewSchedule(Long id, UpdateInterviewScheduleRequest request) {
        User user = getCurrentUser();
        checkRole(user, UserRole.RECRUITER, UserRole.ADMIN);

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy interview"));

        if (user.getRole() == UserRole.RECRUITER) {
            if (!interview.getApplication().getJob().getCompany().getId()
                    .equals(user.getCompany().getId())) {
                throw new BadRequestException("Không có quyền dời lịch interview này");
            }
        }
        // ADMIN: không giới hạn companyId

        if (request.getScheduleTime() != null)
            interview.setScheduleTime(request.getScheduleTime());
        if (request.getLocation() != null)
            interview.setLocation(request.getLocation());
        if (request.getNote() != null)
            interview.setNote(request.getNote());

        interview.setStatus(InterviewStatus.PENDING);
        Interview saved = interviewRepository.save(interview);

        emailService.sendSimpleMail(
                saved.getApplication().getUser().getEmail(),
                "Update interview schedule",
                """
                        Hello %s,

                        Your interview schedule has been changed.

                        New Time: %s
                        New Location: %s

                        Please log in to the system to view the details.
                        """
                        .formatted(
                                saved.getApplication().getUser().getFirstName() + " "
                                        + saved.getApplication().getUser().getLastName(),
                                saved.getScheduleTime(),
                                saved.getLocation()));

        notificationService.createNotification(
                saved.getApplication().getUser().getId(),
                "Lịch phỏng vấn của bạn đã được thay đổi. Vui lòng kiểm tra lịch mới.",
                "/api/interviews/" + saved.getId(),
                NotificationType.INTERVIEW, true);

        return InterviewMapper.toResponse(saved);
    }

    // ================= ADMIN =================

    @Override
    @Transactional(readOnly = true)
    public List<InterviewResponse> getAllInterviews() {
        User user = getCurrentUser();
        checkRole(user, UserRole.ADMIN);

        return interviewRepository.findAll()
                .stream()
                .map(InterviewMapper::toResponse)
                .toList();
    }
}