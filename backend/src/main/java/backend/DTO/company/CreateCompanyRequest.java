package backend.DTO.company;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCompanyRequest {
  @NotBlank(message = "Name khong duoc de trong")
  private String name;
  private String description;
  private String address;
  private String website;
}
