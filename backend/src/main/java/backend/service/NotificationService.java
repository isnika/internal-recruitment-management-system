package backend.service;

import backend.DTO.notifications.NotificationResponse;
import backend.Enum.NotificationType;
import org.springframework.data.domain.Page;

public interface NotificationService {

    // ===== CREATE =====
    String createNotification(
            Long receiverId,
            String content,
            String redirectUrl,
            NotificationType type,
            boolean sendEmail
    );

    // ===== GET =====
    Page<NotificationResponse> getNotifications(Long userId, int page, int size);

    Page<NotificationResponse> getUnreadNotifications(Long userId, int page, int size);

    NotificationResponse getById(Long id);

    // ===== READ =====
    String markAsRead(Long notificationId);

    String markAllAsRead(Long userId);

    // ===== DELETE =====
    String deleteNotification(Long id);

    // ===== COUNT =====
    long countUnread(Long userId);
}