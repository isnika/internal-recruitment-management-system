package backend.DTO.auth;

import backend.DTO.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RegisterResponse {
    private int status;
    private String message;
    private UserResponse user;
}