package backend.service;

import backend.DTO.ApiResponse;
import backend.DTO.auth.*;

public interface AuthService {

    SendOtpResponse sendVerificationCode(String email);

    RegisterResponse register(VerifyRegisterRequest request);

    AuthResponse login(LoginRequest request);

    ApiResponse<String> logout();

    ForgotPasswordResponse sendForgotPasswordCode(String email);

    ResetPasswordResponse resetPassword(ForgotPassword.ResetPasswordRequest request);
}
