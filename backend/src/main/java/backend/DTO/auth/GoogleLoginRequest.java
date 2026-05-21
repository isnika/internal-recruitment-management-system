package backend.DTO.auth;

import lombok.Data;

@Data
public class GoogleLoginRequest {
    private String idToken; // ID token tra ve tu Google Sign-In phia frontend
}
