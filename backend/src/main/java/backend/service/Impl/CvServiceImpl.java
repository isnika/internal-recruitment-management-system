package backend.service.Impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import backend.DTO.Cv.CvResponse;
import backend.entity.Cv;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.exception.UnauthorizedException;
import backend.mapper.CvMapper;
import backend.repository.CvRepository;
import backend.repository.UserRepository;
import backend.security.AuthUser;
import backend.service.CvService;
import backend.service.FileStorageService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CvServiceImpl implements CvService {

  private static final Set<String> ALLOWED_EXTENSIONS = Set.of("pdf", "doc", "docx");

  private final CvRepository cvRepository;
  private final UserRepository userRepository;
  private final FileStorageService fileStorageService;

  @Override
  @Transactional
  public CvResponse uploadCv(MultipartFile file) {
    validateFile(file);

    User currentUser = getCurrentAuthenticatedUser();
    FileStorageService.UploadResult uploadResult = fileStorageService.uploadCv(file);

    Cv cv = Cv.builder()
        .fileUrl(uploadResult.fileUrl())
        .storagePublicId(uploadResult.publicId())
        .storageResourceType(uploadResult.resourceType())
        .createdAt(LocalDateTime.now())
        .user(currentUser)
        .build();

    return CvMapper.toResponse(cvRepository.save(cv));
  }

  @Override
  public List<CvResponse> getMyCvs() {
    User currentUser = getCurrentAuthenticatedUser();

    return cvRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId())
        .stream()
        .map(CvMapper::toResponse)
        .toList();
  }

  @Override
  @Transactional
  public void deleteMyCv(Long cvId) {
    if (cvId == null) {
      throw new BadRequestException("Cv id khong hop le");
    }

    User currentUser = getCurrentAuthenticatedUser();
    Cv cv = cvRepository.findByIdAndUserId(cvId, currentUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay CV cua ban"));

    fileStorageService.deleteCv(cv.getStoragePublicId(), cv.getStorageResourceType());
    cvRepository.delete(cv);
  }

  private void validateFile(MultipartFile file) {
    if (file == null || file.isEmpty()) {
      throw new BadRequestException("File CV khong duoc de trong");
    }

    String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
    String fileExtension = getFileExtension(originalFilename);
    if (!ALLOWED_EXTENSIONS.contains(fileExtension)) {
      throw new BadRequestException("Chi ho tro file pdf, doc, docx");
    }
  }

  private String getFileExtension(String filename) {
    if (!StringUtils.hasText(filename) || !filename.contains(".")) {
      throw new BadRequestException("Ten file khong hop le");
    }

    return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
  }

  private User getCurrentAuthenticatedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !(authentication.getPrincipal() instanceof AuthUser authUser)) {
      throw new UnauthorizedException("Ban chua dang nhap");
    }

    return userRepository.findById(authUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user hien tai"));
  }
}
