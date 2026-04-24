package backend.service;

import java.util.List;

import backend.DTO.auth.AuthResponse;
import backend.DTO.auth.ForgotPasswordRequest;
import backend.DTO.auth.LoginRequest;
import backend.DTO.user.CreatUserRequest;
import backend.DTO.user.UserResponse;

public interface UserService {

  AuthResponse register(CreatUserRequest request);

  AuthResponse login(LoginRequest request);

  String forgotPassword(ForgotPasswordRequest request);

  List<UserResponse> getAllUsers();

  UserResponse getUserById(Long id);

  UserResponse getCurrentUser();

  UserResponse createUser(CreatUserRequest request);

  UserResponse updateUser(Long id, CreatUserRequest request);

  void deleteUser(Long id);
}
