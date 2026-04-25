package backend.service.Impl;

import backend.DTO.ApiResponse;
import backend.DTO.auth.*;
import backend.DTO.user.CreateUserRequest;
import backend.Enum.UserRole;
import backend.entity.*;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.exception.UnauthorizedException;
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
import backend.mapper.UserMapper;
import backend.DTO.user.UserResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final Map<String, Integer> loginAttempts = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> lockTimeMap = new ConcurrentHashMap<>();

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final CandidateProfileRepository candidateProfileRepository;

    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtUtil jwtUtil;

    // ================= VALIDATE =================

    private void validateEmail(String email) {
        if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new BadRequestException("Email không hợp lệ");
        }
    }

    private void validatePassword(String password) {
        if (password == null ||
                password.length() < 8 ||
                !password.matches(".*[A-Za-z].*") ||
                !password.matches(".*[0-9].*")) {
            throw new BadRequestException("Mật khẩu phải ≥ 8 ký tự, gồm chữ và số");
        }
    }

    // ================= OTP =================

    @Override
    @Transactional
    public SendOtpResponse sendVerificationCode(String email) {

        validateEmail(email);

        String code = generateOtp();

        verificationCodeRepository.deleteByEmail(email);

        verificationCodeRepository.save(
                VerificationCode.builder()
                        .email(email)
                        .code(code)
                        .expireAt(LocalDateTime.now().plusMinutes(5))
                        .attempts(0)
                        .build()
        );

        emailService.sendSimpleMail(email, "OTP đăng ký", "Mã OTP: " + code);

        return SendOtpResponse.builder()
                .status(200)
                .message("OK")
                .email(email)
                .build();
    }

    private String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }

    // ================= REGISTER =================

    @Override
    @Transactional
    public RegisterResponse register(VerifyRegisterRequest request) {

        validateEmail(request.getEmail());
        validatePassword(request.getPassword());

        UserRole role;
        try {
            role = UserRole.valueOf(request.getRole().name().toUpperCase());
        } catch (Exception e) {
            throw new BadRequestException("Role không hợp lệ");
        }

        if (role != UserRole.CANDIDATE) {
            throw new BadRequestException("Chỉ được đăng ký tài khoản CANDIDATE");
        }

        VerificationCode vc = verificationCodeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy OTP"));

        if (vc.getExpireAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP hết hạn");
        }

        if (!vc.getCode().equals(request.getCode())) {
            throw new BadRequestException("OTP sai");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email đã tồn tại");
        }

        User user = UserMapper.toEntity(CreateUserRequest.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(request.getRole().name())
                .build());

        user.setStatus("ACTIVE");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        candidateProfileRepository.save(
                CandidateProfile.builder().user(user).build()
        );

        verificationCodeRepository.deleteByEmail(request.getEmail());

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .status(user.getStatus())
                .build();

        return RegisterResponse.builder()
                .status(201)
                .message("Register successfully")
                .user(userResponse)
                .build();
    }

    // ================= LOGIN =================

    @Override
    public AuthResponse login(LoginRequest request) {

        validateEmail(request.getEmail());

        String email = request.getEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Email không tồn tại"));

        if (lockTimeMap.containsKey(email)) {
            if (lockTimeMap.get(email).isAfter(LocalDateTime.now())) {
                throw new BadRequestException("Tài khoản bị khóa tạm thời");
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

            throw new BadRequestException("Sai mật khẩu");
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

    // ================= LOGOUT =================

    @Override
    public ApiResponse<String> logout() {

        SecurityContextHolder.clearContext();

        return ApiResponse.<String>builder()
                .status(200)
                .message("OK")
                .data("Logout success")
                .build();
    }

    // ================= FORGOT PASSWORD =================

    @Override
    @Transactional
    public ForgotPasswordResponse sendForgotPasswordCode(String email) {

        validateEmail(email);

        if (!userRepository.existsByEmail(email)) {
            throw new ResourceNotFoundException("Email không tồn tại");
        }

        String code = generateOtp();

        verificationCodeRepository.deleteByEmail(email);

        verificationCodeRepository.save(
                VerificationCode.builder()
                        .email(email)
                        .code(code)
                        .expireAt(LocalDateTime.now().plusMinutes(5))
                        .attempts(0)
                        .build()
        );

        emailService.sendSimpleMail(email, "OTP reset password", "Mã OTP: " + code);

        return ForgotPasswordResponse.builder()
                .status(200)
                .message("Đã gửi OTP")
                .build();
    }

    @Override
    @Transactional
    public ResetPasswordResponse resetPassword(ForgotPassword.ResetPasswordRequest request) {

        validatePassword(request.getNewPassword());

        VerificationCode vc = verificationCodeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy OTP"));

        if (vc.getExpireAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP hết hạn");
        }

        if (!vc.getCode().equals(request.getCode())) {
            throw new BadRequestException("OTP sai");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Email không tồn tại"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        verificationCodeRepository.deleteByEmail(request.getEmail());

        return ResetPasswordResponse.builder()
                .status(200)
                .message("Đổi mật khẩu thành công")
                .build();
    }

    // ================= USER =================

    public ApiResponse<List<User>> getAllUsers() {

        if (getCurrentUser().getRole() != UserRole.ADMIN) {
            throw new UnauthorizedException("Không có quyền");
        }

        List<User> users = userRepository.findAll();

        return ApiResponse.<List<User>>builder()
                .status(200)
                .message("Lấy danh sách user thành công")
                .data(users)
                .build();
    }

    public ApiResponse<User> getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user"));

        return ApiResponse.<User>builder()
                .status(200)
                .message("Lấy user thành công")
                .data(user)
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<String> createUser(CreateUserRequest request) {

        if (getCurrentUser().getRole() != UserRole.ADMIN) {
            throw new UnauthorizedException("Chỉ ADMIN");
        }

        validateEmail(request.getEmail());
        validatePassword(request.getPassword());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email đã tồn tại");
        }

        UserRole role = UserRole.valueOf(request.getRole().toUpperCase());

        if (role == UserRole.ADMIN) {
            throw new BadRequestException("Không được tạo ADMIN");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(role)
                .status("ACTIVE")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        if (role == UserRole.RECRUITER) {
            Company company = companyRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Company không tồn tại"));

            user.setCompany(company);
        }

        userRepository.save(user);

        return ApiResponse.<String>builder()
                .status(201)
                .message("Tạo user thành công")
                .data(null)
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<String> updateUser(Long id, CreateUserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user"));

        if (request.getPassword() != null) {
            validatePassword(request.getPassword());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        userRepository.save(user);

        return ApiResponse.<String>builder()
                .status(200)
                .message("Cập nhật user thành công")
                .data(null)
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<String> deleteUser(Long id) {

        if (getCurrentUser().getId().equals(id)) {
            throw new BadRequestException("Không thể tự xoá");
        }

        userRepository.deleteById(id);

        return ApiResponse.<String>builder()
                .status(200)
                .message("Xoá user thành công")
                .data(null)
                .build();
    }

    @Override
    public ApiResponse<Long> countUsers() {

        if (getCurrentUser().getRole() != UserRole.ADMIN) {
            throw new UnauthorizedException("Không có quyền");
        }

        long count = userRepository.count();

        return ApiResponse.<Long>builder()
                .status(200)
                .message("Đếm số lượng user thành công")
                .data(count)
                .build();
    }

    // ================= CURRENT USER =================

    private User getCurrentUser() {

        Object principal = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (!(principal instanceof AuthUser authUser)) {
            throw new UnauthorizedException("Chưa đăng nhập");
        }

        return userRepository.findById(authUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User không tồn tại"));
    }
}