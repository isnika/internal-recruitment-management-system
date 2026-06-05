package backend.DTO.application;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import backend.DTO.Cv.CvResponse;
import backend.DTO.interview.InterviewResponse;
import backend.DTO.job.JobResponse;
import backend.DTO.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponse {

  private Long id;
  private String status;
  private LocalDateTime appliedAt;
  private String intro;
  private BigDecimal expectedSalary;
  private LocalDate startDate;

  private UserResponse user;
  private JobResponse job;
  private CvResponse cv;
  private InterviewResponse interview;
}