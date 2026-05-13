package backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.DTO.job.JobResponse;
import backend.DTO.savedjob.SavedJobStatusResponse;
import backend.service.SavedJobService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/saved-jobs")
@PreAuthorize("hasRole('CANDIDATE')")
public class SavedJobController {

  private final SavedJobService savedJobService;

  @PostMapping("/{jobId}")
  public ResponseEntity<SavedJobStatusResponse> saveJob(@PathVariable Long jobId) {
    return ResponseEntity.ok(savedJobService.saveJob(jobId));
  }

  @DeleteMapping("/{jobId}")
  public ResponseEntity<SavedJobStatusResponse> unsaveJob(@PathVariable Long jobId) {
    return ResponseEntity.ok(savedJobService.unsaveJob(jobId));
  }

  @GetMapping
  public ResponseEntity<List<JobResponse>> getSavedJobs() {
    return ResponseEntity.ok(savedJobService.getSavedJobs());
  }

  @GetMapping("/{jobId}/status")
  public ResponseEntity<SavedJobStatusResponse> getSavedJobStatus(@PathVariable Long jobId) {
    return ResponseEntity.ok(savedJobService.getSavedJobStatus(jobId));
  }
}
