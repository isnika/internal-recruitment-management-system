package backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.Cv;

public interface CvRepository extends JpaRepository<Cv, Long> {

  List<Cv> findByUserId(Long userId);

  List<Cv> findByUserIdOrderByCreatedAtDesc(Long userId);

  Optional<Cv> findByIdAndUserId(Long id, Long userId);
}
