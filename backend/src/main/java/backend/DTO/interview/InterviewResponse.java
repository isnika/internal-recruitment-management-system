package backend.DTO.interview;

import backend.Enum.InterviewStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewResponse {

  private Long id;
  private LocalDateTime scheduleTime;
  private String location;
  private InterviewStatus status;
  private String result;
  private String note;

  // Application
  private Long applicationId;
  private String applicationStatus;

  // Candidate
  private Long candidateId;
  private String candidateName;
  private String candidateEmail;

  // Job
  private Long jobId;
  private String jobTitle;
  private String companyName;
}