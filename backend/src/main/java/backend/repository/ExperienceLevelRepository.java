package backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.ExperienceLevel;

public interface ExperienceLevelRepository extends JpaRepository<ExperienceLevel, Long> {

  Optional<ExperienceLevel> findByNameIgnoreCase(String name);
}
