package backend.DTO.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

  private int status;
  private String message;

  private String token;
  private String type = "Bearer";

  private Long userId;
  private String email;
  private String role;
}
