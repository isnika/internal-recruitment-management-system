package report;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

public class ReportDTO {

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class OverviewResponse {
        private long totalOpenJobs;
        private long totalClosedJobs;
        private long totalCandidates;
        private long totalApplications;
        private double conversionApplyToInterview;
        private double conversionInterviewToHired;
        private long totalSuccessfulHires;
    }


    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class NewCandidatesResponse {
        private String period;   // "day" | "week" | "month"
        private List<TimeSeriesPoint> data;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class TimeSeriesPoint {
        private String label;  // "2024-06-01", "2024-W23", "2024-06"
        private long   count;
    }


    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class JobReportResponse {
        private Long   jobId;
        private String jobTitle;
        private long   totalApplied;
        private long   totalCvPassed;      // status = "SCREENING"
        private long   totalInterviewed;   // da co interview record
        private long   totalOffered;       // status = "OFFER"
        private long   totalHired;         // status = "HIRED"
        private Double avgTimeToHireDays;  // trung binh ngay tu apply -> hired
    }


    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CandidateAnalyticsResponse {
        private long totalCandidates;
        private Map<String, Long> bySource;     // LinkedIn, referral, website...
        private Map<String, Long> byStatus;     // new, screening, interview, rejected, hired
        private List<SkillCount>  topSkills;    // ky nang pho bien
        private Map<String, Long> byLevel;      // junior/middle/senior
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class SkillCount {
        private String skillName;
        private long   count;
    }


    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class PipelineResponse {
        private long applied;
        private long screening;
        private long interview;
        private long test;
        private long offer;
        private long hired;
        private long rejected;
    }


    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class DepartmentReportResponse {
        private String departmentName;
        private long   totalJobs;
        private long   totalCandidates;
        private long   totalHired;
        private Double avgTimeToHireDays;
        private long   openHeadcount;       // nhu cau thieu nhan su (open jobs chua filled)
    }


    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class RecruiterPerformanceResponse {
        private Long   recruiterId;
        private String recruiterName;
        private long   totalJobsManaged;
        private long   totalCandidatesHandled;
        private long   totalHired;
        private Double avgTimeToFillDays;
        private double successRate;          // totalHired / totalJobsManaged * 100
    }


    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class TimeSeriesReportResponse {
        private String period;  // "day" | "week" | "month"
        private List<TimeSeriesGroup> data;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class TimeSeriesGroup {
        private String label;
        private long   applications;
        private long   hires;
        private long   interviews;
    }
}
