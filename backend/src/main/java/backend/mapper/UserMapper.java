package backend.mapper;

import backend.DTO.auth.AuthResponse;
import backend.DTO.user.CreateUserRequest;
import backend.DTO.user.UserResponse;
import backend.Enum.UserRole;
import backend.entity.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class UserMapper {

  public static User toEntity(CreateUserRequest request) {
    if (request == null) {
      return null;
    }

    return User.builder()
            .email(request.getEmail())
            .password(request.getPassword())
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .role(parseRole(request.getRole()))
            .build();
  }

  public static UserResponse toResponse(User user) {
    if (user == null) {
      return null;
    }

    return UserResponse.builder()
            .id(user.getId())
            .email(user.getEmail())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .avatarUrl(user.getAvatarUrl())
            .role(user.getRole())
            .status(user.getStatus())
            .build();
  }

  public static AuthResponse toAuthResponse(User user, String token) {
    if (user == null) {
      return null;
    }

    return AuthResponse.builder()
            .token(token)
            .type("Bearer")
            .userId(user.getId())
            .email(user.getEmail())
            .role(user.getRole() != null ? user.getRole().name() : null)
            .build();
  }

  public static void updateEntity(User user, CreateUserRequest request) {
    if (user == null || request == null) {
      return;
    }

    user.setEmail(request.getEmail());
    user.setPassword(request.getPassword());
    user.setFirstName(request.getFirstName());
    user.setLastName(request.getLastName());
    user.setRole(parseRole(request.getRole()));
  }

  private static UserRole parseRole(String role) {
    if (role == null || role.isBlank()) {
      return null;
    }
    try {
      return UserRole.valueOf(role.trim().toUpperCase());
    } catch (IllegalArgumentException e) {
      return null;
    }
  }
}