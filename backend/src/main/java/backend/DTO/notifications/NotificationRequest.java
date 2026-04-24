package backend.DTO.notifications;

import backend.Enum.NotificationType;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationRequest {

    private Long userId;
    private String content;

    private String redirectUrl;
    private NotificationType type;

    private boolean sendEmail;
}