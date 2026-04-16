package backend.service.Impl;

import backend.DTO.interview.CreateInterviewRequest;
import backend.Enum.InterviewStatus;
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

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {

    private final InterviewRepository interviewRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    private final NotificationService notificationService;

    // ==================== LẤY USER HIỆN TẠI ====================
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

    // ==================== CHECK ROLE ====================
    private void checkRole(User user, UserRole role) {
        if (user.getRole() != role) {
            throw new BadRequestException("Không có quyền truy cập");
        }
    }

    // ==================== CANDIDATE ====================

    // Xem lịch phỏng vấn của mình
    @Override
    public List<Interview> getMyInterviews() {
        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE);

        return applicationRepository.findByUserId(user.getId())
                .stream()
                .map(Application::getInterview)
                .filter(i -> i != null)
                .toList();
    }

    // ACCEPT interview
    @Override
    public Interview acceptInterview(Long id) {
        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE);

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch"));

        if (!interview.getApplication().getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Không có quyền");
        }

        if (interview.getStatus() != InterviewStatus.PENDING) {
            throw new BadRequestException("Lịch đã được xử lý");
        }

        interview.setStatus(InterviewStatus.ACCEPTED);
        Interview saved = interviewRepository.save(interview);

        notificationService.createNotification(
                interview.getApplication().getJob().getCompany().getId(),
                "Ứng viên đã CHẤP NHẬN lịch phỏng vấn",
                true
        );

        return saved;
    }

    // REJECT interview
    @Override
    public Interview rejectInterview(Long id) {
        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE);

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch"));

        if (!interview.getApplication().getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Không có quyền");
        }

        if (interview.getStatus() != InterviewStatus.PENDING) {
            throw new BadRequestException("Lịch đã được xử lý");
        }

        interview.setStatus(InterviewStatus.REJECTED);
        Interview saved = interviewRepository.save(interview);

        notificationService.createNotification(
                interview.getApplication().getJob().getCompany().getId(),
                "Ứng viên đã TỪ CHỐI lịch phỏng vấn",
                true
        );

        return saved;
    }

    // ==================== RECRUITER ====================

    // CREATE interview
    @Override
    public Interview createInterview(CreateInterviewRequest request) {

        User user = getCurrentUser();
        checkRole(user, UserRole.RECRUITER);

        Application application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy application"));

        if (!application.getJob().getCompany().getId()
                .equals(application.getJob().getCompany().getId())) {
            throw new BadRequestException("Không có quyền");
        }

        if (application.getInterview() != null) {
            throw new BadRequestException("Application đã có lịch phỏng vấn");
        }

        Interview interview = Interview.builder()
                .application(application)
                .scheduleTime(request.getScheduleTime())
                .location(request.getLocation())
                .note(request.getNote())
                .status(InterviewStatus.PENDING)
                .build();

        Interview saved = interviewRepository.save(interview);

        notificationService.createNotification(
                application.getUser().getId(),
                "Bạn có lịch phỏng vấn mới",
                true
        );

        return saved;
    }
}