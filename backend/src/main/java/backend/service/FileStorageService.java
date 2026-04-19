package backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

  UploadResult uploadCv(MultipartFile file);

  void deleteCv(String publicId, String resourceType);

  record UploadResult(String fileUrl, String publicId, String resourceType) {
  }
}
