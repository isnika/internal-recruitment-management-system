package backend.service;

import backend.DTO.report.ReportDTO;

import java.util.List;

public interface ReportService {

    ReportDTO.OverviewResponse         getOverview();
    ReportDTO.NewCandidatesResponse    getNewCandidates(String period, String from, String to);
    List<ReportDTO.JobReportResponse>  getJobReport();
    ReportDTO.CandidateAnalyticsResponse getCandidateAnalytics();
    ReportDTO.PipelineResponse         getPipeline();
    List<ReportDTO.DepartmentReportResponse>   getDepartmentReport();
    List<ReportDTO.RecruiterPerformanceResponse> getRecruiterPerformance();
    ReportDTO.TimeSeriesReportResponse getTimeSeries(String period, String from, String to);
}
