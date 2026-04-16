package backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "companies")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString(exclude = "jobs")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Company {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  private String name;
  private String description;
  private String address;
  private String website;
  private String logoUrl;
  private String status;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @JsonIgnore
  @OneToMany(mappedBy = "company")
  private List<Job> jobs;

  @OneToMany(mappedBy = "company")
  private List<User> recruiters;
}