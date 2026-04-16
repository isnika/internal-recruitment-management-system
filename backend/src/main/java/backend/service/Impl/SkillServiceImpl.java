package backend.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.DTO.skill.CreateSkillRequest;
import backend.DTO.skill.SkillResponse;
import backend.entity.Skill;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.mapper.SkillMapper;
import backend.repository.JobRepository;
import backend.repository.SkillRepository;
import backend.service.SkillService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

  private final SkillRepository skillRepository;
  private final JobRepository jobRepository;

  @Override
  public List<SkillResponse> getAllSkills(String keyword) {
    List<Skill> skills = isBlank(keyword)
        ? skillRepository.findAll()
        : skillRepository.findByNameContainingIgnoreCase(keyword.trim());

    return skills.stream()
        .map(SkillMapper::toResponse)
        .toList();
  }

  @Override
  public SkillResponse getSkillById(Long id) {
    return SkillMapper.toResponse(findSkillById(id));
  }

  @Override
  @Transactional
  public SkillResponse createSkill(CreateSkillRequest request) {
    validateRequest(request);
    validateDuplicateName(request.getName(), null);

    Skill skill = SkillMapper.toEntity(request);
    return SkillMapper.toResponse(skillRepository.save(skill));
  }

  @Override
  @Transactional
  public SkillResponse updateSkill(Long id, CreateSkillRequest request) {
    validateRequest(request);

    Skill skill = findSkillById(id);
    validateDuplicateName(request.getName(), skill.getId());

    SkillMapper.updateEntity(skill, request);
    return SkillMapper.toResponse(skillRepository.save(skill));
  }

  @Override
  @Transactional
  public void deleteSkill(Long id) {
    Skill skill = findSkillById(id);

    if (!jobRepository.findBySkillsId(id).isEmpty()) {
      throw new BadRequestException("Khong the xoa skill dang duoc su dung trong job");
    }

    skillRepository.delete(skill);
  }

  private Skill findSkillById(Long id) {
    if (id == null) {
      throw new BadRequestException("Skill id khong hop le");
    }

    return skillRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay skill voi id: " + id));
  }

  private void validateRequest(CreateSkillRequest request) {
    if (request == null || isBlank(request.getName())) {
      throw new BadRequestException("Name khong duoc de trong");
    }
  }

  private void validateDuplicateName(String name, Long currentId) {
    skillRepository.findByNameIgnoreCase(name.trim())
        .ifPresent(existing -> {
          if (currentId == null || !existing.getId().equals(currentId)) {
            throw new BadRequestException("Skill da ton tai");
          }
        });
  }

  private boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }
}
