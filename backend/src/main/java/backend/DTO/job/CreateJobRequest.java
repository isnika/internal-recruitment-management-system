package backend.DTO.job;

import java.time.LocalDate;
import java.util.List;

import backend.Enum.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateJobRequest {

  private String title;
  private String description;
  private String requirements;
  private String benefits;

  private Double salaryMin;
  private Double salaryMax;

  private String location;
  private String type;
  private LocalDate deadline;
  private JobStatus status;

  private Long companyId;
  private Long categoryId;
  private Long experienceLevelId;

  private List<Long> skillIds;
}
