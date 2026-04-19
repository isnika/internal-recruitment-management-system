package backend.DTO.application;

import backend.DTO.Cv.CvResponse;
import backend.DTO.job.JobResponse;
import backend.DTO.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponse {

  private Long id;
  private String status;
  private LocalDateTime appliedAt;

  private UserResponse user;
  private JobResponse job;
  private CvResponse cv;

}
