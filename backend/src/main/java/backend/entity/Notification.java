package backend.entity;

import backend.Enum.NotificationType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(columnDefinition = "TEXT")
  private String content;

  private Boolean isRead;

  private Boolean isDeleted;

  private LocalDateTime createdAt;

  private String redirectUrl;

  @Enumerated(EnumType.STRING)
  private NotificationType type;

  // người nhận
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  // người gửi
  @ManyToOne
  @JoinColumn(name = "sender_id")
  private User sender;
}