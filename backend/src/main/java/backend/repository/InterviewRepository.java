package backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.Interview;
import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

  Optional<Interview> findByApplicationId(Long applicationId);

  List<Interview> findByApplication_User_Id(Long userId);
}