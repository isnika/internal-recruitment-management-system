package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.SavedJob;
import backend.entity.SavedJobId;

public interface SavedJobRepository extends JpaRepository<SavedJob, SavedJobId> {

  List<SavedJob> findByUserId(Long userId);

  List<SavedJob> findByJobId(Long jobId);

  boolean existsByUserIdAndJobId(Long userId, Long jobId);

  void deleteByUserIdAndJobId(Long userId, Long jobId);
}
