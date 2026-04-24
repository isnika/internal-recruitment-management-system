package backend.mapper;

import java.util.HashSet;
import java.util.Set;

import backend.DTO.job.CreateJobRequest;
import backend.DTO.job.JobResponse;
import backend.entity.Category;
import backend.entity.Company;
import backend.entity.ExperienceLevel;
import backend.entity.Job;
import backend.entity.Skill;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class JobMapper {

  public static Job toEntity(
      CreateJobRequest request,
      Company company,
      Category category,
      ExperienceLevel experienceLevel,
      Set<Skill> skills) {
    if (request == null) {
      return null;
    }

    return Job.builder()
        .title(request.getTitle())
        .description(request.getDescription())
        .requirements(request.getRequirements())
        .benefits(request.getBenefits())
        .salaryMin(request.getSalaryMin())
        .salaryMax(request.getSalaryMax())
        .location(request.getLocation())
        .type(request.getType())
        .deadline(request.getDeadline())
        .company(company)
        .category(category)
        .experienceLevel(experienceLevel)
        .skills(skills)
        .build();
  }

  public static JobResponse toResponse(Job job) {
    if (job == null) {
      return null;
    }

    return JobResponse.builder()
        .id(job.getId())
        .title(job.getTitle())
        .description(job.getDescription())
        .requirements(job.getRequirements())
        .benefits(job.getBenefits())
        .salaryMin(job.getSalaryMin())
        .salaryMax(job.getSalaryMax())
        .location(job.getLocation())
        .type(job.getType())
        .status(job.getStatus())
        .deadline(job.getDeadline())
        .company(CompanyMapper.toResponse(job.getCompany()))
        .category(CategoryMapper.toResponse(job.getCategory()))
        .experienceLevel(ExperienceLevelMapper.toResponse(job.getExperienceLevel()))
        .skills(job.getSkills() == null ? null : job.getSkills().stream().map(SkillMapper::toResponse).toList())
        .build();
  }

  public static void updateEntity(
      Job job,
      CreateJobRequest request,
      Company company,
      Category category,
      ExperienceLevel experienceLevel,
      Set<Skill> skills) {
    if (job == null || request == null) {
      return;
    }

    job.setTitle(request.getTitle());
    job.setDescription(request.getDescription());
    job.setRequirements(request.getRequirements());
    job.setBenefits(request.getBenefits());
    job.setSalaryMin(request.getSalaryMin());
    job.setSalaryMax(request.getSalaryMax());
    job.setLocation(request.getLocation());
    job.setType(request.getType());
    job.setDeadline(request.getDeadline());
    job.setCompany(company);
    job.setCategory(category);
    job.setExperienceLevel(experienceLevel);
    job.setSkills(skills != null ? skills : new HashSet<>());
  }
}
