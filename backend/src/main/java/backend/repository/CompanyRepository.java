package backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

  List<Company> findByStatus(String status);

  List<Company> findByNameContainingIgnoreCase(String keyword);

  Optional<Company> findByNameIgnoreCase(String name);
}