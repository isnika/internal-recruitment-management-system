package backend.service.Impl;

import java.util.List;
import java.util.Set;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import backend.DTO.candidateProdile.CandidateProfileResponse;
import backend.DTO.candidateProdile.CreateCandidateProfileRquest;
import backend.entity.CandidateProfile;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.exception.UnauthorizedException;
import backend.mapper.CandidateProfileMapper;
import backend.repository.CandidateProfileRepository;
import backend.repository.UserRepository;
import backend.security.AuthUser;
import backend.service.CandidateProfileService;
import backend.service.FileStorageService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CandidateProfileServiceImpl implements CandidateProfileService {

  private static final Set<String> ALLOWED_IMAGE_EXTENSIONS = Set.of("jpg", "jpeg", "png", "webp");

  private final CandidateProfileRepository candidateProfileRepository;
  private final UserRepository userRepository;
  private final FileStorageService fileStorageService;

  @Override
  @Transactional
  public CandidateProfileResponse createProfile(CreateCandidateProfileRquest request) {
    validateRequest(request);

    User currentUser = getCurrentAuthenticatedUser();
    if (candidateProfileRepository.existsByUserId(currentUser.getId())) {
      throw new BadRequestException("Ho so ca nhan da ton tai");
    }

    CandidateProfile profile = CandidateProfileMapper.toEntity(request, currentUser);
    return CandidateProfileMapper.toResponse(candidateProfileRepository.save(profile));
  }

  @Override
  public CandidateProfileResponse getMyProfile() {
    User currentUser = getCurrentAuthenticatedUser();
    CandidateProfile profile = candidateProfileRepository.findByUserId(currentUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Ban chua tao ho so ca nhan"));

    return CandidateProfileMapper.toResponse(profile);
  }

  @Override
  public CandidateProfileResponse getProfileById(Long userId) {
    if (userId == null) {
      throw new BadRequestException("User id khong hop le");
    }

    CandidateProfile profile = candidateProfileRepository.findByUserId(userId)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay ho so ung vien voi user id: " + userId));

    return CandidateProfileMapper.toResponse(profile);
  }

  @Override
  @Transactional
  public CandidateProfileResponse updateMyProfile(CreateCandidateProfileRquest request) {
    validateRequest(request);

    User currentUser = getCurrentAuthenticatedUser();
    CandidateProfile profile = candidateProfileRepository.findByUserId(currentUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Ban chua tao ho so ca nhan"));

    CandidateProfileMapper.updateEntity(profile, request);
    return CandidateProfileMapper.toResponse(candidateProfileRepository.save(profile));
  }

  @Override
  @Transactional
  public CandidateProfileResponse updateMyAvatar(MultipartFile file) {
    validateAvatarFile(file);

    User currentUser = getCurrentAuthenticatedUser();
    CandidateProfile profile = candidateProfileRepository.findByUserId(currentUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Ban chua tao ho so ca nhan"));

    FileStorageService.UploadResult uploadResult = fileStorageService.uploadCandidateAvatar(file);

    fileStorageService.deleteCandidateAvatar(currentUser.getAvatarStoragePublicId(), currentUser.getAvatarStorageResourceType());
    currentUser.setAvatarUrl(uploadResult.fileUrl());
    currentUser.setAvatarStoragePublicId(uploadResult.publicId());
    currentUser.setAvatarStorageResourceType(uploadResult.resourceType());
    userRepository.save(currentUser);

    return CandidateProfileMapper.toResponse(profile);
  }

  @Override
  public List<CandidateProfileResponse> getAllProfiles() {
    return candidateProfileRepository.findAll()
        .stream()
        .map(CandidateProfileMapper::toResponse)
        .toList();
  }

  private User getCurrentAuthenticatedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !(authentication.getPrincipal() instanceof AuthUser authUser)) {
      throw new UnauthorizedException("Ban chua dang nhap");
    }

    return userRepository.findById(authUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user hien tai"));
  }

  private void validateRequest(CreateCandidateProfileRquest request) {
    if (request == null) {
      throw new BadRequestException("Request khong hop le");
    }
    if (isBlank(request.getGender()) || isBlank(request.getPhone()) || isBlank(request.getAddress())) {
      throw new BadRequestException("Gender, phone va address khong duoc de trong");
    }
  }

  private void validateAvatarFile(MultipartFile file) {
    if (file == null || file.isEmpty()) {
      throw new BadRequestException("Anh dai dien khong duoc de trong");
    }

    String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
    String fileExtension = getFileExtension(originalFilename);
    if (!ALLOWED_IMAGE_EXTENSIONS.contains(fileExtension)) {
      throw new BadRequestException("Chi ho tro file jpg, jpeg, png, webp");
    }
  }

  private String getFileExtension(String filename) {
    if (!StringUtils.hasText(filename) || !filename.contains(".")) {
      throw new BadRequestException("Ten file khong hop le");
    }

    return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
  }

  private boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }
}
