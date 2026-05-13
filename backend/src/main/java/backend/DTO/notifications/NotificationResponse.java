package backend.DTO.notifications;

import backend.Enum.NotificationType;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {

    private Long id;
    private String content;
    private Boolean isRead;
    private LocalDateTime createdAt;

    private Long senderId;
    private String senderName;

    private String redirectUrl;
    private String type;
}