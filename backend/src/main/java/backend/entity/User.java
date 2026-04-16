package backend.entity;

import backend.Enum.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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

  @Enumerated(EnumType.STRING)
  private UserRole role;

  private String status;

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
