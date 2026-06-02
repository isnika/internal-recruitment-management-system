package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.Enum.ApplicationStatus;
import backend.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

  List<Application> findByUserId(Long userId);

  List<Application> findByJobId(Long jobId);

  List<Application> findByStatus(ApplicationStatus status);

  boolean existsByUserIdAndJobId(Long userId, Long jobId);

  // Lấy tất cả đơn thuộc các job của một công ty cụ thể
  @Query("SELECT a FROM Application a WHERE a.job.company.id = :companyId")
  List<Application> findByJobCompanyId(@Param("companyId") Long companyId);

  // Lấy đơn theo jobId trong phạm vi công ty của recruiter
  @Query("SELECT a FROM Application a WHERE a.job.id = :jobId AND a.job.company.id = :companyId")
  List<Application> findByJobIdAndCompanyId(@Param("jobId") Long jobId,
                                            @Param("companyId") Long companyId);
}