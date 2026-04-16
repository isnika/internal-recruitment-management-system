package backend.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "experience_levels")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ExperienceLevel {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @OneToMany(mappedBy = "experienceLevel")
  private List<Job> jobs;
}