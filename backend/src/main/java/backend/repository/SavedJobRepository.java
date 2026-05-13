package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.SavedJob;
import backend.entity.SavedJobId;

public interface SavedJobRepository extends JpaRepository<SavedJob, SavedJobId> {

  List<SavedJob> findByUser_Id(Long userId);

  List<SavedJob> findByJob_Id(Long jobId);

  boolean existsByUser_IdAndJob_Id(Long userId, Long jobId);

  void deleteByUser_IdAndJob_Id(Long userId, Long jobId);
}
