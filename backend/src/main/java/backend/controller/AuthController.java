package backend.controller;

import backend.DTO.ApiResponse;
import backend.DTO.auth.*;
import backend.DTO.user.CreateUserRequest;
import backend.entity.User;
import backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  // ================= HELPER WRAPPER =================
  private <T> ApiResponse<T> wrap(T data, String message, int status) {
    return ApiResponse.<T>builder()
            .status(status)
            .message(message)
            .data(data)
            .build();
  }

  // ================= OTP =================
  @PostMapping("/send-code")
  public ResponseEntity<ApiResponse<SendOtpResponse>> sendOtp(
          @RequestBody Map<String, String> request
  ) {
    SendOtpResponse res = authService.sendVerificationCode(request.get("email"));
    return ResponseEntity.ok(wrap(res, "Send OTP success", 200));
  }

  // ================= REGISTER =================
  @PostMapping("/register")
  public ResponseEntity<ApiResponse<RegisterResponse>> register(
          @RequestBody VerifyRegisterRequest request
  ) {
    RegisterResponse res = authService.register(request);
    return ResponseEntity.ok(wrap(res, "Register success", 201));
  }

  // ================= LOGIN =================
  @PostMapping("/login")
  public ResponseEntity<ApiResponse<AuthResponse>> login(
          @RequestBody LoginRequest request
  ) {
    AuthResponse res = authService.login(request);
    return ResponseEntity.ok(wrap(res, "Login success", 200));
  }

  // ================= FORGOT PASSWORD =================
  @PostMapping("/forgot-password")
  public ResponseEntity<ApiResponse<ForgotPasswordResponse>> forgotPassword(
          @RequestBody ForgotPassword.ForgotPasswordRequest request
  ) {
    ForgotPasswordResponse res =
            authService.sendForgotPasswordCode(request.getEmail());

    return ResponseEntity.ok(wrap(res, "OTP sent", 200));
  }

  // ================= RESET PASSWORD =================
  @PostMapping("/reset-password")
  public ResponseEntity<ApiResponse<ResetPasswordResponse>> resetPassword(
          @RequestBody ForgotPassword.ResetPasswordRequest request
  ) {
    ResetPasswordResponse res = authService.resetPassword(request);
    return ResponseEntity.ok(wrap(res, "Reset password success", 200));
  }

  // ================= LOGOUT =================
  @PostMapping("/logout")
  public ResponseEntity<ApiResponse<String>> logout() {
    return ResponseEntity.ok(
            wrap(authService.logout().getData(), "Logout success", 200)
    );
  }

  // ================= ADMIN USERS =================

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/admin/users")
  public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
    return ResponseEntity.ok(authService.getAllUsers());
  }

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/admin/users/{id}")
  public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
    return ResponseEntity.ok(authService.getUserById(id));
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping("/admin/users")
  public ResponseEntity<ApiResponse<String>> createUser(
          @RequestBody CreateUserRequest request
  ) {
    return ResponseEntity.ok(authService.createUser(request));
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PutMapping("/admin/users/{id}")
  public ResponseEntity<ApiResponse<String>> updateUser(
          @PathVariable Long id,
          @RequestBody CreateUserRequest request
  ) {
    return ResponseEntity.ok(authService.updateUser(id, request));
  }

  @PreAuthorize("hasRole('ADMIN')")
  @DeleteMapping("/admin/users/{id}")
  public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
    return ResponseEntity.ok(authService.deleteUser(id));
  }

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/admin/users/count")
  public ResponseEntity<ApiResponse<Long>> countUsers() {
    return ResponseEntity.ok(authService.countUsers());
  }
}