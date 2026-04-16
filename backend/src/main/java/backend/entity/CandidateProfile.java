package backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "candidate_profiles")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CandidateProfile {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
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

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;
}
