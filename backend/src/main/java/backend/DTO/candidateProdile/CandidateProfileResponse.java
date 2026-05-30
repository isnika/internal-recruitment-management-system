package backend.DTO.candidateProdile;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateProfileResponse {

    private Long id;
    private String gender;
    private LocalDate dateOfBirth;
    private String phone;
    private String address;

    private String taxCode;
    private String citizenId;
    private LocalDate releaseDate;

    private String socialLink;
    private String bankAccountName;
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private String status;
    private String avatarUrl;
}
