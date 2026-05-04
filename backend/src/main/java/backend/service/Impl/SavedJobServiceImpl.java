package backend.service.Impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.DTO.job.JobResponse;
import backend.DTO.savedjob.SavedJobStatusResponse;
import backend.Enum.UserRole;
import backend.entity.Job;
import backend.entity.SavedJob;
import backend.entity.SavedJobId;
import backend.entity.User;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.exception.UnauthorizedException;
import backend.mapper.JobMapper;
import backend.repository.JobRepository;
import backend.repository.SavedJobRepository;
import backend.repository.UserRepository;
import backend.security.AuthUser;
import backend.service.SavedJobService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SavedJobServiceImpl implements SavedJobService {

  private final SavedJobRepository savedJobRepository;
  private final JobRepository jobRepository;
  private final UserRepository userRepository;

  @Override
  @Transactional
  public SavedJobStatusResponse saveJob(Long jobId) {
    User currentUser = getCurrentCandidate();
    Job job = findJobById(jobId);

    if (savedJobRepository.existsByUser_IdAndJob_Id(currentUser.getId(), jobId)) {
      throw new BadRequestException("Job da duoc luu");
    }

    SavedJob savedJob = SavedJob.builder()
        .id(new SavedJobId(currentUser.getId(), jobId))
        .user(currentUser)
        .job(job)
        .savedAt(LocalDateTime.now())
        .build();

    savedJobRepository.save(savedJob);

    return SavedJobStatusResponse.builder()
        .jobId(jobId)
        .saved(true)
        .build();
  }

  @Override
  @Transactional
  public SavedJobStatusResponse unsaveJob(Long jobId) {
    User currentUser = getCurrentCandidate();
    findJobById(jobId);

    if (!savedJobRepository.existsByUser_IdAndJob_Id(currentUser.getId(), jobId)) {
      throw new ResourceNotFoundException("Job chua duoc luu");
    }

    savedJobRepository.deleteByUser_IdAndJob_Id(currentUser.getId(), jobId);

    return SavedJobStatusResponse.builder()
        .jobId(jobId)
        .saved(false)
        .build();
  }

  @Override
  @Transactional(readOnly = true)
  public List<JobResponse> getSavedJobs() {
    User currentUser = getCurrentCandidate();

    return savedJobRepository.findByUser_Id(currentUser.getId())
        .stream()
        .map(SavedJob::getJob)
        .map(JobMapper::toResponse)
        .toList();
  }

  @Override
  @Transactional(readOnly = true)
  public SavedJobStatusResponse getSavedJobStatus(Long jobId) {
    User currentUser = getCurrentCandidate();
    findJobById(jobId);

    return SavedJobStatusResponse.builder()
        .jobId(jobId)
        .saved(savedJobRepository.existsByUser_IdAndJob_Id(currentUser.getId(), jobId))
        .build();
  }

  private User getCurrentCandidate() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || !(authentication.getPrincipal() instanceof AuthUser authUser)) {
      throw new UnauthorizedException("Ban chua dang nhap");
    }

    User user = userRepository.findById(authUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user hien tai"));

    if (user.getRole() != UserRole.CANDIDATE) {
      throw new UnauthorizedException("Chi CANDIDATE moi duoc luu job");
    }

    return user;
  }

  private Job findJobById(Long jobId) {
    if (jobId == null) {
      throw new BadRequestException("Job id khong hop le");
    }

    return jobRepository.findById(jobId)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay job voi id: " + jobId));
  }
}
