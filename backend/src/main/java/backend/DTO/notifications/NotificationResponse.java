package backend.DTO.notifications;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {
    private Long id;
    private String content;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
