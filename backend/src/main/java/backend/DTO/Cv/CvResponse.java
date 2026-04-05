package backend.DTO.Cv;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CvResponse {

  private Long id;
  private String fileUrl;
  private LocalDateTime createdAt;
}