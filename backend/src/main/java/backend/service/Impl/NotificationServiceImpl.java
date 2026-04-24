package backend.service.Impl;

import backend.DTO.notifications.NotificationResponse;
import backend.entity.Notification;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.mapper.NotificationMapper;
import backend.repository.NotificationRepository;
import backend.repository.UserRepository;
import backend.security.AuthUser;
import backend.service.EmailService;
import backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

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

    @Override
    @Transactional
    public String createNotification(Long receiverId, String content, boolean sendEmail) {

        User sender = getCurrentUser();

        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user nhận"));

        Notification notification = Notification.builder()
                .content(content)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .user(receiver)
                .build();

        notificationRepository.save(notification);

        if (sendEmail) {
            emailService.sendSimpleMail(
                    receiver.getEmail(),
                    "Thông báo từ hệ thống",
                    content
            );
        }

        return "Gửi thông báo thành công";
    }

    @Override
    public List<NotificationResponse> getNotificationsByUserId(Long userId) {

        User currentUser = getCurrentUser();

        if (!currentUser.getId().equals(userId)) {
            throw new BadRequestException("Không có quyền");
        }

        return notificationRepository.findByUserId(userId)
                .stream()
                .map(NotificationMapper::toDTO)
                .toList();
    }

    @Override
    public List<NotificationResponse> getUnreadNotifications(Long userId) {

        User currentUser = getCurrentUser();

        if (!currentUser.getId().equals(userId)) {
            throw new BadRequestException("Không có quyền");
        }

        return notificationRepository.findByUserIdAndIsRead(userId, false)
                .stream()
                .map(NotificationMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional
    public String markAsRead(Long notificationId) {

        User currentUser = getCurrentUser();

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông báo"));

        if (!notification.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Không có quyền");
        }

        notification.setIsRead(true);

        notificationRepository.save(notification);

        return "Đã đọc";
    }
}