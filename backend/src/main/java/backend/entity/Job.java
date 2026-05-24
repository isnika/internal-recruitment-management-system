package backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import backend.Enum.JobStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "jobs")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString(exclude = { "company", "category", "experienceLevel", "skills", "applications" })
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Job {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  private String title;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(columnDefinition = "TEXT")
  private String requirements;

  @Column(columnDefinition = "TEXT")
  private String benefits;

  private Double salaryMin;
  private Double salaryMax;

  private String location;
  private String type;

  @Enumerated(EnumType.STRING)
  private JobStatus status;

  private LocalDate deadline;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  // FK
  @ManyToOne
  @JoinColumn(name = "company_id")
  private Company company;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;

  @ManyToOne
  @JoinColumn(name = "experience_level_id")
  private ExperienceLevel experienceLevel;

  // ManyToMany qua bảng job_skills
  @ManyToMany
  @JoinTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
  private Set<Skill> skills;

  @OneToMany(mappedBy = "job")
  private List<Application> applications;
}
