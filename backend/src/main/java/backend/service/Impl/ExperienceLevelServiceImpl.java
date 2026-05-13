package backend.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.DTO.experiencelevel.CreateExperienceLevelRequest;
import backend.DTO.experiencelevel.ExperienceLevelResponse;
import backend.entity.ExperienceLevel;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.mapper.ExperienceLevelMapper;
import backend.repository.ExperienceLevelRepository;
import backend.repository.JobRepository;
import backend.service.ExperienceLevelService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExperienceLevelServiceImpl implements ExperienceLevelService {

  private final ExperienceLevelRepository experienceLevelRepository;
  private final JobRepository jobRepository;

  @Override
  public List<ExperienceLevelResponse> getAllExperienceLevels() {
    return experienceLevelRepository.findAll()
        .stream()
        .map(ExperienceLevelMapper::toResponse)
        .toList();
  }

  @Override
  public ExperienceLevelResponse getExperienceLevelById(Long id) {
    return ExperienceLevelMapper.toResponse(findExperienceLevelById(id));
  }

  @Override
  @Transactional
  public ExperienceLevelResponse createExperienceLevel(CreateExperienceLevelRequest request) {
    validateRequest(request);
    validateDuplicateName(request.getName(), null);

    ExperienceLevel experienceLevel = ExperienceLevelMapper.toEntity(request);
    return ExperienceLevelMapper.toResponse(experienceLevelRepository.save(experienceLevel));
  }

  @Override
  @Transactional
  public ExperienceLevelResponse updateExperienceLevel(Long id, CreateExperienceLevelRequest request) {
    validateRequest(request);

    ExperienceLevel experienceLevel = findExperienceLevelById(id);
    validateDuplicateName(request.getName(), experienceLevel.getId());

    ExperienceLevelMapper.updateEntity(experienceLevel, request);
    return ExperienceLevelMapper.toResponse(experienceLevelRepository.save(experienceLevel));
  }

  @Override
  @Transactional
  public void deleteExperienceLevel(Long id) {
    ExperienceLevel experienceLevel = findExperienceLevelById(id);

    if (!jobRepository.findByExperienceLevelId(id).isEmpty()) {
      throw new BadRequestException("Khong the xoa experience level dang duoc su dung trong job");
    }

    experienceLevelRepository.delete(experienceLevel);
  }

  private ExperienceLevel findExperienceLevelById(Long id) {
    if (id == null) {
      throw new BadRequestException("Experience level id khong hop le");
    }

    return experienceLevelRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay experience level voi id: " + id));
  }

  private void validateRequest(CreateExperienceLevelRequest request) {
    if (request == null || isBlank(request.getName())) {
      throw new BadRequestException("Name khong duoc de trong");
    }
  }

  private void validateDuplicateName(String name, Long currentId) {
    experienceLevelRepository.findByNameIgnoreCase(name.trim())
        .ifPresent(existing -> {
          if (currentId == null || !existing.getId().equals(currentId)) {
            throw new BadRequestException("Experience level da ton tai");
          }
        });
  }

  private boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }
}
