package backend.DTO.user;

import lombok.Data;


@Data
public class UpdateRecruitmentInfoRequest {
    private Long   companyId;    // Gan lai cong ty
    private String department;   // Phong ban
    private String jobTitle;     // Chuc danh noi bo
}
