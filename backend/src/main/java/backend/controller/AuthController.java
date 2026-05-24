package backend.controller;

import backend.DTO.ApiResponse;
import backend.DTO.auth.*;
import backend.DTO.user.UpdateProfileRequest;
import backend.DTO.user.UpdateRecruitmentInfoRequest;
import backend.DTO.user.UserResponse;
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
                .status(status).message(message).data(data).build();
    }

    @PostMapping("/send-code")
    public ResponseEntity<ApiResponse<SendOtpResponse>> sendOtp(
            @RequestBody Map<String, String> req) {
        return ResponseEntity.ok(wrap(
                authService.sendVerificationCode(req.get("email")), "Send OTP success", 200));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> register(
            @RequestBody VerifyRegisterRequest request) {
        return ResponseEntity.ok(wrap(authService.register(request), "Register success", 201));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @RequestBody LoginRequest request) {
        return ResponseEntity.ok(wrap(authService.login(request), "Login success", 200));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<ForgotPasswordResponse>> forgotPassword(
            @RequestBody ForgotPassword.ForgotPasswordRequest request) {
        return ResponseEntity.ok(wrap(
                authService.sendForgotPasswordCode(request.getEmail()), "OTP sent", 200));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<ResetPasswordResponse>> resetPassword(
            @RequestBody ForgotPassword.ResetPasswordRequest request) {
        return ResponseEntity.ok(wrap(authService.resetPassword(request), "Reset success", 200));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        return ResponseEntity.ok(authService.logout());
    }

    @PostMapping("/google")
    public ResponseEntity<ApiResponse<AuthResponse>> loginWithGoogle(
            @RequestBody GoogleLoginRequest request) {
        AuthResponse res = authService.loginWithGoogle(request);
        return ResponseEntity.ok(wrap(res, "Login with Google success", 200));
    }

}
