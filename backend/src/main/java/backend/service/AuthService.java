package backend.service;

import backend.DTO.auth.*;
import backend.DTO.user.CreateUserRequest;
import backend.entity.User;

import java.util.List;

public interface AuthService {

    // ===== AUTH =====
    String sendVerificationCode(String email);

    String register(VerifyRegisterRequest request);

    LoginResponse login(LoginRequest request);

    String logout();

    // ===== FORGOT PASSWORD =====
    String sendForgotPasswordCode(String email);

    String resetPassword(ForgotPassword.ResetPasswordRequest request);

    // ===== USER =====
    List<User> getAllUsers();

    User getUserById(Long id);

    String createUser(CreateUserRequest request);

    String updateUser(Long id, CreateUserRequest request);

    String deleteUser(Long id);
}