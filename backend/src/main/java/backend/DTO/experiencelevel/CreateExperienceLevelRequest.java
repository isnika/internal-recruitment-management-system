package backend.DTO.experiencelevel;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateExperienceLevelRequest {

  @NotBlank(message = "Name khong duoc de trong")
  private String name;
}
