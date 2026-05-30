package backend.DTO.auth;

import backend.Enum.RegisterRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyRegisterRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phone;
    private String gender;          // "MALE" | "FEMALE" | "OTHER"
    private LocalDate dateOfBirth;  // yyyy-MM-dd
    private String code;

    private RegisterRole role;
    private Long companyId;
}