package backend.entity;

import backend.Enum.InterviewStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class Interview {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private LocalDateTime scheduleTime;

  private String location;

  @Enumerated(EnumType.STRING)
  private InterviewStatus status;
  private String result;

  @Column(columnDefinition = "TEXT")
  private String note;

  @ManyToOne
  @JoinColumn(name = "application_id")
  private Application application;
}
