package backend.DTO.candidateProdile;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCandidateProfileRequest {

  private String firstName;
  private String lastName;

  @NotBlank(message = "Gender khong duoc de trong")
  private String gender;
  private LocalDate dateOfBirth;

  @NotBlank(message = "Phone khong duoc de trong")
  private String phone;

  @NotBlank(message = "Address khong duoc de trong")
  private String address;

  private String taxCode;
  private String citizenId;
  private LocalDate releaseDate;

  private String socialLink;
  private String bankAccountName;
}
