package backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.DTO.Cv.CvResponse;
import backend.service.CvService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cvs")
public class CvController {

  private final CvService cvService;

  @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @PreAuthorize("hasRole('CANDIDATE')")
  public ResponseEntity<CvResponse> uploadCv(@RequestPart("file") MultipartFile file) {
    return ResponseEntity.status(HttpStatus.CREATED).body(cvService.uploadCv(file));
  }

  @GetMapping("/myCvs")
  @PreAuthorize("hasRole('CANDIDATE')")
  public ResponseEntity<List<CvResponse>> getMyCvs() {
    return ResponseEntity.ok(cvService.getMyCvs());
  }

  @DeleteMapping("/{cvId}")
  @PreAuthorize("hasRole('CANDIDATE')")
  public ResponseEntity<Void> deleteMyCv(@PathVariable Long cvId) {
    cvService.deleteMyCv(cvId);
    return ResponseEntity.noContent().build();
  }
}
