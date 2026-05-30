package backend.service.Impl;

import backend.DTO.report.ReportDTO;
import backend.Enum.ApplicationStatus;
import backend.entity.Application;
import backend.entity.Job;
import backend.entity.User;
import backend.repository.*;
import backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

        private final ReportRepository reportRepository;
        private final JobRepository jobRepository;
        private final ApplicationRepository applicationRepository;
        private final InterviewRepository interviewRepository;
        private final UserRepository userRepository;

        // ─────────────────────────────────────────────────────────────
        // 1. OVERVIEW
        // ─────────────────────────────────────────────────────────────
        @Override
        public ReportDTO.OverviewResponse getOverview() {
                long openJobs = jobRepository.findByStatus("OPEN").size();
                long closedJobs = jobRepository.findByStatus("CLOSED").size();
                long totalCandidates = reportRepository.countDistinctCandidates();

                List<Application> all = applicationRepository.findAll();
                long totalApps = all.size();
                long interviewed = all.stream().filter(a -> a.getInterview() != null).count();
                long hired = all.stream().filter(a -> "HIRED".equals(a.getStatus())).count();

                double applyToInterview = totalApps > 0
                                ? Math.round(interviewed * 10000.0 / totalApps) / 100.0
                                : 0;
                double interviewToHired = interviewed > 0
                                ? Math.round(hired * 10000.0 / interviewed) / 100.0
                                : 0;

                return ReportDTO.OverviewResponse.builder()
                                .totalOpenJobs(openJobs)
                                .totalClosedJobs(closedJobs)
                                .totalCandidates(totalCandidates)
                                .totalApplications(totalApps)
                                .conversionApplyToInterview(applyToInterview)
                                .conversionInterviewToHired(interviewToHired)
                                .totalSuccessfulHires(hired)
                                .build();
        }

        // ─────────────────────────────────────────────────────────────
        // 2. UNG VIEN MOI theo period
        // ─────────────────────────────────────────────────────────────
        @Override
        public ReportDTO.NewCandidatesResponse getNewCandidates(String period, String from, String to) {
                LocalDateTime fromDt = parseFrom(from);
                LocalDateTime toDt = parseTo(to);

                List<Object[]> raw = switch (period.toLowerCase()) {
                        case "week" -> reportRepository.countNewCandidatesByWeek(fromDt, toDt);
                        case "month" -> reportRepository.countNewCandidatesByMonth(fromDt, toDt);
                        default -> reportRepository.countNewCandidatesByDay(fromDt, toDt);
                };

                List<ReportDTO.TimeSeriesPoint> points = raw.stream()
                                .map(r -> new ReportDTO.TimeSeriesPoint(
                                                (String) r[0], ((Number) r[1]).longValue()))
                                .collect(Collectors.toList());

                return new ReportDTO.NewCandidatesResponse(period, points);
        }

        // ─────────────────────────────────────────────────────────────
        // 3. JOB DETAIL
        // ─────────────────────────────────────────────────────────────
        @Override
        public List<ReportDTO.JobReportResponse> getJobReport() {
                List<Object[]> raw = reportRepository.jobReportRaw();
                List<Application> hiredApps = applicationRepository.findByStatus(ApplicationStatus.HIRED);

                // Tinh trung binh time-to-hire per job
                Map<Long, Double> avgTimeMap = new HashMap<>();
                Map<Long, List<Application>> hiredByJob = hiredApps.stream()
                                .collect(Collectors.groupingBy(a -> a.getJob().getId()));

                hiredByJob.forEach((jobId, apps) -> {
                        Job job = apps.get(0).getJob();
                        OptionalDouble avg = apps.stream()
                                        .filter(a -> a.getAppliedAt() != null && job.getCreatedAt() != null)
                                        .mapToLong(a -> ChronoUnit.DAYS.between(a.getAppliedAt(), LocalDateTime.now()))
                                        .average();
                        avgTimeMap.put(jobId, avg.orElse(0.0));
                });

                return raw.stream().map(r -> ReportDTO.JobReportResponse.builder()
                                .jobId(((Number) r[0]).longValue())
                                .jobTitle((String) r[1])
                                .totalApplied(((Number) r[2]).longValue())
                                .totalCvPassed(((Number) r[3]).longValue())
                                .totalInterviewed(((Number) r[4]).longValue())
                                .totalOffered(((Number) r[5]).longValue())
                                .totalHired(((Number) r[6]).longValue())
                                .avgTimeToHireDays(avgTimeMap.getOrDefault(((Number) r[0]).longValue(), 0.0))
                                .build()).collect(Collectors.toList());
        }

        // ─────────────────────────────────────────────────────────────
        // 4. CANDIDATE ANALYTICS
        // ─────────────────────────────────────────────────────────────
        @Override
        public ReportDTO.CandidateAnalyticsResponse getCandidateAnalytics() {
                long total = reportRepository.countDistinctCandidates();

                List<Object[]> statusRaw = reportRepository.countByStatus();
                Map<String, Long> byStatus = new LinkedHashMap<>();
                for (Object[] r : statusRaw) {
                        byStatus.put(r[0] != null ? r[0].toString() : "UNKNOWN",
                                        ((Number) r[1]).longValue());
                }

                // byLevel: dua theo experienceLevel cua job ma candidate da apply
                List<Application> all = applicationRepository.findAll();
                Map<String, Long> byLevel = all.stream()
                                .filter(a -> a.getJob() != null && a.getJob().getExperienceLevel() != null)
                                .collect(Collectors.groupingBy(
                                                a -> a.getJob().getExperienceLevel().getName(),
                                                Collectors.counting()));

                Map<String, Long> skillCount = new LinkedHashMap<>();
                all.forEach(a -> {
                        if (a.getJob() != null && a.getJob().getSkills() != null) {
                                a.getJob().getSkills().forEach(s -> skillCount.merge(s.getName(), 1L, Long::sum));
                        }
                });
                List<ReportDTO.SkillCount> topSkills = skillCount.entrySet().stream()
                                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                                .limit(10)
                                .map(e -> new ReportDTO.SkillCount(e.getKey(), e.getValue()))
                                .collect(Collectors.toList());

                Map<String, Long> bySource = all.stream()
                                .filter(a -> a.getUser() != null && a.getUser().getEmail() != null)
                                .collect(Collectors.groupingBy(a -> {
                                        String email = a.getUser().getEmail();
                                        if (email.contains("linkedin"))
                                                return "LinkedIn";
                                        if (email.contains("gmail"))
                                                return "Website";
                                        return "Other";
                                }, Collectors.counting()));

                return ReportDTO.CandidateAnalyticsResponse.builder()
                                .totalCandidates(total)
                                .bySource(bySource)
                                .byStatus(byStatus)
                                .topSkills(topSkills)
                                .byLevel(byLevel)
                                .build();
        }

        // ─────────────────────────────────────────────────────────────
        // 5. PIPELINE
        // ─────────────────────────────────────────────────────────────
        @Override
        public ReportDTO.PipelineResponse getPipeline() {
                List<Object[]> raw = reportRepository.countByStatus();
                Map<String, Long> map = new HashMap<>();
                raw.forEach(r -> map.put(
                                r[0] != null ? r[0].toString().toUpperCase() : "UNKNOWN",
                                ((Number) r[1]).longValue()));

                return ReportDTO.PipelineResponse.builder()
                                .applied(map.getOrDefault("APPLIED", 0L))
                                .screening(map.getOrDefault("SCREENING", 0L))
                                .interview(map.getOrDefault("INTERVIEW", 0L))
                                .test(map.getOrDefault("TEST", 0L))
                                .offer(map.getOrDefault("OFFER", 0L))
                                .hired(map.getOrDefault("HIRED", 0L))
                                .rejected(map.getOrDefault("REJECTED", 0L))
                                .build();
        }

        // ─────────────────────────────────────────────────────────────
        // 6. DEPARTMENT REPORT
        // ─────────────────────────────────────────────────────────────
        @Override
        public List<ReportDTO.DepartmentReportResponse> getDepartmentReport() {
                List<Application> all = applicationRepository.findAll();

                Map<String, List<Application>> byDept = all.stream()
                                .filter(a -> a.getJob() != null && a.getJob().getCategory() != null)
                                .collect(Collectors.groupingBy(a -> a.getJob().getCategory().getName()));

                return byDept.entrySet().stream().map(entry -> {
                        String dept = entry.getKey();
                        List<Application> apps = entry.getValue();

                        long jobs = apps.stream().map(a -> a.getJob().getId()).distinct().count();
                        long candidates = apps.stream().map(a -> a.getUser().getId()).distinct().count();
                        long hired = apps.stream().filter(a -> "HIRED".equals(a.getStatus())).count();

                        // Open headcount = so job co status OPEN trong dept nay
                        long openHeadcount = apps.stream()
                                        .filter(a -> "OPEN".equals(a.getJob().getStatus()))
                                        .map(a -> a.getJob().getId()).distinct().count();

                        OptionalDouble avg = apps.stream()
                                        .filter(a -> "HIRED".equals(a.getStatus()) && a.getAppliedAt() != null)
                                        .mapToLong(a -> ChronoUnit.DAYS.between(a.getAppliedAt(), LocalDateTime.now()))
                                        .average();

                        return ReportDTO.DepartmentReportResponse.builder()
                                        .departmentName(dept)
                                        .totalJobs(jobs)
                                        .totalCandidates(candidates)
                                        .totalHired(hired)
                                        .avgTimeToHireDays(avg.orElse(0.0))
                                        .openHeadcount(openHeadcount)
                                        .build();
                }).collect(Collectors.toList());
        }

        // ─────────────────────────────────────────────────────────────
        // 7. RECRUITER PERFORMANCE
        // ─────────────────────────────────────────────────────────────
        @Override
        public List<ReportDTO.RecruiterPerformanceResponse> getRecruiterPerformance() {
                // Lay tat ca user co role RECRUITER
                List<User> recruiters = userRepository.findAll().stream()
                                .filter(u -> u.getRole() != null &&
                                                "RECRUITER".equals(u.getRole().name()))
                                .collect(Collectors.toList());

                List<Application> allApps = applicationRepository.findAll();

                return recruiters.stream().map(recruiter -> {
                        // Lay cac job thuoc cong ty cua recruiter
                        List<Long> recruiterJobIds = allApps.stream()
                                        .filter(a -> a.getJob() != null
                                                        && a.getJob().getCompany() != null
                                                        && recruiter.getCompany() != null
                                                        && a.getJob().getCompany().getId()
                                                                        .equals(recruiter.getCompany().getId()))
                                        .map(a -> a.getJob().getId())
                                        .distinct()
                                        .collect(Collectors.toList());

                        List<Application> myApps = allApps.stream()
                                        .filter(a -> recruiterJobIds.contains(
                                                        a.getJob() != null ? a.getJob().getId() : null))
                                        .collect(Collectors.toList());

                        long candidatesHandled = myApps.size();
                        long hired = myApps.stream()
                                        .filter(a -> "HIRED".equals(a.getStatus())).count();

                        OptionalDouble avgFill = myApps.stream()
                                        .filter(a -> "HIRED".equals(a.getStatus()) && a.getAppliedAt() != null)
                                        .mapToLong(a -> ChronoUnit.DAYS.between(a.getAppliedAt(), LocalDateTime.now()))
                                        .average();

                        double successRate = recruiterJobIds.isEmpty() ? 0.0
                                        : Math.round(hired * 10000.0 / recruiterJobIds.size()) / 100.0;

                        return ReportDTO.RecruiterPerformanceResponse.builder()
                                        .recruiterId(recruiter.getId())
                                        .recruiterName(recruiter.getFirstName() + " " + recruiter.getLastName())
                                        .totalJobsManaged(recruiterJobIds.size())
                                        .totalCandidatesHandled(candidatesHandled)
                                        .totalHired(hired)
                                        .avgTimeToFillDays(avgFill.orElse(0.0))
                                        .successRate(successRate)
                                        .build();
                }).collect(Collectors.toList());
        }

        // ─────────────────────────────────────────────────────────────
        // 8. TIME SERIES
        // ─────────────────────────────────────────────────────────────
        @Override
        public ReportDTO.TimeSeriesReportResponse getTimeSeries(String period,
                        String from, String to) {
                LocalDateTime fromDt = parseFrom(from);
                LocalDateTime toDt = parseTo(to);

                List<Object[]> apps, hires;
                switch (period.toLowerCase()) {
                        case "week" -> {
                                apps = reportRepository.applicationsPerWeek(fromDt, toDt);
                                hires = reportRepository.hiresPerWeek(fromDt, toDt);
                        }
                        case "month" -> {
                                apps = reportRepository.applicationsPerMonth(fromDt, toDt);
                                hires = reportRepository.hiresPerMonth(fromDt, toDt);
                        }
                        default -> {
                                apps = reportRepository.applicationsPerDay(fromDt, toDt);
                                hires = reportRepository.hiresPerDay(fromDt, toDt);
                        }
                }

                Map<String, Long> appMap = toMap(apps);
                Map<String, Long> hireMap = toMap(hires);

                Set<String> labels = new TreeSet<>();
                labels.addAll(appMap.keySet());
                labels.addAll(hireMap.keySet());

                long totalInterviews = interviewRepository.findAll().stream()
                                .filter(i -> i.getScheduleTime() != null
                                                && !i.getScheduleTime().isBefore(fromDt)
                                                && !i.getScheduleTime().isAfter(toDt))
                                .count();

                List<ReportDTO.TimeSeriesGroup> data = labels.stream().map(label -> ReportDTO.TimeSeriesGroup.builder()
                                .label(label)
                                .applications(appMap.getOrDefault(label, 0L))
                                .hires(hireMap.getOrDefault(label, 0L))
                                .interviews(0L) // per-label interview can them query rieng neu can
                                .build()).collect(Collectors.toList());

                return new ReportDTO.TimeSeriesReportResponse(period, data);
        }

        // ─────────────────────────────────────────────────────────────
        // Helper
        // ─────────────────────────────────────────────────────────────
        private LocalDateTime parseFrom(String from) {
                if (from == null || from.isBlank())
                        return LocalDateTime.now().minusMonths(1);
                return LocalDate.parse(from, DateTimeFormatter.ISO_LOCAL_DATE).atStartOfDay();
        }

        private LocalDateTime parseTo(String to) {
                if (to == null || to.isBlank())
                        return LocalDateTime.now();
                return LocalDate.parse(to, DateTimeFormatter.ISO_LOCAL_DATE).atTime(23, 59, 59);
        }

        private Map<String, Long> toMap(List<Object[]> raw) {
                Map<String, Long> map = new LinkedHashMap<>();
                raw.forEach(r -> map.put((String) r[0], ((Number) r[1]).longValue()));
                return map;
        }
}
