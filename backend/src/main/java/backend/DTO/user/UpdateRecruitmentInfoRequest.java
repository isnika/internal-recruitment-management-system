package backend.DTO.user;

import lombok.Data;

/**
 * PATCH /api/users/me/recruitment-info
 * Recruiter/Admin cap nhat thong tin tuyen dung: cong ty, phong ban, chuc danh
 */
@Data
public class UpdateRecruitmentInfoRequest {
    private Long   companyId;    // Gan lai cong ty
    private String department;   // Phong ban (them vao User entity neu chua co)
    private String jobTitle;     // Chuc danh noi bo
}
