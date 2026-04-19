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

    private void checkRole(User user, UserRole role) {
        if (user.getRole() != role) {
            throw new BadRequestException("Không có quyền truy cập");
        }
    }

    // ================= CANDIDATE =================

    @Override
    public List<Interview> getMyInterviews() {
        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE);

        return interviewRepository.findAll()
                .stream()
                .filter(i -> i.getApplication() != null)
                .filter(i -> i.getApplication().getUser() != null)
                .filter(i -> i.getApplication().getUser().getId().equals(user.getId()))
                .toList();
    }

    @Override
    public Interview acceptInterview(Long id) {
        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE);

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch"));

        if (interview.getApplication() == null ||
                interview.getApplication().getUser() == null ||
                !interview.getApplication().getUser().getId().equals(user.getId())) {
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

    @Override
    public Interview rejectInterview(Long id) {
        User user = getCurrentUser();
        checkRole(user, UserRole.CANDIDATE);

        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy lịch"));

        if (interview.getApplication() == null ||
                interview.getApplication().getUser() == null ||
                !interview.getApplication().getUser().getId().equals(user.getId())) {
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


        boolean exists = interviewRepository.findAll()
                .stream()
                .anyMatch(i -> i.getApplication().getId().equals(application.getId()));

        if (exists) {
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