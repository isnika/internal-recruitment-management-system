package backend.mapper;

import backend.DTO.skill.CreateSkillRequest;
import backend.DTO.skill.SkillResponse;
import backend.entity.Skill;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class SkillMapper {

  public static Skill toEntity(CreateSkillRequest request) {
    if (request == null) {
      return null;
    }

    return Skill.builder()
        .name(request.getName() != null ? request.getName().trim() : null)
        .build();
  }

  public static SkillResponse toResponse(Skill skill) {
    if (skill == null) {
      return null;
    }

    return SkillResponse.builder()
        .id(skill.getId())
        .name(skill.getName())
        .build();
  }

  public static void updateEntity(Skill skill, CreateSkillRequest request) {
    if (skill == null || request == null) {
      return;
    }

    skill.setName(request.getName() != null ? request.getName().trim() : null);
  }
}
