package backend.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import backend.DTO.Cv.CvResponse;

public interface CvService {

  CvResponse uploadCv(MultipartFile file);

  List<CvResponse> getMyCvs();

  void deleteMyCv(Long cvId);
}
