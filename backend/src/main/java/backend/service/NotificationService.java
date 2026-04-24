package backend.service;

import backend.DTO.notifications.NotificationResponse;

import java.util.List;

public interface NotificationService {

    String createNotification(Long receiverId, String content, boolean sendEmail);

    List<NotificationResponse> getNotificationsByUserId(Long userId);

    List<NotificationResponse> getUnreadNotifications(Long userId);

    String markAsRead(Long notificationId);
}