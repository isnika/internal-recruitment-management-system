package backend.controller;

import backend.DTO.ApiResponse;
import backend.DTO.auth.*;
import backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  private <T> ApiResponse<T> wrap(T data, String message, int status) {
    return ApiResponse.<T>builder()
            .status(status)
            .message(message)
            .data(data)
            .build();
  }

  @PostMapping("/send-code")
  public ResponseEntity<ApiResponse<SendOtpResponse>> sendOtp(
          @RequestBody Map<String, String> request
  ) {
    SendOtpResponse res = authService.sendVerificationCode(request.get("email"));
    return ResponseEntity.ok(wrap(res, "Send OTP success", 200));
  }

  @PostMapping("/register")
  public ResponseEntity<ApiResponse<RegisterResponse>> register(
          @RequestBody VerifyRegisterRequest request
  ) {
    RegisterResponse res = authService.register(request);
    return ResponseEntity.ok(wrap(res, "Register success", 201));
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<AuthResponse>> login(
          @RequestBody LoginRequest request
  ) {
    AuthResponse res = authService.login(request);
    return ResponseEntity.ok(wrap(res, "Login success", 200));
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<ApiResponse<ForgotPasswordResponse>> forgotPassword(
          @RequestBody ForgotPassword.ForgotPasswordRequest request
  ) {
    ForgotPasswordResponse res = authService.sendForgotPasswordCode(request.getEmail());
    return ResponseEntity.ok(wrap(res, "OTP sent", 200));
  }

  @PostMapping("/reset-password")
  public ResponseEntity<ApiResponse<ResetPasswordResponse>> resetPassword(
          @RequestBody ForgotPassword.ResetPasswordRequest request
  ) {
    ResetPasswordResponse res = authService.resetPassword(request);
    return ResponseEntity.ok(wrap(res, "Reset password success", 200));
  }

  @PostMapping("/logout")
  public ResponseEntity<ApiResponse<String>> logout() {
    return ResponseEntity.ok(authService.logout());
  }
}
