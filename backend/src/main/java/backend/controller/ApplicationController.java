package backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.DTO.application.ApplicationResponse;
import backend.DTO.application.CreateApplicationRequest;
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
}
