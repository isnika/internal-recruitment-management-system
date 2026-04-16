package backend.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString(exclude = "jobs")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Skill {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  private String name;

  @JsonIgnore
  @ManyToMany(mappedBy = "skills")
  private Set<Job> jobs;
}