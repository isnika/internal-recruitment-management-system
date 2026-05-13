package backend.service.Impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.DTO.user.CreateUserRequest;
import backend.DTO.user.UserResponse;
import backend.Enum.UserRole;
import backend.entity.Company;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.exception.UnauthorizedException;
import backend.mapper.UserMapper;
import backend.repository.CompanyRepository;
import backend.repository.UserRepository;
import backend.security.AuthUser;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final CompanyRepository companyRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public List<UserResponse> getAllUsers() {
    return userRepository.findAll()
        .stream()
        .map(UserMapper::toResponse)
        .toList();
  }

  @Override
  public UserResponse getUserById(Long id) {
    return UserMapper.toResponse(findUserById(id));
  }

  @Override
  public UserResponse getCurrentUser() {
    return UserMapper.toResponse(getCurrentUserEntity());
  }

  @Override
  @Transactional
  public UserResponse createUser(CreateUserRequest request) {
    validateCreateRequest(request);

    if (userRepository.existsByEmail(request.getEmail())) {
      throw new BadRequestException("Email da ton tai");
    }

    User user = User.builder()
        .email(request.getEmail())
        .firstName(request.getFirstName())
        .lastName(request.getLastName())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(resolveRole(request.getRole()))
        .status("ACTIVE")
        .createdAt(LocalDateTime.now())
        .updatedAt(LocalDateTime.now())
        .build();

    applyCompany(user, request);
    return UserMapper.toResponse(userRepository.save(user));
  }

  @Override
  @Transactional
  public UserResponse updateUser(Long id, CreateUserRequest request) {
    if (request == null) {
      throw new BadRequestException("Du lieu cap nhat khong hop le");
    }

    User user = findUserById(id);

    if (!isBlank(request.getEmail())
        && !request.getEmail().equalsIgnoreCase(user.getEmail())
        && userRepository.existsByEmail(request.getEmail())) {
      throw new BadRequestException("Email da ton tai");
    }

    if (!isBlank(request.getEmail())) {
      user.setEmail(request.getEmail());
    }
    if (!isBlank(request.getFirstName())) {
      user.setFirstName(request.getFirstName());
    }
    if (!isBlank(request.getLastName())) {
      user.setLastName(request.getLastName());
    }
    if (!isBlank(request.getPassword())) {
      user.setPassword(passwordEncoder.encode(request.getPassword()));
    }
    if (!isBlank(request.getRole())) {
      user.setRole(resolveRole(request.getRole()));
    }

    applyCompany(user, request);
    user.setUpdatedAt(LocalDateTime.now());

    return UserMapper.toResponse(userRepository.save(user));
  }

  @Override
  @Transactional
  public void deleteUser(Long id) {
    User currentUser = getCurrentUserEntity();
    if (currentUser.getId().equals(id)) {
      throw new BadRequestException("Khong the tu xoa chinh minh");
    }

    User user = findUserById(id);
    userRepository.delete(user);
  }

  @Override
  public Long countUsers() {
    return userRepository.count();
  }

  private User getCurrentUserEntity() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !(authentication.getPrincipal() instanceof AuthUser authUser)) {
      throw new UnauthorizedException("Ban chua dang nhap");
    }

    return userRepository.findById(authUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user hien tai"));
  }

  private User findUserById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user voi id: " + id));
  }

  private void validateCreateRequest(CreateUserRequest request) {
    if (request == null) {
      throw new BadRequestException("Request khong hop le");
    }
    if (isBlank(request.getEmail()) || isBlank(request.getPassword())) {
      throw new BadRequestException("Email va password khong duoc de trong");
    }
  }

  private UserRole resolveRole(String role) {
    if (isBlank(role)) {
      return UserRole.CANDIDATE;
    }
    try {
      return UserRole.valueOf(role.trim().toUpperCase());
    } catch (IllegalArgumentException ex) {
      throw new BadRequestException("Role khong hop le");
    }
  }

  private void applyCompany(User user, CreateUserRequest request) {
    if (user.getRole() == UserRole.RECRUITER) {
      if (request.getCompanyId() == null) {
        throw new BadRequestException("Recruiter phai co company");
      }

      Company company = companyRepository.findById(request.getCompanyId())
          .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay company voi id: " + request.getCompanyId()));
      user.setCompany(company);
      return;
    }

    if (request.getCompanyId() != null) {
      throw new BadRequestException("Chi recruiter moi duoc gan company");
    }

    user.setCompany(null);
  }

  private boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }
}
