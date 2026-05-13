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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.DTO.skill.CreateSkillRequest;
import backend.DTO.skill.SkillResponse;
import backend.service.SkillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/skills")
public class SkillController {

  private final SkillService skillService;

  @GetMapping
  public ResponseEntity<List<SkillResponse>> getAllSkills(
      @RequestParam(required = false) String keyword) {
    return ResponseEntity.ok(skillService.getAllSkills(keyword));
  }

  @GetMapping("/{id}")
  public ResponseEntity<SkillResponse> getSkillById(@PathVariable Long id) {
    return ResponseEntity.ok(skillService.getSkillById(id));
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<SkillResponse> createSkill(@Valid @RequestBody CreateSkillRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(skillService.createSkill(request));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<SkillResponse> updateSkill(
      @PathVariable Long id,
      @Valid @RequestBody CreateSkillRequest request) {
    return ResponseEntity.ok(skillService.updateSkill(id, request));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
    skillService.deleteSkill(id);
    return ResponseEntity.noContent().build();
  }
}
