package backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.DTO.job.CreateJobRequest;
import backend.DTO.job.JobResponse;
import backend.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
public class JobController {

  private final JobService jobService;

  @GetMapping
  public ResponseEntity<List<JobResponse>> getAllJobs() {
    return ResponseEntity.ok(jobService.getAllJobs());
  }

  @GetMapping("/{jobId}")
  public ResponseEntity<JobResponse> getJobById(@PathVariable Long jobId) {
    return ResponseEntity.ok(jobService.getJobById(jobId));
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<JobResponse> createJob(@Valid @RequestBody CreateJobRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(jobService.createJob(request));
  }

  @PutMapping("/{jobId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<JobResponse> updateJob(
      @PathVariable Long jobId,
      @Valid @RequestBody CreateJobRequest request) {
    return ResponseEntity.ok(jobService.updateJob(jobId, request));
  }

  @DeleteMapping("/{jobId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteJob(@PathVariable Long jobId) {
    jobService.deleteJob(jobId);
    return ResponseEntity.noContent().build();
  }
}
