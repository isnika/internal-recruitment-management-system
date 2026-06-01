package backend.DTO.interview;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateInterviewScheduleRequest {

    private LocalDateTime scheduleTime;

    private String location;

    private String note;
}