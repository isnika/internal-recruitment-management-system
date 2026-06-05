package backend.mapper;

import backend.DTO.application.ApplicationResponse;
import backend.DTO.application.CreateApplicationRequest;
import backend.entity.Application;
import backend.entity.Cv;
import backend.entity.Job;
import backend.entity.User;
import backend.Enum.ApplicationStatus;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ApplicationMapper {

  public static Application toEntity(CreateApplicationRequest request, User user, Job job, Cv cv) {
    if (request == null) {
      return null;
    }

    return Application.builder()
            .user(user)
            .job(job)
            .cv(cv)
            .intro(request.getIntro())
            .expectedSalary(request.getExpectedSalary())
            .startDate(request.getStartDate())
            .build();
  }

  public static ApplicationResponse toResponse(Application application) {
    if (application == null) {
      return null;
    }

    return ApplicationResponse.builder()
            .id(application.getId())
            .status(application.getStatus() != null ? application.getStatus().toValue() : null)
            .appliedAt(application.getAppliedAt())
            .intro(application.getIntro())
            .expectedSalary(application.getExpectedSalary())
            .startDate(application.getStartDate())
            .user(UserMapper.toResponse(application.getUser()))
            .job(JobMapper.toResponse(application.getJob()))
            .cv(CvMapper.toResponse(application.getCv()))
            .build();
  }
}