package backend.service;

import backend.DTO.interview.CreateInterviewRequest;
import backend.entity.Interview;

import java.util.List;

public interface InterviewService {

    // ==================== CANDIDATE ====================
    List<Interview> getMyInterviews();

    Interview acceptInterview(Long id);

    Interview rejectInterview(Long id);

    // ==================== RECRUITER ====================
    Interview createInterview(CreateInterviewRequest request);
}