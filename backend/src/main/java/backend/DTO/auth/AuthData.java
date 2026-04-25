package backend.DTO.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthData {
    private String token;
    private Long userId;
    private String email;
    private String role;
}