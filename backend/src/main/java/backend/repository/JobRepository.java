package backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

  @Override
  @EntityGraph(attributePaths = { "company", "category", "experienceLevel", "skills" })
  List<Job> findAll();

  @Override
  @EntityGraph(attributePaths = { "company", "category", "experienceLevel", "skills" })
  Optional<Job> findById(Long id);

  List<Job> findByStatus(String status);

  List<Job> findByCompanyId(Long companyId);

  List<Job> findByCategoryId(Long categoryId);

  List<Job> findByExperienceLevelId(Long experienceLevelId);

  List<Job> findBySkillsId(Long skillId);

  List<Job> findByTitleContainingIgnoreCase(String keyword);

  List<Job> findByLocationContainingIgnoreCase(String location);

  List<Job> findByDeadlineAfter(LocalDate date);
}
