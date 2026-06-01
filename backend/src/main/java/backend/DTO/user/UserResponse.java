package backend.DTO.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

  private Long id;
  private String email;
  private String firstName;
  private String lastName;
  private String gender;
  private LocalDate dateOfBirth;
  private String phone;
  private String address;
  private String taxCode;
  private String citizenId;
  private LocalDate releaseDate;
  private String socialLink;
  private String bankAccountName;
  private String role;
  private String status;
  private Long companyId;
}