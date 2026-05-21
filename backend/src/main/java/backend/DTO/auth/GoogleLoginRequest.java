package backend.DTO.auth;

import lombok.Data;

@Data
public class GoogleLoginRequest {
    private String idToken;
}
