package backend.DTO.experiencelevel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceLevelResponse {
  private Long id;
  private String name;
}
