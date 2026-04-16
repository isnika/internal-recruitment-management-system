package backend.controller;

import backend.DTO.auth.*;
import backend.service.AuthService;
import backend.entity.User;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backend.DTO.user.CreateUserRequest;

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

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/admin/users")
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(authService.getAllUsers());
  }

  // ==================== ADMIN - GET USER BY ID ====================
  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/admin/users/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    return ResponseEntity.ok(authService.getUserById(id));
  }

  // ==================== ADMIN - CREATE USER ====================
  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping("/admin/users")
  public ResponseEntity<String> createUser(@RequestBody CreateUserRequest request) {
    String result = authService.createUser(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(result);
  }

  // ==================== ADMIN - UPDATE USER ====================
  @PreAuthorize("hasRole('ADMIN')")
  @PutMapping("/admin/users/{id}")
  public ResponseEntity<String> updateUser(
          @PathVariable Long id,
          @RequestBody CreateUserRequest request
  ) {
    String result = authService.updateUser(id, request);
    return ResponseEntity.ok(result);
  }

  // ==================== ADMIN - DELETE USER ====================
  @PreAuthorize("hasRole('ADMIN')")
  @DeleteMapping("/admin/users/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable Long id) {
    String result = authService.deleteUser(id);
    return ResponseEntity.ok(result);
  }
}
