package backend.specification;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import backend.DTO.job.JobFilterRequest;
import backend.entity.Job;
import backend.entity.Skill;

public class JobSpecification {
  public static Specification<Job> filter(JobFilterRequest request) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();

      // tim theo ten job
      if (request.getKeywords() != null) {
        String[] keywords = request.getKeywords().toLowerCase().split("\\s+");

        List<Predicate> keywordPredicates = new ArrayList<>();

        for (String keyword : keywords) {
          keywordPredicates.add(
              cb.like(cb.lower(root.get("title")), "%" + keyword + "%"));
        }

        predicates.add(cb.or(keywordPredicates.toArray(new Predicate[0])));
      }
      // 2. Lọc theo lương
      if (request.getMinSalary() != null) {
        predicates.add(cb.greaterThanOrEqualTo(
            root.get("salaryMin"), request.getMinSalary()));
      }

      if (request.getMaxSalary() != null) {
        predicates.add(cb.lessThanOrEqualTo(
            root.get("salaryMax"), request.getMaxSalary()));
      }
      // location
      if (request.getLocation() != null) {
        predicates.add(cb.like(
            cb.lower(root.get("location")),
            "%" + request.getLocation().toLowerCase() + "%"));
      }
      // skill
      if (request.getSkillIds() != null && !request.getSkillIds().isEmpty()) {
        Join<Job, Skill> skillJoin = root.join("skills");
        predicates.add(skillJoin.get("id").in(request.getSkillIds()));
        query.distinct(true);
      }

      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}
