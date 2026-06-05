package backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
  private String logoStoragePublicId;
  private String logoStorageResourceType;
  private String status;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @JsonIgnore
  @OneToMany(mappedBy = "company")
  private List<Job> jobs;
}
