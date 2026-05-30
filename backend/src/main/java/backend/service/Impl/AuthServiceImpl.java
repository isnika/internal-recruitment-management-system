package backend.service.Impl;

import backend.DTO.ApiResponse;
import backend.DTO.auth.*;
import backend.DTO.user.UpdateProfileRequest;
import backend.DTO.user.UpdateRecruitmentInfoRequest;
import backend.DTO.user.UserResponse;
import backend.Enum.RegisterRole;
import backend.Enum.UserRole;
import backend.Enum.UserStatus;
import backend.config.GoogleTokenVerifier;
import backend.entity.CandidateProfile;
import backend.entity.Company;
import backend.entity.User;
import backend.entity.VerificationCode;
import backend.exception.BadRequestException;
import backend.mapper.UserMapper;
import backend.repository.CandidateProfileRepository;
import backend.repository.CompanyRepository;
import backend.repository.UserRepository;
import backend.repository.VerificationCodeRepository;
import backend.security.AuthUser;
import backend.security.JwtUtil;
import backend.service.AuthService;
import backend.service.EmailService;
import backend.service.FileStorageService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final Map<String, Integer>       loginAttempts = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> lockTimeMap   = new ConcurrentHashMap<>();

    private final UserRepository              userRepository;
    private final VerificationCodeRepository  verificationCodeRepository;
    private final CandidateProfileRepository  candidateProfileRepository;
    private final CompanyRepository           companyRepository;
    private final PasswordEncoder             passwordEncoder;
    private final EmailService                emailService;
    private final JwtUtil                     jwtUtil;
    private final FileStorageService          fileStorageService;
    private final GoogleTokenVerifier         googleTokenVerifier;

    // ══════════════════════════════════════════════════════════════
    // SEND OTP
    // ══════════════════════════════════════════════════════════════
    @Override
    @Transactional
    public SendOtpResponse sendVerificationCode(String email) {
        validateEmail(email);
        String code = generateVerificationCode();
        verificationCodeRepository.deleteByEmail(email);
        verificationCodeRepository.save(VerificationCode.builder()
                .email(email).code(code)
                .expireAt(LocalDateTime.now().plusMinutes(5))
                .attempts(0).build());
        emailService.sendSimpleMail(email, "OTP dang ky tai khoan", "Ma OTP: " + code);
        return SendOtpResponse.builder().status(200).message("OK").email(email).build();
    }

    // ══════════════════════════════════════════════════════════════
    // REGISTER
    // ══════════════════════════════════════════════════════════════
    @Override
    @Transactional
    public RegisterResponse register(VerifyRegisterRequest request) {
        validateEmail(request.getEmail());
        validatePassword(request.getPassword());

        // Validate confirmPassword đồng bộ với frontend
        if (request.getConfirmPassword() == null || !request.getConfirmPassword().equals(request.getPassword())) {
            throw new BadRequestException("Mat khau xac nhan khong khop");
        }

        // Mặc định role là CANDIDATE nếu frontend không gửi
        if (request.getRole() == null) {
            request.setRole(RegisterRole.CANDIDATE);
        }
        if (request.getRole() != RegisterRole.CANDIDATE) {
            throw new BadRequestException("Chi duoc dang ky tai khoan CANDIDATE");
        }

        VerificationCode vc = verificationCodeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Khong tim thay OTP"));
        if (vc.getExpireAt().isBefore(LocalDateTime.now())) throw new BadRequestException("OTP het han");
        if (!vc.getCode().equals(request.getCode()))        throw new BadRequestException("OTP sai");
        if (userRepository.existsByEmail(request.getEmail())) throw new BadRequestException("Email da ton tai");

        User user = userRepository.save(User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .gender(request.getGender())
                .dateOfBirth(request.getDateOfBirth())
                .role(UserRole.CANDIDATE)
                .status(UserStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());

        candidateProfileRepository.save(CandidateProfile.builder().user(user).build());
        verificationCodeRepository.deleteByEmail(request.getEmail());

        return RegisterResponse.builder().status(201).message("Register successfully")
                .user(toUserResponse(user)).build();
    }

    // ══════════════════════════════════════════════════════════════
    // LOGIN (email + password)
    // ══════════════════════════════════════════════════════════════
    @Override
    @Transactional
    public AuthResponse login(LoginRequest request) {
        validateEmail(request.getEmail());
        String email = request.getEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Email khong ton tai"));

        // Kiem tra tai khoan bi khoa
        if (user.getStatus() == UserStatus.BLOCKED) {
            throw new BadRequestException("Tai khoan da bi khoa");
        }

        // Kiem tra khoa tam thoi
        LocalDateTime lockTime = lockTimeMap.get(email);
        if (lockTime != null) {
            if (lockTime.isAfter(LocalDateTime.now())) throw new BadRequestException("Tai khoan bi khoa tam thoi");
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

        return AuthResponse.builder()
                .status(200).message("Login successfully")
                .token(jwtUtil.generateToken(AuthUser.fromUser(user)))
                .userId(user.getId()).email(user.getEmail())
                .role(user.getRole().name()).build();
    }

    // ══════════════════════════════════════════════════════════════
    // LOGIN WITH GOOGLE
    // ══════════════════════════════════════════════════════════════
    @Override
    @Transactional
    public AuthResponse loginWithGoogle(GoogleLoginRequest request) {
        if (request.getIdToken() == null || request.getIdToken().isBlank()) {
            throw new BadRequestException("idToken khong duoc de trong");
        }

        // Xac minh token voi Google
        GoogleIdToken.Payload payload = googleTokenVerifier.verify(request.getIdToken());
        if (payload == null) {
            throw new BadRequestException("Google token khong hop le hoac da het han");
        }

        String email     = payload.getEmail();
        String firstName = (String) payload.get("given_name");
        String lastName  = (String) payload.get("family_name");
        String avatar    = (String) payload.get("picture");

        // Tim hoac tao user
        Optional<User> existing = userRepository.findByEmail(email);
        User user;

        if (existing.isPresent()) {
            user = existing.get();
            // Kiem tra tai khoan bi khoa
            if (user.getStatus() == UserStatus.BLOCKED) {
                throw new BadRequestException("Tai khoan da bi khoa");
            }
            // Cap nhat avatar neu thay doi
            if (avatar != null && !avatar.equals(user.getAvatarUrl())) {
                user.setAvatarUrl(avatar);
                user.setUpdatedAt(LocalDateTime.now());
                userRepository.save(user);
            }
        } else {
            // Tao tai khoan moi tu Google
            user = userRepository.save(User.builder()
                    .email(email)
                    .password(null)       // Khong co password vi dang nhap Google
                    .firstName(firstName != null ? firstName : "")
                    .lastName(lastName   != null ? lastName  : "")
                    .avatarUrl(avatar)
                    .role(UserRole.CANDIDATE)
                    .status(UserStatus.ACTIVE)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build());

            // Tao profile mac dinh cho candidate moi
            candidateProfileRepository.save(CandidateProfile.builder().user(user).build());
        }

        String token = jwtUtil.generateToken(AuthUser.fromUser(user));

        return AuthResponse.builder()
                .status(200)
                .message("Login with Google successfully")
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    @Override
    public ApiResponse<String> logout() {
        SecurityContextHolder.clearContext();
        return ApiResponse.<String>builder().status(200).message("OK").data("Logout success").build();
    }

    @Override
    @Transactional
    public ForgotPasswordResponse sendForgotPasswordCode(String email) {
        validateEmail(email);
        if (!userRepository.existsByEmail(email)) throw new BadRequestException("Email khong ton tai");
        String code = generateVerificationCode();
        verificationCodeRepository.deleteByEmail(email);
        verificationCodeRepository.save(VerificationCode.builder()
                .email(email).code(code)
                .expireAt(LocalDateTime.now().plusMinutes(5))
                .attempts(0).build());
        emailService.sendSimpleMail(email, "OTP dat lai mat khau", "Ma OTP: " + code);
        return ForgotPasswordResponse.builder().status(200).message("Da gui OTP").build();
    }

    @Override
    @Transactional
    public ResetPasswordResponse resetPassword(ForgotPassword.ResetPasswordRequest request) {
        validatePassword(request.getNewPassword());
        VerificationCode vc = verificationCodeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Khong tim thay OTP"));
        if (vc.getExpireAt().isBefore(LocalDateTime.now())) throw new BadRequestException("OTP het han");
        if (!vc.getCode().equals(request.getCode()))        throw new BadRequestException("OTP sai");
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Email khong ton tai"));
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        verificationCodeRepository.deleteByEmail(request.getEmail());
        return ResetPasswordResponse.builder().status(200).message("Doi mat khau thanh cong").build();
    }

    // ── Helpers ───────────────────────────────────────────────────
    private User getCurrentUserEntity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof AuthUser authUser)) {
            throw new BadRequestException("Ban chua dang nhap");
        }
        return userRepository.findById(authUser.getId())
                .orElseThrow(() -> new BadRequestException("Khong tim thay user"));
    }

    private UserResponse toUserResponse(User user) {
        return UserMapper.toResponse(user);
    }

    private String generateVerificationCode() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }

    private void validateEmail(String email) {
        if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"))
            throw new BadRequestException("Email khong hop le");
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 8
                || !password.matches(".*[A-Za-z].*")
                || !password.matches(".*[0-9].*"))
            throw new BadRequestException("Mat khau phai >= 8 ky tu, gom chu va so");
    }
}