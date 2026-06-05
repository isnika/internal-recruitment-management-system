package backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.Enum.ApplicationStatus;
import backend.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

  @Query("SELECT DISTINCT a FROM Application a LEFT JOIN FETCH a.interview WHERE a.id = :id")
  Optional<Application> findById(@Param("id") Long id);

  @Query("SELECT DISTINCT a FROM Application a LEFT JOIN FETCH a.interview WHERE a.user.id = :userId")
  List<Application> findByUserId(@Param("userId") Long userId);

  @Query("SELECT DISTINCT a FROM Application a LEFT JOIN FETCH a.interview WHERE a.job.id = :jobId")
  List<Application> findByJobId(@Param("jobId") Long jobId);

  @Query("SELECT DISTINCT a FROM Application a LEFT JOIN FETCH a.interview WHERE a.status = :status")
  List<Application> findByStatus(@Param("status") ApplicationStatus status);

  boolean existsByUserIdAndJobId(Long userId, Long jobId);

  // Lấy tất cả đơn thuộc các job của một công ty cụ thể
  @Query("SELECT DISTINCT a FROM Application a LEFT JOIN FETCH a.interview WHERE a.job.company.id = :companyId")
  List<Application> findByJobCompanyId(@Param("companyId") Long companyId);

  // Lấy đơn theo jobId trong phạm vi công ty của recruiter
  @Query("SELECT DISTINCT a FROM Application a LEFT JOIN FETCH a.interview WHERE a.job.id = :jobId AND a.job.company.id = :companyId")
  List<Application> findByJobIdAndCompanyId(@Param("jobId") Long jobId,
                                            @Param("companyId") Long companyId);

  // Override findAll để tránh duplicate khi Hibernate JOIN fetch interview
  @Query("SELECT DISTINCT a FROM Application a LEFT JOIN FETCH a.interview")
  List<Application> findAll();
}