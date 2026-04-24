package backend.service.Impl;

import backend.DTO.auth.*;
import backend.DTO.user.CreateUserRequest;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import backend.entity.Company;
import backend.repository.CompanyRepository;

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
            throw new RuntimeException("Email không hợp lệ");
        }
    }

    private void validatePassword(String password) {
        if (password == null ||
                password.length() < 8 ||
                !password.matches(".*[A-Za-z].*") ||
                !password.matches(".*[0-9].*")) {
            throw new RuntimeException("Mật khẩu phải ≥ 8 ký tự, gồm chữ và số");
        }
    }

    // ================= SEND OTP =================

    @Override
    @Transactional
    public String sendVerificationCode(String email) {

        validateEmail(email);

        String code = String.valueOf(100000 + new Random().nextInt(900000));

        verificationCodeRepository.deleteByEmail(email);

        verificationCodeRepository.save(
                VerificationCode.builder()
                        .email(email)
                        .code(code)
                        .expireAt(LocalDateTime.now().plusMinutes(5))
                        .attempts(0)
                        .build()
        );

        emailService.sendSimpleMail(
                email,
                "OTP đăng ký tài khoản",
                "Mã OTP của bạn là: " + code
        );

        return "OTP đã được gửi";
    }

    // ================= REGISTER =================

    @Override
    @Transactional
    public String register(VerifyRegisterRequest request) {

        validateEmail(request.getEmail());
        validatePassword(request.getPassword());

        if (!request.getRole().name().equalsIgnoreCase("CANDIDATE")) {
            throw new RuntimeException("Chỉ được đăng ký tài khoản CANDIDATE");
        }

        VerificationCode vc = verificationCodeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy OTP"));

        if (vc.getExpireAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP hết hạn");
        }

        if (!vc.getCode().equals(request.getCode())) {
            throw new RuntimeException("OTP sai");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        // ép role = CANDIDATE
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

        // luôn tạo profile candidate
        candidateProfileRepository.save(
                CandidateProfile.builder().user(user).build()
        );

        verificationCodeRepository.deleteByEmail(request.getEmail());

        return "Đăng ký thành công";
    }
    // ================= LOGIN =================

    @Override
    @Transactional
    public LoginResponse login(LoginRequest request) {

        validateEmail(request.getEmail());
        String email = request.getEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

        // CHECK LOCK
        if (lockTimeMap.containsKey(email)) {
            if (lockTimeMap.get(email).isAfter(LocalDateTime.now())) {
                throw new RuntimeException("Tài khoản bị khóa tạm thời");
            } else {
                lockTimeMap.remove(email);
                loginAttempts.remove(email);
            }
        }

        // Sai mật khẩu
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            int attempts = loginAttempts.getOrDefault(email, 0) + 1;
            loginAttempts.put(email, attempts);

            if (attempts >= 5) {
                lockTimeMap.put(email, LocalDateTime.now().plusMinutes(15));
                loginAttempts.remove(email);
            }

            throw new RuntimeException("Sai mật khẩu");
        }

        // Thành công
        loginAttempts.remove(email);
        lockTimeMap.remove(email);

        String token = jwtUtil.generateToken(AuthUser.fromUser(user));

        return LoginResponse.builder()
                .message("Đăng nhập thành công")
                .token(token)
                .build();
    }

    // ================= LOGOUT =================

    @Override
    @Transactional
    public String logout() {
        SecurityContextHolder.clearContext();
        return "Đăng xuất thành công";
    }

    // ================= FORGOT PASSWORD =================

    @Override
    @Transactional
    public String sendForgotPasswordCode(String email) {

        validateEmail(email);

        if (!userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email không tồn tại");
        }

        String code = String.valueOf(100000 + new Random().nextInt(900000));

        verificationCodeRepository.deleteByEmail(email);

        verificationCodeRepository.save(
                VerificationCode.builder()
                        .email(email)
                        .code(code)
                        .expireAt(LocalDateTime.now().plusMinutes(5))
                        .attempts(0)
                        .build()
        );

        emailService.sendSimpleMail(
                email,
                "OTP đặt lại mật khẩu",
                "Mã OTP: " + code
        );

        return "Đã gửi OTP";
    }

    // ================= RESET PASSWORD =================

    @Override
    @Transactional
    public String resetPassword(ForgotPassword.ResetPasswordRequest request) {

        validatePassword(request.getNewPassword());

        VerificationCode vc = verificationCodeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy OTP"));

        if (vc.getExpireAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP hết hạn");
        }

        if (!vc.getCode().equals(request.getCode())) {
            throw new RuntimeException("OTP sai");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        verificationCodeRepository.deleteByEmail(request.getEmail());

        return "Đổi mật khẩu thành công";
    }

    // ================= USER MANAGEMENT =================

    @Override
    public List<User> getAllUsers() {
        User current = getCurrentUser();

        if (current.getRole() != UserRole.ADMIN) {
            throw new RuntimeException("Không có quyền");
        }

        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));
    }

    @Override
    @Transactional
    public String createUser(CreateUserRequest request) {

        User current = getCurrentUser();

        // chỉ ADMIN
        if (current.getRole() != UserRole.ADMIN) {
            throw new RuntimeException("Chỉ ADMIN mới được tạo user");
        }

        validateEmail(request.getEmail());
        validatePassword(request.getPassword());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        UserRole role = UserRole.valueOf(request.getRole().toUpperCase());

        if (role == UserRole.ADMIN) {
            throw new RuntimeException("Không được tạo ADMIN");
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

            if (request.getCompanyId() == null) {
                throw new RuntimeException("Recruiter phải có company");
            }

            Company company = companyRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> new RuntimeException("Company không tồn tại"));

            user.setCompany(company);
        }

        userRepository.save(user);

        return "Tạo user thành công";
    }

    @Override
    @Transactional
    public String updateUser(Long id, CreateUserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        if (request.getPassword() != null) {
            validatePassword(request.getPassword());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        userRepository.save(user);

        return "Cập nhật user thành công";
    }

    @Override
    @Transactional
    public String deleteUser(Long id) {

        if (getCurrentUser().getId().equals(id)) {
            throw new RuntimeException("Không thể tự xoá chính mình");
        }

        userRepository.deleteById(id);

        return "Xoá user thành công";
    }

    // ================= CURRENT USER =================

    private User getCurrentUser() {
        AuthUser authUser = (AuthUser) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return userRepository.findById(authUser.getId())
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
    }

    public long countUsers() {
        User current = getCurrentUser();

        if (current.getRole() != UserRole.ADMIN) {
            throw new RuntimeException("Chỉ ADMIN mới được xem số lượng user");
        }

        return userRepository.count();
    }
}