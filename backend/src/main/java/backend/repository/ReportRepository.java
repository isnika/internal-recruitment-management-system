package backend.repository;

import backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReportRepository extends JpaRepository<Application, Long> {

    // ── Tong ung vien (distinct users da apply) ─────────────────────────────
    @Query("SELECT COUNT(DISTINCT a.user.id) FROM Application a")
    long countDistinctCandidates();

    // ── Ung vien moi theo NGAY ───────────────────────────────────────────────
    @Query("""
        SELECT FUNCTION('DATE_FORMAT', a.appliedAt, '%Y-%m-%d') as label,
               COUNT(DISTINCT a.user.id)
        FROM Application a
        WHERE a.appliedAt >= :from AND a.appliedAt <= :to
        GROUP BY label
        ORDER BY label
    """)
    List<Object[]> countNewCandidatesByDay(@Param("from") LocalDateTime from,
                                           @Param("to")   LocalDateTime to);

    // ── Ung vien moi theo TUAN ───────────────────────────────────────────────
    @Query("""
        SELECT FUNCTION('DATE_FORMAT', a.appliedAt, '%Y-W%u') as label,
               COUNT(DISTINCT a.user.id)
        FROM Application a
        WHERE a.appliedAt >= :from AND a.appliedAt <= :to
        GROUP BY label
        ORDER BY label
    """)
    List<Object[]> countNewCandidatesByWeek(@Param("from") LocalDateTime from,
                                            @Param("to")   LocalDateTime to);

    // ── Ung vien moi theo THANG ──────────────────────────────────────────────
    @Query("""
        SELECT FUNCTION('DATE_FORMAT', a.appliedAt, '%Y-%m') as label,
               COUNT(DISTINCT a.user.id)
        FROM Application a
        WHERE a.appliedAt >= :from AND a.appliedAt <= :to
        GROUP BY label
        ORDER BY label
    """)
    List<Object[]> countNewCandidatesByMonth(@Param("from") LocalDateTime from,
                                             @Param("to")   LocalDateTime to);

    // ── Job report: thong ke theo tung job ──────────────────────────────────
    @Query("""
        SELECT a.job.id,
               a.job.title,
               COUNT(a.id)                                         as totalApplied,
               SUM(CASE WHEN a.status = 'SCREENING' THEN 1 ELSE 0 END) as cvPassed,
               SUM(CASE WHEN a.interview IS NOT NULL THEN 1 ELSE 0 END) as interviewed,
               SUM(CASE WHEN a.status = 'OFFER'     THEN 1 ELSE 0 END) as offered,
               SUM(CASE WHEN a.status = 'HIRED'     THEN 1 ELSE 0 END) as hired
        FROM Application a
        GROUP BY a.job.id, a.job.title
    """)
    List<Object[]> jobReportRaw();

    // ── Pipeline: dem ung vien theo tung stage ───────────────────────────────
    @Query("""
        SELECT a.status, COUNT(a.id)
        FROM Application a
        GROUP BY a.status
    """)
    List<Object[]> countByStatus();

    // ── Time series: applications theo ngay ──────────────────────────────────
    @Query("""
        SELECT FUNCTION('DATE_FORMAT', a.appliedAt, '%Y-%m-%d') as label,
               COUNT(a.id)
        FROM Application a
        WHERE a.appliedAt >= :from AND a.appliedAt <= :to
        GROUP BY label ORDER BY label
    """)
    List<Object[]> applicationsPerDay(@Param("from") LocalDateTime from,
                                      @Param("to")   LocalDateTime to);

    @Query("""
        SELECT FUNCTION('DATE_FORMAT', a.appliedAt, '%Y-W%u') as label,
               COUNT(a.id)
        FROM Application a
        WHERE a.appliedAt >= :from AND a.appliedAt <= :to
        GROUP BY label ORDER BY label
    """)
    List<Object[]> applicationsPerWeek(@Param("from") LocalDateTime from,
                                       @Param("to")   LocalDateTime to);

    @Query("""
        SELECT FUNCTION('DATE_FORMAT', a.appliedAt, '%Y-%m') as label,
               COUNT(a.id)
        FROM Application a
        WHERE a.appliedAt >= :from AND a.appliedAt <= :to
        GROUP BY label ORDER BY label
    """)
    List<Object[]> applicationsPerMonth(@Param("from") LocalDateTime from,
                                        @Param("to")   LocalDateTime to);

    // ── Hires theo ngay/tuan/thang ───────────────────────────────────────────
    @Query("""
        SELECT FUNCTION('DATE_FORMAT', a.appliedAt, '%Y-%m-%d') as label,
               COUNT(a.id)
        FROM Application a WHERE a.status = 'HIRED'
          AND a.appliedAt >= :from AND a.appliedAt <= :to
        GROUP BY label ORDER BY label
    """)
    List<Object[]> hiresPerDay(@Param("from") LocalDateTime from,
                               @Param("to")   LocalDateTime to);

    @Query("""
        SELECT FUNCTION('DATE_FORMAT', a.appliedAt, '%Y-W%u') as label,
               COUNT(a.id)
        FROM Application a WHERE a.status = 'HIRED'
          AND a.appliedAt >= :from AND a.appliedAt <= :to
        GROUP BY label ORDER BY label
    """)
    List<Object[]> hiresPerWeek(@Param("from") LocalDateTime from,
                                @Param("to")   LocalDateTime to);

    @Query("""
        SELECT FUNCTION('DATE_FORMAT', a.appliedAt, '%Y-%m') as label,
               COUNT(a.id)
        FROM Application a WHERE a.status = 'HIRED'
          AND a.appliedAt >= :from AND a.appliedAt <= :to
        GROUP BY label ORDER BY label
    """)
    List<Object[]> hiresPerMonth(@Param("from") LocalDateTime from,
                                 @Param("to")   LocalDateTime to);

    // ── Recruiter performance ─────────────────────────────────────────────────
    @Query("""
        SELECT a.job.company.id,
               COUNT(DISTINCT a.job.id)       as jobs,
               COUNT(a.id)                    as candidates,
               SUM(CASE WHEN a.status='HIRED' THEN 1 ELSE 0 END) as hired
        FROM Application a
        GROUP BY a.job.company.id
    """)
    List<Object[]> recruiterPerformanceRaw();
}
