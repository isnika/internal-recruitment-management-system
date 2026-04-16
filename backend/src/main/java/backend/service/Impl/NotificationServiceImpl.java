package backend.service.Impl;

import backend.Enum.UserRole;
import backend.entity.Notification;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
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

    // ==================== TẠO THÔNG BÁO ====================
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

        // gửi email nếu bật
        if (sendEmail) {
            emailService.sendSimpleMail(
                    receiver.getEmail(),
                    "Thông báo từ hệ thống",
                    content
            );
        }

        return "Gửi thông báo thành công";
    }

    // ==================== LẤY TẤT CẢ THÔNG BÁO ====================
    @Override
    public List<Notification> getNotificationsByUserId(Long userId) {

        User currentUser = getCurrentUser();

        // chỉ được xem của mình
        if (!currentUser.getId().equals(userId)) {
            throw new BadRequestException("Không có quyền");
        }

        return notificationRepository.findByUserId(userId);
    }

    // ==================== LẤY CHƯA ĐỌC ====================
    @Override
    public List<Notification> getUnreadNotifications(Long userId) {

        User currentUser = getCurrentUser();

        if (!currentUser.getId().equals(userId)) {
            throw new BadRequestException("Không có quyền");
        }

        return notificationRepository.findByUserIdAndIsRead(userId, false);
    }

    // ==================== ĐÁNH DẤU ĐÃ ĐỌC ====================
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