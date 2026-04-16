package backend.DTO.Cv;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CvResponse {

  private Long id;
  private String fileUrl;
  private LocalDateTime createdAt;
}