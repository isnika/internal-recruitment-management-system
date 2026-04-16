package backend.DTO.auth;


import lombok.Data;

public class ForgotPassword {

  // ------------------- Yêu cầu gửi OTP quên mật khẩu -------------------
  @Data
  public static class ForgotPasswordRequest {
    private String email;
  }

  // ------------------- Yêu cầu reset mật khẩu với OTP -------------------
  @Data
  public static class ResetPasswordRequest {
    private String email;
    private String code; // OTP
    private String newPassword;
  }
}