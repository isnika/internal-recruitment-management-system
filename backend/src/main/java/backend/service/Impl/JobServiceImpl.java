package backend.service.Impl;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.DTO.job.CreateJobRequest;
import backend.DTO.job.JobFilterRequest;
import backend.DTO.job.JobResponse;
import backend.entity.Category;
import backend.entity.Company;
import backend.entity.ExperienceLevel;
import backend.entity.Job;
import backend.entity.Skill;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.mapper.JobMapper;
import backend.repository.CategoryRepository;
import backend.repository.CompanyRepository;
import backend.repository.ExperienceLevelRepository;
import backend.repository.JobRepository;
import backend.repository.SkillRepository;
import backend.service.JobService;
import backend.specification.JobSpecification;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

  private final JobRepository jobRepository;
  private final CompanyRepository companyRepository;
  private final CategoryRepository categoryRepository;
  private final ExperienceLevelRepository experienceLevelRepository;
  private final SkillRepository skillRepository;

  @Override
  public List<JobResponse> getAllJobs() {
    return jobRepository.findAll()
        .stream()
        .map(JobMapper::toResponse)
        .toList();
  }

  @Override
  @Transactional
  public JobResponse createJob(CreateJobRequest request) {
    validateRequest(request);

    Company company = findCompanyById(request.getCompanyId());
    Category category = findCategoryById(request.getCategoryId());
    ExperienceLevel experienceLevel = findExperienceLevelById(request.getExperienceLevelId());
    Set<Skill> skills = findSkillsByIds(request.getSkillIds());

    Job job = JobMapper.toEntity(request, company, category, experienceLevel, skills);
    job.setStatus("ACTIVE");
    job.setCreatedAt(LocalDateTime.now());
    job.setUpdatedAt(LocalDateTime.now());

    return JobMapper.toResponse(jobRepository.save(job));
  }

  @Override
  public JobResponse getJobById(Long jobId) {
    return JobMapper.toResponse(findJobById(jobId));
  }

  @Override
  @Transactional
  public JobResponse updateJob(Long jobId, CreateJobRequest request) {
    validateRequest(request);

    Job job = findJobById(jobId);
    Company company = findCompanyById(request.getCompanyId());
    Category category = findCategoryById(request.getCategoryId());
    ExperienceLevel experienceLevel = findExperienceLevelById(request.getExperienceLevelId());
    Set<Skill> skills = findSkillsByIds(request.getSkillIds());

    JobMapper.updateEntity(job, request, company, category, experienceLevel, skills);
    job.setUpdatedAt(LocalDateTime.now());

    return JobMapper.toResponse(jobRepository.save(job));
  }

  @Override
  @Transactional
  public void deleteJob(Long jobId) {
    Job job = findJobById(jobId);
    jobRepository.delete(job);
  }

  @Override
  @Transactional
  public JobResponse softDeleteJob(Long jobId) {
    Job job = findJobById(jobId);
    job.setStatus("INACTIVE");
    job.setUpdatedAt(LocalDateTime.now());
    return JobMapper.toResponse(jobRepository.save(job));
  }

  private void validateRequest(CreateJobRequest request) {
    if (request == null) {
      throw new BadRequestException("Request khong hop le");
    }
    if (isBlank(request.getTitle()) || isBlank(request.getDescription())) {
      throw new BadRequestException("Title va description khong duoc de trong");
    }
    if (request.getCompanyId() == null || request.getCategoryId() == null || request.getExperienceLevelId() == null) {
      throw new BadRequestException("Company, category va experience level khong duoc de trong");
    }
    if (request.getSalaryMin() != null && request.getSalaryMax() != null
        && request.getSalaryMin() > request.getSalaryMax()) {
      throw new BadRequestException("Salary min khong duoc lon hon salary max");
    }
  }

  private Company findCompanyById(Long companyId) {
    return companyRepository.findById(companyId)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay company voi id: " + companyId));
  }

  private Category findCategoryById(Long categoryId) {
    return categoryRepository.findById(categoryId)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay category voi id: " + categoryId));
  }

  private ExperienceLevel findExperienceLevelById(Long experienceLevelId) {
    return experienceLevelRepository.findById(experienceLevelId)
        .orElseThrow(
            () -> new ResourceNotFoundException("Khong tim thay experience level voi id: " + experienceLevelId));
  }

  private Set<Skill> findSkillsByIds(List<Long> skillIds) {
    if (skillIds == null || skillIds.isEmpty()) {
      return new HashSet<>();
    }

    List<Skill> skills = skillRepository.findAllById(skillIds);
    if (skills.size() != new HashSet<>(skillIds).size()) {
      throw new ResourceNotFoundException("Mot hoac nhieu skill khong ton tai");
    }

    return new HashSet<>(skills);
  }

  private boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }

  private Job findJobById(Long jobId) {
    if (jobId == null) {
      throw new BadRequestException("Job id khong hop le");
    }

    return jobRepository.findById(jobId)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay job voi id: " + jobId));
  }

  // Filter Job
  @Override
  @Transactional(readOnly = true)
  public List<JobResponse> filterJobs(JobFilterRequest request) {
    Specification<Job> spec = JobSpecification.filter(request);

    List<Job> jobs = jobRepository.findAll(spec);

    return jobs.stream()
        .map(JobMapper::toResponse)
        .toList();
  }
}
