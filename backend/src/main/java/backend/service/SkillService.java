package backend.service;

import java.util.List;

import backend.DTO.skill.CreateSkillRequest;
import backend.DTO.skill.SkillResponse;

public interface SkillService {

  List<SkillResponse> getAllSkills(String keyword);

  SkillResponse getSkillById(Long id);

  SkillResponse createSkill(CreateSkillRequest request);

  SkillResponse updateSkill(Long id, CreateSkillRequest request);

  void deleteSkill(Long id);
}
