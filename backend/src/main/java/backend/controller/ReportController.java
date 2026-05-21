package backend.controller;

import backend.DTO.report.ReportDTO;
import backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
public class ReportController {

    private final ReportService reportService;


    @GetMapping("/overview")
    public ResponseEntity<ReportDTO.OverviewResponse> getOverview() {
        return ResponseEntity.ok(reportService.getOverview());
    }

    @GetMapping("/new-candidates")
    public ResponseEntity<ReportDTO.NewCandidatesResponse> getNewCandidates(
            @RequestParam(defaultValue = "day")  String period,
            @RequestParam(required = false)      String from,
            @RequestParam(required = false)      String to) {
        return ResponseEntity.ok(reportService.getNewCandidates(period, from, to));
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<ReportDTO.JobReportResponse>> getJobReport() {
        return ResponseEntity.ok(reportService.getJobReport());
    }

    @GetMapping("/candidates")
    public ResponseEntity<ReportDTO.CandidateAnalyticsResponse> getCandidateAnalytics() {
        return ResponseEntity.ok(reportService.getCandidateAnalytics());
    }

    @GetMapping("/pipeline")
    public ResponseEntity<ReportDTO.PipelineResponse> getPipeline() {
        return ResponseEntity.ok(reportService.getPipeline());
    }

    @GetMapping("/departments")
    public ResponseEntity<List<ReportDTO.DepartmentReportResponse>> getDepartmentReport() {
        return ResponseEntity.ok(reportService.getDepartmentReport());
    }

    @GetMapping("/recruiters")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReportDTO.RecruiterPerformanceResponse>> getRecruiterPerformance() {
        return ResponseEntity.ok(reportService.getRecruiterPerformance());
    }

    @GetMapping("/time-series")
    public ResponseEntity<ReportDTO.TimeSeriesReportResponse> getTimeSeries(
            @RequestParam(defaultValue = "month") String period,
            @RequestParam(required = false)       String from,
            @RequestParam(required = false)       String to) {
        return ResponseEntity.ok(reportService.getTimeSeries(period, from, to));
    }
}
