package backend.DTO.interview;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * PATCH /api/interviews/{id}/result
 * Recruiter cập nhật kết quả sau buổi phỏng vấn.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateInterviewResultRequest {


    private String result;
    private String note;
}