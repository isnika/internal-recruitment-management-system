package backend.service;

import backend.DTO.ApiResponse;
import backend.DTO.auth.*;
import backend.DTO.user.CreateUserRequest;
import backend.entity.User;

import java.util.List;

public interface AuthService {

    SendOtpResponse sendVerificationCode(String email);

    RegisterResponse register(VerifyRegisterRequest request);

    AuthResponse login(LoginRequest request);

    ForgotPasswordResponse sendForgotPasswordCode(String email);

    ResetPasswordResponse resetPassword(ForgotPassword.ResetPasswordRequest request);

    ApiResponse<String> logout();

    ApiResponse<List<User>> getAllUsers();

    ApiResponse<User> getUserById(Long id);

    ApiResponse<String> createUser(CreateUserRequest request);

    ApiResponse<String> updateUser(Long id, CreateUserRequest request);

    ApiResponse<String> deleteUser(Long id);

    ApiResponse<Long> countUsers();
}