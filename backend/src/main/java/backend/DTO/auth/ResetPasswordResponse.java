package backend.DTO.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResetPasswordResponse {
    private int status;
    private String message;
}