package backend.DTO.skill;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateSkillRequest {

  @NotBlank(message = "Name khong duoc de trong")
  private String name;
}
