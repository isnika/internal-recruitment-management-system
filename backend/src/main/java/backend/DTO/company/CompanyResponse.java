package backend.DTO.company;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyResponse {
  private Long id;
  private String name;
  private String description;
  private String address;
  private String website;
  private String logoUrl;
  private String status;
}