package backend.DTO.savedjob;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedJobStatusResponse {

  private Long jobId;
  private boolean saved;
}
