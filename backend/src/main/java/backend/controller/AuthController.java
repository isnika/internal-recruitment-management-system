package backend.controller;

import backend.DTO.auth.ForgotPassword;
import backend.DTO.auth.LoginRequest;
import backend.DTO.auth.LoginResponse;
import backend.DTO.auth.RegisterRequest;
import backend.DTO.auth.VerifyRegisterRequest;
import backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  // ==================== GỬI OTP ====================
  @PostMapping("/send-code")
  public ResponseEntity<String> sendCode(@RequestBody RegisterRequest request) {

    String result = authService.sendVerificationCode(request.getEmail());

    return ResponseEntity.ok(result);
  }

  // ==================== ĐĂNG KÝ ====================
  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody VerifyRegisterRequest request) {

    String result = authService.register(request);

    return ResponseEntity.status(HttpStatus.CREATED).body(result);
  }

  // ==================== ĐĂNG NHẬP ====================
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

    LoginResponse response = authService.login(request);

    return ResponseEntity.ok(response);
  }

  // ==================== QUÊN MẬT KHẨU ====================
  @PostMapping("/forgot-password")
  public ResponseEntity<String> forgotPassword(
          @RequestBody ForgotPassword.ForgotPasswordRequest request
  ) {

    String result = authService.sendForgotPasswordCode(request.getEmail());

    return ResponseEntity.ok(result);
  }

  // ==================== RESET PASSWORD ====================
  @PostMapping("/reset-password")
  public ResponseEntity<String> resetPassword(
          @RequestBody ForgotPassword.ResetPasswordRequest request
  ) {

    String result = authService.resetPassword(request);

    return ResponseEntity.ok(result);
  }

  // ==================== LOGOUT ====================
  @PostMapping("/logout")
  public ResponseEntity<String> logout() {

    String result = authService.logout();

    return ResponseEntity.ok(result);
  }
}
