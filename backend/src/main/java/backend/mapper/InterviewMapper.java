package backend.mapper;

import backend.DTO.interview.CreateInterviewRequest;
import backend.DTO.interview.InterviewResponse;
import backend.entity.Application;
import backend.entity.Interview;
import backend.entity.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class InterviewMapper {

  public static Interview toEntity(CreateInterviewRequest request, Application application) {
    if (request == null) {
      return null;
    }

    return Interview.builder()
            .scheduleTime(request.getScheduleTime())
            .location(request.getLocation())
            .note(request.getNote())
            .application(application)
            .build();
  }

  public static InterviewResponse toResponse(Interview interview) {
    if (interview == null) {
      return null;
    }

    Application app = interview.getApplication();
    User candidate = (app != null) ? app.getUser() : null;

    return InterviewResponse.builder()
            .id(interview.getId())
            .scheduleTime(interview.getScheduleTime())
            .location(interview.getLocation())
            .status(interview.getStatus())
            .result(interview.getResult())
            .note(interview.getNote())
            // Application
            .applicationId(app != null ? app.getId() : null)
            .applicationStatus(app != null && app.getStatus() != null
                    ? app.getStatus().name() : null)
            // Candidate
            .candidateId(candidate != null ? candidate.getId() : null)
            .candidateName(candidate != null
                    ? candidate.getFirstName() + " " + candidate.getLastName() : null)
            .candidateEmail(candidate != null ? candidate.getEmail() : null)
            // Job
            .jobId(app != null && app.getJob() != null ? app.getJob().getId() : null)
            .jobTitle(app != null && app.getJob() != null ? app.getJob().getTitle() : null)
            .companyName(app != null && app.getJob() != null && app.getJob().getCompany() != null
                    ? app.getJob().getCompany().getName() : null)
            .build();
  }

  public static void updateEntity(Interview interview, CreateInterviewRequest request) {
    if (interview == null || request == null) {
      return;
    }

    interview.setScheduleTime(request.getScheduleTime());
    interview.setLocation(request.getLocation());
    interview.setNote(request.getNote());
  }
}