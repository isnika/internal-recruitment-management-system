package backend.service;

import backend.DTO.ApiResponse;
import backend.DTO.auth.*;
import backend.DTO.user.UpdateProfileRequest;
import backend.DTO.user.UpdateRecruitmentInfoRequest;
import backend.DTO.user.UserResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AuthService {


    SendOtpResponse       sendVerificationCode(String email);
    RegisterResponse      register(VerifyRegisterRequest request);
    AuthResponse          login(LoginRequest request);
    ApiResponse<String>   logout();
    ForgotPasswordResponse sendForgotPasswordCode(String email);
    ResetPasswordResponse  resetPassword(ForgotPassword.ResetPasswordRequest request);

    AuthResponse  loginWithGoogle(GoogleLoginRequest request);
}
