package backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.Interview;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

  Optional<Interview> findByApplicationId(Long applicationId);
}
