package backend.mapper;

import backend.DTO.Cv.CvResponse;
import backend.entity.Cv;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class CvMapper {

  public static CvResponse toResponse(Cv cv) {
    if (cv == null) {
      return null;
    }

    return CvResponse.builder()
        .id(cv.getId())
        .fileUrl(cv.getFileUrl())
        .createdAt(cv.getCreatedAt())
        .build();
  }
}
