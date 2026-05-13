package backend.mapper;

import backend.DTO.interview.CreateInterviewRequest;
import backend.DTO.interview.InterviewResponse;
import backend.entity.Application;
import backend.entity.Interview;
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

    return InterviewResponse.builder()
        .id(interview.getId())
        .scheduleTime(interview.getScheduleTime())
        .location(interview.getLocation())
        .status(interview.getStatus() != null ? interview.getStatus().name() : null)
        .result(interview.getResult())
        .note(interview.getNote())
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
