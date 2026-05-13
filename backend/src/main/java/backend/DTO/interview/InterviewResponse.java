package backend.DTO.interview;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewResponse {

  private Long id;
  private LocalDateTime scheduleTime;
  private String location;
  private String status;
  private String result;
  private String note;
}