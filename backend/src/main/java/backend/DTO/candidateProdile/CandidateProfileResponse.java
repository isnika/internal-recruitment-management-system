package backend.DTO.candidateProdile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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

    private String socialLink;
    private String bankAccountName;
}
