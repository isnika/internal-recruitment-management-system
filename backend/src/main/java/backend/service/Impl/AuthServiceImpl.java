package backend.service.Impl;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.DTO.auth.ForgotPassword;
import backend.DTO.auth.LoginRequest;
import backend.DTO.auth.LoginResponse;
import backend.DTO.auth.VerifyRegisterRequest;
import backend.Enum.UserRole;
import backend.entity.CandidateProfile;
import backend.entity.User;
import backend.entity.VerificationCode;
import backend.repository.CandidateProfileRepository;
import backend.repository.UserRepository;
import backend.repository.VerificationCodeRepository;
import backend.security.AuthUser;
import backend.security.JwtUtil;
import backend.service.AuthService;
import backend.service.EmailService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final Map<String, Integer> loginAttempts = new ConcurrentHashMap<>();
  private final Map<String, LocalDateTime> lockTimeMap = new ConcurrentHashMap<>();

  private final UserRepository userRepository;
  private final VerificationCodeRepository verificationCodeRepository;
  private final CandidateProfileRepository candidateProfileRepository;
  private final PasswordEncoder passwordEncoder;
  private final EmailService emailService;
  private final JwtUtil jwtUtil;

  @Override
  @Transactional
  public String sendVerificationCode(String email) {
    validateEmail(email);

    String code = generateVerificationCode();
    verificationCodeRepository.deleteByEmail(email);
    verificationCodeRepository.save(VerificationCode.builder()
        .email(email)
        .code(code)
        .expireAt(LocalDateTime.now().plusMinutes(5))
        .attempts(0)
        .build());

    emailService.sendSimpleMail(email, "OTP dang ky tai khoan", "Ma OTP cua ban la: " + code);
    return "OTP da duoc gui";
  }

  @Override
  @Transactional
  public String register(VerifyRegisterRequest request) {
    validateEmail(request.getEmail());
    validatePassword(request.getPassword());

    if (request.getRole() == null || request.getRole() != backend.Enum.RegisterRole.CANDIDATE) {
      throw new RuntimeException("Chi duoc dang ky tai khoan CANDIDATE");
    }

    VerificationCode verificationCode = verificationCodeRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("Khong tim thay OTP"));

    if (verificationCode.getExpireAt().isBefore(LocalDateTime.now())) {
      throw new RuntimeException("OTP het han");
    }

    if (!verificationCode.getCode().equals(request.getCode())) {
      throw new RuntimeException("OTP sai");
    }

    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email da ton tai");
    }

    User user = User.builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .firstName(request.getFirstName())
        .lastName(request.getLastName())
        .role(UserRole.CANDIDATE)
        .status("ACTIVE")
        .createdAt(LocalDateTime.now())
        .updatedAt(LocalDateTime.now())
        .build();

    userRepository.save(user);
    candidateProfileRepository.save(CandidateProfile.builder().user(user).build());
    verificationCodeRepository.deleteByEmail(request.getEmail());

    return "Dang ky thanh cong";
  }

  @Override
  @Transactional
  public LoginResponse login(LoginRequest request) {
    validateEmail(request.getEmail());
    String email = request.getEmail();

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Email khong ton tai"));

    LocalDateTime lockTime = lockTimeMap.get(email);
    if (lockTime != null) {
      if (lockTime.isAfter(LocalDateTime.now())) {
        throw new RuntimeException("Tai khoan bi khoa tam thoi");
      }
      lockTimeMap.remove(email);
      loginAttempts.remove(email);
    }

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      int attempts = loginAttempts.getOrDefault(email, 0) + 1;
      loginAttempts.put(email, attempts);

      if (attempts >= 5) {
        lockTimeMap.put(email, LocalDateTime.now().plusMinutes(15));
        loginAttempts.remove(email);
      }

      throw new RuntimeException("Sai mat khau");
    }

    loginAttempts.remove(email);
    lockTimeMap.remove(email);

    String token = jwtUtil.generateToken(AuthUser.fromUser(user));
    return LoginResponse.builder()
        .message("Dang nhap thanh cong")
        .token(token)
        .build();
  }

  @Override
  @Transactional
  public String logout() {
    SecurityContextHolder.clearContext();
    return "Dang xuat thanh cong";
  }

  @Override
  @Transactional
  public String sendForgotPasswordCode(String email) {
    validateEmail(email);

    if (!userRepository.existsByEmail(email)) {
      throw new RuntimeException("Email khong ton tai");
    }

    String code = generateVerificationCode();
    verificationCodeRepository.deleteByEmail(email);
    verificationCodeRepository.save(VerificationCode.builder()
        .email(email)
        .code(code)
        .expireAt(LocalDateTime.now().plusMinutes(5))
        .attempts(0)
        .build());

    emailService.sendSimpleMail(email, "OTP dat lai mat khau", "Ma OTP: " + code);
    return "Da gui OTP";
  }

  @Override
  @Transactional
  public String resetPassword(ForgotPassword.ResetPasswordRequest request) {
    validatePassword(request.getNewPassword());

    VerificationCode verificationCode = verificationCodeRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("Khong tim thay OTP"));

    if (verificationCode.getExpireAt().isBefore(LocalDateTime.now())) {
      throw new RuntimeException("OTP het han");
    }

    if (!verificationCode.getCode().equals(request.getCode())) {
      throw new RuntimeException("OTP sai");
    }

    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("Email khong ton tai"));

    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    user.setUpdatedAt(LocalDateTime.now());
    userRepository.save(user);
    verificationCodeRepository.deleteByEmail(request.getEmail());

    return "Doi mat khau thanh cong";
  }

  private String generateVerificationCode() {
    return String.valueOf(100000 + new Random().nextInt(900000));
  }

  private void validateEmail(String email) {
    if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
      throw new RuntimeException("Email khong hop le");
    }
  }

  private void validatePassword(String password) {
    if (password == null
        || password.length() < 8
        || !password.matches(".*[A-Za-z].*")
        || !password.matches(".*[0-9].*")) {
      throw new RuntimeException("Mat khau phai >= 8 ky tu, gom chu va so");
    }
  }
}
