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

import backend.DTO.experiencelevel.CreateExperienceLevelRequest;
import backend.DTO.experiencelevel.ExperienceLevelResponse;
import backend.service.ExperienceLevelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/experience-levels")
public class ExperienceLevelController {

  private final ExperienceLevelService experienceLevelService;

  @GetMapping
  public ResponseEntity<List<ExperienceLevelResponse>> getAllExperienceLevels() {
    return ResponseEntity.ok(experienceLevelService.getAllExperienceLevels());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ExperienceLevelResponse> getExperienceLevelById(@PathVariable Long id) {
    return ResponseEntity.ok(experienceLevelService.getExperienceLevelById(id));
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ExperienceLevelResponse> createExperienceLevel(
      @Valid @RequestBody CreateExperienceLevelRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(experienceLevelService.createExperienceLevel(request));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ExperienceLevelResponse> updateExperienceLevel(
      @PathVariable Long id,
      @Valid @RequestBody CreateExperienceLevelRequest request) {
    return ResponseEntity.ok(experienceLevelService.updateExperienceLevel(id, request));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteExperienceLevel(@PathVariable Long id) {
    experienceLevelService.deleteExperienceLevel(id);
    return ResponseEntity.noContent().build();
  }
}
