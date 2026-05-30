package backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.DTO.application.ApplicationResponse;
import backend.DTO.application.CreateApplicationRequest;
import backend.DTO.application.UpdateApplicationStatusRequest;
import backend.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {
  private final ApplicationService applicationService;

  @PostMapping
  @PreAuthorize("hasRole('CANDIDATE')")
  public ResponseEntity<ApplicationResponse> applyJob(
      @Valid @RequestBody CreateApplicationRequest request) {
    return ResponseEntity.ok(
        applicationService.applyJob(request));
  }

  @GetMapping("/me")
  @PreAuthorize("hasRole('CANDIDATE')")
  public ResponseEntity<List<ApplicationResponse>> getMyApplications() {
    return ResponseEntity.ok(applicationService.getMyApplications());
  }

  @GetMapping("/job/{jobId}")
  @PreAuthorize("hasRole('RECRUITER')")
  public ResponseEntity<List<ApplicationResponse>> getApplicationsByJob(
      @PathVariable Long jobId) {
    return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId));
  }

  @PatchMapping("/{id}/status")
  @PreAuthorize("hasRole('RECRUITER')")
  public ResponseEntity<ApplicationResponse> updateApplicationStatus(
      @PathVariable Long id,
      @Valid @RequestBody UpdateApplicationStatusRequest request) {
    return ResponseEntity.ok(
        applicationService.updateStatus(id, request));
  }
}
