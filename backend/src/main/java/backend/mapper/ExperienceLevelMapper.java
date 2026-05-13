package backend.mapper;

import backend.DTO.experiencelevel.CreateExperienceLevelRequest;
import backend.DTO.experiencelevel.ExperienceLevelResponse;
import backend.entity.ExperienceLevel;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ExperienceLevelMapper {

  public static ExperienceLevel toEntity(CreateExperienceLevelRequest request) {
    if (request == null) {
      return null;
    }

    return ExperienceLevel.builder()
        .name(request.getName() != null ? request.getName().trim() : null)
        .build();
  }

  public static ExperienceLevelResponse toResponse(ExperienceLevel experienceLevel) {
    if (experienceLevel == null) {
      return null;
    }

    return ExperienceLevelResponse.builder()
        .id(experienceLevel.getId())
        .name(experienceLevel.getName())
        .build();
  }

  public static void updateEntity(ExperienceLevel experienceLevel, CreateExperienceLevelRequest request) {
    if (experienceLevel == null || request == null) {
      return;
    }

    experienceLevel.setName(request.getName() != null ? request.getName().trim() : null);
  }
}
