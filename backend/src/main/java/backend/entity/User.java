package backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import backend.Enum.UserRole;
import backend.Enum.UserStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String email;

  private String password;

  private String firstName;
  private String lastName;

  private String avatarUrl;
  private String avatarStoragePublicId;
  private String avatarStorageResourceType;

  private String phone;
  private String gender;
  private java.time.LocalDate dateOfBirth;

  @Enumerated(EnumType.STRING)
  private UserRole role;

  @Enumerated(EnumType.STRING)
  private UserStatus status;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  // Quan hệ
  @OneToMany(mappedBy = "user")
  private List<Application> applications;

  @OneToMany(mappedBy = "user")
  private List<Cv> cvs;

  @OneToOne(mappedBy = "user")
  private CandidateProfile profile;

  @ManyToOne
  @JoinColumn(name = "company_id")
  private Company company;

  @OneToMany(mappedBy = "user")
  private List<Notification> notifications;
}