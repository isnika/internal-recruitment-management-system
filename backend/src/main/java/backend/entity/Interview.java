package backend.entity;

import java.time.LocalDateTime;

import backend.Enum.InterviewStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "application_id")
  private Application application;

}