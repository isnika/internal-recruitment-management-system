package backend.DTO.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SendOtpResponse {
    private int status;
    private String message;
    private String email;
}