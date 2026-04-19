package backend.controller;

import backend.DTO.interview.CreateInterviewRequest;
import backend.DTO.interview.InterviewResponse;
import backend.mapper.InterviewMapper;
import backend.entity.Interview;
import backend.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    // ================= CANDIDATE - XEM LỊCH =================
    @GetMapping("/my")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<List<InterviewResponse>> getMyInterviews() {

        List<Interview> interviews = interviewService.getMyInterviews();

        List<InterviewResponse> response = interviews.stream()
                .map(InterviewMapper::toResponse)
                .toList();

        return ResponseEntity.ok(response);
    }

    // ================= CANDIDATE - ACCEPT =================
    @PostMapping("/{id}/accept")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<InterviewResponse> accept(@PathVariable Long id) {

        Interview interview = interviewService.acceptInterview(id);

        return ResponseEntity.ok(
                InterviewMapper.toResponse(interview)
        );
    }

    // ================= CANDIDATE - REJECT =================
    @PostMapping("/{id}/reject")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<InterviewResponse> reject(@PathVariable Long id) {

        Interview interview = interviewService.rejectInterview(id);

        return ResponseEntity.ok(
                InterviewMapper.toResponse(interview)
        );
    }

    // ================= RECRUITER - CREATE =================
    @PostMapping
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    public ResponseEntity<InterviewResponse> createInterview(
            @RequestBody CreateInterviewRequest request
    ) {

        Interview interview = interviewService.createInterview(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(InterviewMapper.toResponse(interview));
    }
}