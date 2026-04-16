package backend.controller;

import backend.DTO.interview.CreateInterviewRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import backend.entity.Interview;
import backend.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;
    
    // CANDIDATE - XEM LỊCH

    @GetMapping("/my")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<List<Interview>> getMyInterviews() {
        return ResponseEntity.ok(interviewService.getMyInterviews());
    }


    // CANDIDATE - ACCEPT

    @PostMapping("/{id}/accept")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Interview> accept(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.acceptInterview(id));
    }

    // CANDIDATE - REJECT

    @PostMapping("/{id}/reject")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Interview> reject(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.rejectInterview(id));
    }

    // =========================
    // RECRUITER - CREATE INTERVIEW
    // =========================
    @PostMapping
    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    public ResponseEntity<Interview> createInterview(
            @RequestBody CreateInterviewRequest request
    ) {
        Interview interview = interviewService.createInterview(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(interview);
    }
}