package backend.mapper;

import backend.DTO.notifications.NotificationResponse;
import backend.entity.Notification;

public class NotificationMapper {

    public static NotificationResponse toDTO(Notification n) {
        if (n == null) return null;

        return NotificationResponse.builder()
                .id(n.getId())
                .content(n.getContent())
                .isRead(n.getIsRead())
                .createdAt(n.getCreatedAt())

                .senderId(n.getSender() != null ? n.getSender().getId() : null)
                .senderName(n.getSender() != null
                        ? n.getSender().getFirstName() + " " + n.getSender().getLastName()
                        : "SYSTEM")

                .redirectUrl(n.getRedirectUrl())
                .type(n.getType() != null ? n.getType().name() : null)
                .build();
    }
}