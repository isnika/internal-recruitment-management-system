package backend.repository;

import backend.entity.Cv;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CvRepository extends JpaRepository<Cv, Long> {

  List<Cv> findByUserId(Long userId);
}
