package backend.DTO.user;

import lombok.Data;

/**
 * PATCH /api/users/me/profile
 * Cap nhat thong tin ca nhan user: ten, avatar (URL)
 */
@Data
public class UpdateProfileRequest {
    private String firstName;
    private String lastName;
    // avatarUrl chi dung khi upload rieng; truong nay cho phep set URL thu cong neu can
    private String avatarUrl;
}
