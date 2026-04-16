package backend.service;

import backend.entity.Notification;

import java.util.List;

public interface NotificationService {

    String createNotification(Long receiverId, String content, boolean sendEmail);

    List<Notification> getNotificationsByUserId(Long userId);

    List<Notification> getUnreadNotifications(Long userId);

    String markAsRead(Long notificationId);




}