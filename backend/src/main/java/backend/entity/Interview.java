package backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

  private String status;
  private String result;

  @Column(columnDefinition = "TEXT")
  private String note;

  @OneToOne
  @JoinColumn(name = "application_id")
  private Application application;
}
