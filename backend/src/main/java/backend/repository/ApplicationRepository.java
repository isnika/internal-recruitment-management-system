package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.Enum.ApplicationStatus;
import backend.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

  List<Application> findByUserId(Long userId);

  List<Application> findByJobId(Long jobId);

  List<Application> findByStatus(ApplicationStatus status);

  boolean existsByUserIdAndJobId(Long userId, Long jobId);
}
