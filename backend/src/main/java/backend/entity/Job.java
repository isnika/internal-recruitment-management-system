package backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "jobs")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString(exclude = { "company", "backend/DTO/category", "experienceLevel", "skills", "applications" })
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
  private String status;

  private LocalDate deadline;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @ManyToOne
  @JoinColumn(name = "company_id")
  private Company company;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;

  @ManyToOne
  @JoinColumn(name = "experience_level_id")
  private ExperienceLevel experienceLevel;

  @ManyToMany
  @JoinTable(
          name = "job_skills",
          joinColumns = @JoinColumn(name = "job_id"),
          inverseJoinColumns = @JoinColumn(name = "skill_id"))
  private Set<Skill> skills;

  @OneToMany(mappedBy = "job")
  private List<Application> applications;
}