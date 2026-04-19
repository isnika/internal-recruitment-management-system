package backend.mapper;

import backend.entity.Notification;
import backend.DTO.notifications.NotificationResponse;

public class NotificationMapper {

    public static NotificationResponse toDTO(Notification n) {
        if (n == null) return null;

        return NotificationResponse.builder()
                .id(n.getId())
                .content(n.getContent())
                .isRead(n.getIsRead())
                .createdAt(n.getCreatedAt())
                .build();
    }
}