package backend.service.Impl;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
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
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CvServiceImpl implements CvService {

  private static final Set<String> ALLOWED_EXTENSIONS = Set.of("pdf", "doc", "docx");

  private final CvRepository cvRepository;
  private final UserRepository userRepository;

  @Value("${file.upload-dir:uploads}")
  private String uploadDir; // uploadDir = "uploads"

  @Override
  @Transactional
  public CvResponse uploadCv(MultipartFile file) {
    validateFile(file);

    User currentUser = getCurrentAuthenticatedUser();
    Path uploadPath = initUploadDirectory(); //

    String originalFilename = StringUtils.cleanPath(file.getOriginalFilename()); // Lay ten file goc
    String fileExtension = getFileExtension(originalFilename); // lay ra extension (pdf , docx, ..)
    String storedFilename = UUID.randomUUID() + "." + fileExtension; // tao ten file moi
    Path destination = uploadPath.resolve(storedFilename).normalize(); // nối path , bỏ ../ , /,..

    // Chi cho phep luu file ben trong thu muc uploads/, tranh truong hop ten file
    // bi chen "../"
    if (!destination.startsWith(uploadPath)) {
      throw new BadRequestException("Duong dan file khong hop le");
    }

    try (InputStream inputStream = file.getInputStream()) {
      // REPLACE_EXISTING giup ghi de neu ten ngau nhien hiem khi bi trung.
      Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);// ghi xuống ổ đĩa
    } catch (IOException exception) {
      throw new BadRequestException("Khong the luu file CV");
    }

    Cv cv = Cv.builder()
        .fileUrl("/uploads/" + storedFilename)
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

    deletePhysicalFile(cv.getFileUrl());
    cvRepository.delete(cv);
  }

  private Path initUploadDirectory() {
    try {
      // Chuyen duong dan cau hinh thanh duong dan tuyet doi va tao thu muc neu chua
      // ton tai.
      Path uploadPath = Path.of(uploadDir).toAbsolutePath().normalize();
      Files.createDirectories(uploadPath);// nếu chưa có thì tạo folder luôn
      return uploadPath;
    } catch (IOException exception) {
      throw new BadRequestException("Khong the tao thu muc uploads");
    }
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

  private void deletePhysicalFile(String fileUrl) {
    if (!StringUtils.hasText(fileUrl)) {
      return;
    }

    String relativeFileName = fileUrl.replace("/uploads/", "").trim();
    if (!StringUtils.hasText(relativeFileName)) {
      return;
    }

    Path uploadPath = initUploadDirectory();
    Path filePath = uploadPath.resolve(relativeFileName).normalize();

    // Chi xoa file nam ben trong thu muc uploads/ de tranh xoa nham file khac.
    if (!filePath.startsWith(uploadPath)) {
      throw new BadRequestException("Duong dan file CV khong hop le");
    }

    try {
      Files.deleteIfExists(filePath);
    } catch (IOException exception) {
      throw new BadRequestException("Khong the xoa file CV trong may");
    }
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
