package backend.service;

import java.util.List;

import backend.DTO.user.CreateUserRequest;
import backend.DTO.user.UserResponse;

public interface UserService {

  List<UserResponse> getAllUsers();

  UserResponse getUserById(Long id);

  UserResponse getCurrentUser();

  UserResponse createUser(CreateUserRequest request);

  UserResponse updateUser(Long id, CreateUserRequest request);

  void deleteUser(Long id);
}
