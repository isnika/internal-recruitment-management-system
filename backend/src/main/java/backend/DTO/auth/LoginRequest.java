package backend.DTO.auth;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
  private String email;
  private String password;
  private boolean rememberMe;
}