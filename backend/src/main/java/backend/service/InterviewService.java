package backend.service;

import backend.DTO.interview.CreateInterviewRequest;
import backend.DTO.interview.InterviewResponse;
import backend.DTO.interview.UpdateInterviewResultRequest;
import backend.DTO.interview.UpdateInterviewScheduleRequest;
import backend.DTO.interview.UpdateInterviewStatusRequest;

import java.util.List;

public interface InterviewService {

    // ==================== CANDIDATE ====================
    List<InterviewResponse> getMyInterviews();

    InterviewResponse acceptInterview(Long id);

    InterviewResponse rejectInterview(Long id);

    InterviewResponse getInterviewById(Long id);

    // ==================== RECRUITER ====================
    InterviewResponse createInterview(CreateInterviewRequest request);

    InterviewResponse updateInterviewStatus(Long id, UpdateInterviewStatusRequest request);

    InterviewResponse updateInterviewResult(Long id, UpdateInterviewResultRequest request);

    // ==================== ADMIN ====================
    List<InterviewResponse> getAllInterviews();

    InterviewResponse updateInterviewSchedule(Long id, UpdateInterviewScheduleRequest request);
}