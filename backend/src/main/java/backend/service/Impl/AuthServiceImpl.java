package backend.service.Impl;

import backend.DTO.ApiResponse;
import backend.DTO.auth.*;
import backend.DTO.user.UserResponse;
import backend.Enum.RegisterRole;
import backend.Enum.UserRole;
import backend.entity.*;
import backend.exception.BadRequestException;
import backend.repository.*;
import backend.security.AuthUser;
import backend.security.JwtUtil;
import backend.service.AuthService;
import backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

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
    public SendOtpResponse sendVerificationCode(String email) {
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

        return SendOtpResponse.builder()
                .status(200)
                .message("OK")
                .email(email)
                .build();
    }

    @Override
    @Transactional
    public RegisterResponse register(VerifyRegisterRequest request) {
        validateEmail(request.getEmail());
        validatePassword(request.getPassword());

        if (request.getRole() == null || request.getRole() != RegisterRole.CANDIDATE) {
            throw new BadRequestException("Chi duoc dang ky tai khoan CANDIDATE");
        }

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Khong tim thay OTP"));

        if (verificationCode.getExpireAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP het han");
        }

        if (!verificationCode.getCode().equals(request.getCode())) {
            throw new BadRequestException("OTP sai");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email da ton tai");
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

        return RegisterResponse.builder()
                .status(201)
                .message("Register successfully")
                .user(toUserResponse(user))
                .build();
    }

    @Override
    @Transactional
    public AuthResponse login(LoginRequest request) {
        validateEmail(request.getEmail());

        String email = request.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Email khong ton tai"));

        LocalDateTime lockTime = lockTimeMap.get(email);
        if (lockTime != null) {
            if (lockTime.isAfter(LocalDateTime.now())) {
                throw new BadRequestException("Tai khoan bi khoa tam thoi");
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

            throw new BadRequestException("Sai mat khau");
        }

        loginAttempts.remove(email);
        lockTimeMap.remove(email);

        String token = jwtUtil.generateToken(AuthUser.fromUser(user));

        return AuthResponse.builder()
                .status(200)
                .message("Login successfully")
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    @Override
    public ApiResponse<String> logout() {
        SecurityContextHolder.clearContext();

        return ApiResponse.<String>builder()
                .status(200)
                .message("OK")
                .data("Logout success")
                .build();
    }

    @Override
    @Transactional
    public ForgotPasswordResponse sendForgotPasswordCode(String email) {
        validateEmail(email);

        if (!userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email khong ton tai");
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

        return ForgotPasswordResponse.builder()
                .status(200)
                .message("Da gui OTP")
                .build();
    }

    @Override
    @Transactional
    public ResetPasswordResponse resetPassword(ForgotPassword.ResetPasswordRequest request) {
        validatePassword(request.getNewPassword());

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Khong tim thay OTP"));

        if (verificationCode.getExpireAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP het han");
        }

        if (!verificationCode.getCode().equals(request.getCode())) {
            throw new BadRequestException("OTP sai");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Email khong ton tai"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        verificationCodeRepository.deleteByEmail(request.getEmail());

        return ResetPasswordResponse.builder()
                .status(200)
                .message("Doi mat khau thanh cong")
                .build();
    }

    private UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole().name())
                .status(user.getStatus())
                .build();
    }

    private String generateVerificationCode() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }

    private void validateEmail(String email) {
        if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new BadRequestException("Email khong hop le");
        }
    }

    private void validatePassword(String password) {
        if (password == null
                || password.length() < 8
                || !password.matches(".*[A-Za-z].*")
                || !password.matches(".*[0-9].*")) {
            throw new BadRequestException("Mat khau phai >= 8 ky tu, gom chu va so");
        }
    }
}
