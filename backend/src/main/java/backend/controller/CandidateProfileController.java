package backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.DTO.candidateProdile.CandidateProfileResponse;
import backend.DTO.candidateProdile.CreateCandidateProfileRquest;
import backend.service.CandidateProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/candidates")
public class CandidateProfileController {

  private final CandidateProfileService candidateProfileService;

  @PostMapping("/profile")
  @PreAuthorize("hasRole('CANDIDATE')")
  public ResponseEntity<CandidateProfileResponse> createProfile(
      @Valid @RequestBody CreateCandidateProfileRquest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(candidateProfileService.createProfile(request));
  }

  @GetMapping("/profile")
  @PreAuthorize("hasRole('CANDIDATE')")
  public ResponseEntity<CandidateProfileResponse> getMyProfile() {
    return ResponseEntity.ok(candidateProfileService.getMyProfile());
  }

  @GetMapping("/profiles/{userId}")
  @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
  public ResponseEntity<CandidateProfileResponse> getProfileById(@PathVariable Long userId) {
    return ResponseEntity.ok(candidateProfileService.getProfileById(userId));
  }

  @GetMapping("/profiles")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<CandidateProfileResponse>> getAllProfiles() {
    return ResponseEntity.ok(candidateProfileService.getAllProfiles());
  }

  @PutMapping("/profile")
  @PreAuthorize("hasRole('CANDIDATE')")
  public ResponseEntity<CandidateProfileResponse> updateMyProfile(
      @Valid @RequestBody CreateCandidateProfileRquest request) {
    return ResponseEntity.ok(candidateProfileService.updateMyProfile(request));
  }

  @PatchMapping(value = "/profile/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @PreAuthorize("hasRole('CANDIDATE')")
  public ResponseEntity<CandidateProfileResponse> updateMyAvatar(@RequestPart("file") MultipartFile file) {
    return ResponseEntity.ok(candidateProfileService.updateMyAvatar(file));
  }
}
