package backend.DTO.job;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobFilterRequest {
  private String keywords;
  private Double minSalary;
  private Double maxSalary;
  private List<Long> skillIds;
  private String location;
  private Long categoryId;
  private String jobType;
  private String status;
}
