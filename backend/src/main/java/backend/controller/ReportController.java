package backend.controller;

import backend.DTO.report.ReportDTO;
import backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ReportController
 * Base path: /api/reports
 * Quyen: ADMIN hoac RECRUITER
 */
@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
public class ReportController {

    private final ReportService reportService;

    // ── 1. Tong quan ──────────────────────────────────────────────
    @GetMapping("/overview")
    public ResponseEntity<ReportDTO.OverviewResponse> getOverview() {
        return ResponseEntity.ok(reportService.getOverview());
    }

    // ── 2. Ung vien moi theo ky ───────────────────────────────────
    // GET /api/reports/new-candidates?period=day&from=2024-01-01&to=2024-12-31
    @GetMapping("/new-candidates")
    public ResponseEntity<ReportDTO.NewCandidatesResponse> getNewCandidates(
            @RequestParam(defaultValue = "day")  String period,
            @RequestParam(required = false)      String from,
            @RequestParam(required = false)      String to) {
        return ResponseEntity.ok(reportService.getNewCandidates(period, from, to));
    }

    // ── 3. Chi tiet tung job ──────────────────────────────────────
    @GetMapping("/jobs")
    public ResponseEntity<List<ReportDTO.JobReportResponse>> getJobReport() {
        return ResponseEntity.ok(reportService.getJobReport());
    }

    // ── 4. Phan tich ung vien ─────────────────────────────────────
    @GetMapping("/candidates")
    public ResponseEntity<ReportDTO.CandidateAnalyticsResponse> getCandidateAnalytics() {
        return ResponseEntity.ok(reportService.getCandidateAnalytics());
    }

    // ── 5. Quy trinh tuyen dung (Pipeline) ───────────────────────
    @GetMapping("/pipeline")
    public ResponseEntity<ReportDTO.PipelineResponse> getPipeline() {
        return ResponseEntity.ok(reportService.getPipeline());
    }

    // ── 6. Theo phong ban ─────────────────────────────────────────
    @GetMapping("/departments")
    public ResponseEntity<List<ReportDTO.DepartmentReportResponse>> getDepartmentReport() {
        return ResponseEntity.ok(reportService.getDepartmentReport());
    }

    // ── 7. Hieu suat recruiter ────────────────────────────────────
    @GetMapping("/recruiters")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReportDTO.RecruiterPerformanceResponse>> getRecruiterPerformance() {
        return ResponseEntity.ok(reportService.getRecruiterPerformance());
    }

    // ── 8. Time series (applications/hires/interviews theo ky) ────
    // GET /api/reports/time-series?period=month&from=2024-01-01&to=2024-12-31
    @GetMapping("/time-series")
    public ResponseEntity<ReportDTO.TimeSeriesReportResponse> getTimeSeries(
            @RequestParam(defaultValue = "month") String period,
            @RequestParam(required = false)       String from,
            @RequestParam(required = false)       String to) {
        return ResponseEntity.ok(reportService.getTimeSeries(period, from, to));
    }
}
