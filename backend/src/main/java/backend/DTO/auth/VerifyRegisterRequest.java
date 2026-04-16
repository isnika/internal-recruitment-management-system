package backend.DTO.auth;

import backend.Enum.RegisterRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyRegisterRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String code;

    private RegisterRole role;
    private Long companyId;
}