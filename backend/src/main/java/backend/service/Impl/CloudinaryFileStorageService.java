package backend.service.Impl;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import backend.exception.BadRequestException;
import backend.service.FileStorageService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CloudinaryFileStorageService implements FileStorageService {

  private final Cloudinary cloudinary;

  @Value("${cloudinary.cv-folder:recruitment/cvs}")
  private String cvFolder;

  @Value("${cloudinary.company-logo-folder:recruitment/company-logos}")
  private String companyLogoFolder;

  @Override
  public UploadResult uploadCv(MultipartFile file) {
    return uploadFile(file, cvFolder, true);
  }

  @Override
  public UploadResult uploadCompanyLogo(MultipartFile file) {
    return uploadFile(file, companyLogoFolder, false);
  }

  @Override
  public void deleteCv(String publicId, String resourceType) {
    deleteFile(publicId, resourceType);
  }

  @Override
  public void deleteCompanyLogo(String publicId, String resourceType) {
    deleteFile(publicId, resourceType);
  }

  private UploadResult uploadFile(MultipartFile file, String folder, boolean isCv) {
    try {
      String fallbackName = isCv ? "cv" : "company-logo";
      String originalFilename = StringUtils.cleanPath(Objects.requireNonNullElse(file.getOriginalFilename(), fallbackName));
      String resourceType = resolveUploadResourceType(getFileExtension(originalFilename), isCv);

      @SuppressWarnings("unchecked")
      Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
          "resource_type", resourceType,
          "folder", folder,
          "use_filename", true,
          "unique_filename", true,
          "overwrite", false,
          "filename_override", originalFilename));

      String fileUrl = Objects.toString(uploadResult.get("secure_url"), "");
      String publicId = Objects.toString(uploadResult.get("public_id"), "");

      if (!StringUtils.hasText(fileUrl) || !StringUtils.hasText(publicId)) {
        throw new BadRequestException("Khong nhan duoc URL file tu cloud");
      }

      return new UploadResult(fileUrl, publicId, resourceType);
    } catch (IOException exception) {
      throw new BadRequestException(isCv ? "Khong the upload CV len cloud" : "Khong the upload logo len cloud");
    }
  }

  private void deleteFile(String publicId, String resourceType) {
    if (!StringUtils.hasText(publicId)) {
      return;
    }

    try {
      cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
          "resource_type", resolveResourceType(resourceType),
          "invalidate", true));
    } catch (IOException exception) {
      throw new BadRequestException("Khong the xoa CV tren cloud");
    }
  }

  private String getFileExtension(String filename) {
    if (!StringUtils.hasText(filename) || !filename.contains(".")) {
      return "";
    }

    return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
  }

  private String resolveResourceType(String resourceType) {
    return StringUtils.hasText(resourceType) ? resourceType : "raw";
  }

  private String resolveUploadResourceType(String extension, boolean isCv) {
    if (!isCv) {
      return "image";
    }

    return "pdf".equals(extension) ? "image" : "raw";
  }
}
