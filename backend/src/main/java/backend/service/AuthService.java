package backend.service;

import backend.DTO.auth.ForgotPassword;
import backend.DTO.auth.LoginRequest;
import backend.DTO.auth.LoginResponse;
import backend.DTO.auth.VerifyRegisterRequest;

public interface AuthService {

  String sendVerificationCode(String email);

  String register(VerifyRegisterRequest request);

  LoginResponse login(LoginRequest request);

  String logout();

  String sendForgotPasswordCode(String email);

  String resetPassword(ForgotPassword.ResetPasswordRequest request);
}
