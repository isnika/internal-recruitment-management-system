package backend.service.Impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.DTO.auth.AuthResponse;
import backend.DTO.auth.ForgotPasswordRequest;
import backend.DTO.auth.LoginRequest;
import backend.DTO.user.CreatUserRequest;
import backend.DTO.user.UserResponse;
import backend.Enum.UserRole;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.exception.UnauthorizedException;
import backend.mapper.UserMapper;
import backend.repository.UserRepository;
import backend.security.AuthUser;
import backend.security.JwtUtil;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;
  private final ObjectProvider<JavaMailSender> mailSenderProvider;

  @Override
  @Transactional
  public AuthResponse register(CreatUserRequest request) {
    validateCreateRequest(request);

    if (userRepository.existsByEmail(request.getEmail())) {
      throw new BadRequestException("Email da ton tai");
    }

    User user = UserMapper.toEntity(request);
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(resolveRole(request.getRole()));
    user.setStatus("ACTIVE");
    user.setCreatedAt(LocalDateTime.now());
    user.setUpdatedAt(LocalDateTime.now());

    User savedUser = userRepository.save(user);
    String token = jwtUtil.generateToken(AuthUser.fromUser(savedUser));

    return UserMapper.toAuthResponse(savedUser, token);
  }

  @Override
  public AuthResponse login(LoginRequest request) {
    if (request == null || isBlank(request.getEmail()) || isBlank(request.getPassword())) {
      throw new BadRequestException("Email va password khong duoc de trong");
    }

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

    AuthUser authUser = (AuthUser) authentication.getPrincipal();
    User user = userRepository.findByEmail(authUser.getEmail())
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user"));

    String token = jwtUtil.generateToken(authUser);
    return UserMapper.toAuthResponse(user, token);
  }

  @Override
  @Transactional
  public String forgotPassword(ForgotPasswordRequest request) {
    if (request == null || isBlank(request.getEmail())) {
      throw new BadRequestException("Email khong duoc de trong");
    }

    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user voi email: " + request.getEmail()));

    String temporaryPassword = generateTemporaryPassword();
    user.setPassword(passwordEncoder.encode(temporaryPassword));
    user.setUpdatedAt(LocalDateTime.now());
    userRepository.save(user);

    sendTemporaryPasswordEmail(user.getEmail(), temporaryPassword);
    return "Mat khau tam thoi da duoc cap lai. Vui long kiem tra email.";
  }

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
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !(authentication.getPrincipal() instanceof AuthUser authUser)) {
      throw new UnauthorizedException("Ban chua dang nhap");
    }

    User user = userRepository.findById(authUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user hien tai"));

    return UserMapper.toResponse(user);
  }

  @Override
  @Transactional
  public UserResponse createUser(CreatUserRequest request) {
    validateCreateRequest(request);

    if (userRepository.existsByEmail(request.getEmail())) {
      throw new BadRequestException("Email da ton tai");
    }

    User user = UserMapper.toEntity(request);
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(resolveRole(request.getRole()));
    user.setStatus("ACTIVE");
    user.setCreatedAt(LocalDateTime.now());
    user.setUpdatedAt(LocalDateTime.now());

    return UserMapper.toResponse(userRepository.save(user));
  }

  @Override
  @Transactional
  public UserResponse updateUser(Long id, CreatUserRequest request) {
    User user = findUserById(id);

    if (request == null) {
      throw new BadRequestException("Du lieu cap nhat khong hop le");
    }

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

    user.setUpdatedAt(LocalDateTime.now());
    return UserMapper.toResponse(userRepository.save(user));
  }

  @Override
  @Transactional
  public void deleteUser(Long id) {
    User user = findUserById(id);
    userRepository.delete(user);
  }

  private User findUserById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user voi id: " + id));
  }

  private void validateCreateRequest(CreatUserRequest request) {
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

  private String generateTemporaryPassword() {
    return "TMP-" + UUID.randomUUID().toString().replace("-", "").substring(0, 8);
  }

  private void sendTemporaryPasswordEmail(String email, String temporaryPassword) {
    JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
    if (mailSender == null) {
      return;
    }

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(email);
    message.setSubject("Reset mat khau");
    message.setText("Mat khau tam thoi cua ban la: " + temporaryPassword);
    mailSender.send(message);
  }

  private boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }
}
