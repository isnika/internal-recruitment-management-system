package backend.DTO.application;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateApplicationRequest {

  private Long jobId;
  private Long cvId;
  private String intro;
  private BigDecimal expectedSalary;
  private LocalDate startDate;
}