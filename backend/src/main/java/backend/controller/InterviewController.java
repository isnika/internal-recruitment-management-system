package backend.controller;

import backend.DTO.ApiResponse;
import backend.DTO.interview.CreateInterviewRequest;
import backend.DTO.interview.InterviewResponse;
import backend.DTO.interview.UpdateInterviewResultRequest;
import backend.DTO.interview.UpdateInterviewScheduleRequest;
import backend.DTO.interview.UpdateInterviewStatusRequest;
import backend.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    private <T> ApiResponse<T> wrap(T data, String message, int status) {
        return ApiResponse.<T>builder()
                .status(status)
                .message(message)
                .data(data)
                .build();
    }

    // ================= ADMIN =================

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<InterviewResponse>>> getAllInterviews() {
        return ResponseEntity.ok(
                wrap(interviewService.getAllInterviews(), "Get all interviews success", 200));
    }

    // ================= CANDIDATE =================

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<InterviewResponse>>> getMyInterviews() {
        return ResponseEntity.ok(
                wrap(interviewService.getMyInterviews(), "Get my interviews success", 200));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InterviewResponse>> getInterviewById(@PathVariable Long id) {
        return ResponseEntity.ok(
                wrap(interviewService.getInterviewById(id), "Get interview success", 200));
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<ApiResponse<InterviewResponse>> acceptInterview(@PathVariable Long id) {
        return ResponseEntity.ok(
                wrap(interviewService.acceptInterview(id), "Accept interview success", 200));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<InterviewResponse>> rejectInterview(@PathVariable Long id) {
        return ResponseEntity.ok(
                wrap(interviewService.rejectInterview(id), "Reject interview success", 200));
    }

    // ================= RECRUITER =================

    @PostMapping
    public ResponseEntity<ApiResponse<InterviewResponse>> createInterview(
            @RequestBody CreateInterviewRequest request) {
        return ResponseEntity.ok(
                wrap(interviewService.createInterview(request), "Create interview success", 201));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    public ResponseEntity<ApiResponse<InterviewResponse>> updateInterviewStatus(
            @PathVariable Long id,
            @RequestBody UpdateInterviewStatusRequest request) {
        return ResponseEntity.ok(
                wrap(interviewService.updateInterviewStatus(id, request),
                        "Update interview status success", 200));
    }

    @PatchMapping("/{id}/result")
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    public ResponseEntity<ApiResponse<InterviewResponse>> updateInterviewResult(
            @PathVariable Long id,
            @RequestBody UpdateInterviewResultRequest request) {
        return ResponseEntity.ok(
                wrap(interviewService.updateInterviewResult(id, request),
                        "Update interview result success", 200));
    }

    @PatchMapping("/{id}/schedule")
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    public ResponseEntity<ApiResponse<InterviewResponse>> updateInterviewSchedule(
            @PathVariable Long id,
            @RequestBody UpdateInterviewScheduleRequest request) {
        return ResponseEntity.ok(
                wrap(interviewService.updateInterviewSchedule(id, request),
                        "Reschedule interview success", 200));
    }
}