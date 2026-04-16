package backend.DTO.user;

import backend.Enum.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

  private Long id;
  private String email;
  private String firstName;
  private String lastName;
  private String avatarUrl;
  private UserRole role;
  private String status;
}
