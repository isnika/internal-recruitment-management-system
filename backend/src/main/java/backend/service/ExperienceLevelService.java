package backend.service;

import java.util.List;

import backend.DTO.experiencelevel.CreateExperienceLevelRequest;
import backend.DTO.experiencelevel.ExperienceLevelResponse;

public interface ExperienceLevelService {

  List<ExperienceLevelResponse> getAllExperienceLevels();

  ExperienceLevelResponse getExperienceLevelById(Long id);

  ExperienceLevelResponse createExperienceLevel(CreateExperienceLevelRequest request);

  ExperienceLevelResponse updateExperienceLevel(Long id, CreateExperienceLevelRequest request);

  void deleteExperienceLevel(Long id);
}
