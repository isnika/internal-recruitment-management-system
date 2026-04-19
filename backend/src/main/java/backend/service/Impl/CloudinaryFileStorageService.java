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

  @Override
  public UploadResult uploadCv(MultipartFile file) {
    try {
      String originalFilename = StringUtils.cleanPath(Objects.requireNonNullElse(file.getOriginalFilename(), "cv"));
      String extension = getFileExtension(originalFilename);
      String resourceType = "pdf".equals(extension) ? "image" : "raw";

      @SuppressWarnings("unchecked")
      Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
          "resource_type", resourceType,
          "folder", cvFolder,
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
      throw new BadRequestException("Khong the upload CV len cloud");
    }
  }

  @Override
  public void deleteCv(String publicId, String resourceType) {
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
}
