package backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

  UploadResult uploadCv(MultipartFile file);

  UploadResult uploadCompanyLogo(MultipartFile file);

  void deleteCv(String publicId, String resourceType);

  void deleteCompanyLogo(String publicId, String resourceType);

  record UploadResult(String fileUrl, String publicId, String resourceType) {
  }
}
