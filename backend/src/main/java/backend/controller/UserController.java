package backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.DTO.auth.AuthResponse;
import backend.DTO.auth.ForgotPasswordRequest;
import backend.DTO.auth.LoginRequest;
import backend.DTO.user.CreatUserRequest;
import backend.DTO.user.UserResponse;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

  private final UserService userService;

  @PostMapping("/auth/register")
  public ResponseEntity<AuthResponse> register(@RequestBody CreatUserRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(request));
  }

  @PostMapping("/auth/login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(userService.login(request));
  }

  @PostMapping("/auth/forgot-password")
  public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
    return ResponseEntity.ok(userService.forgotPassword(request));
  }

  @GetMapping("/users/me")
  public ResponseEntity<UserResponse> getCurrentUser() {
    return ResponseEntity.ok(userService.getCurrentUser());
  }

  @GetMapping("/users")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<UserResponse>> getAllUsers() {
    return ResponseEntity.ok(userService.getAllUsers());
  }

  @GetMapping("/users/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
    return ResponseEntity.ok(userService.getUserById(id));
  }

  @PostMapping("/users")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<UserResponse> createUser(@RequestBody CreatUserRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(request));
  }

  @PutMapping("/users/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody CreatUserRequest request) {
    return ResponseEntity.ok(userService.updateUser(id, request));
  }

  @DeleteMapping("/users/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ResponseEntity.noContent().build();
  }
}
