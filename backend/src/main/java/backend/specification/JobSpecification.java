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

      // 1. Tìm theo từ khoá
      if (request.getKeywords() != null && !request.getKeywords().isBlank()) {
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

      // 3. Lọc theo địa điểm
      if (request.getLocation() != null && !request.getLocation().isBlank()) {
        predicates.add(cb.like(
                cb.lower(root.get("location")),
                "%" + request.getLocation().toLowerCase() + "%"));
      }

      // 4. Lọc theo skill
      if (request.getSkillIds() != null && !request.getSkillIds().isEmpty()) {
        Join<Job, Skill> skillJoin = root.join("skills");
        predicates.add(skillJoin.get("id").in(request.getSkillIds()));
        query.distinct(true);
      }

      // 5. Lọc theo category
      if (request.getCategoryId() != null) {
        predicates.add(cb.equal(root.get("category").get("id"), request.getCategoryId()));
      }

      // 6. Lọc theo loại công việc: FULL_TIME / PART_TIME / REMOTE /
      if (request.getJobType() != null && !request.getJobType().isBlank()) {
        predicates.add(cb.equal(
                cb.lower(root.get("type")),
                request.getJobType().toLowerCase()));
      }

      // 7. Lọc theo trạng thái job: OPEN / CLOSED
      if (request.getStatus() != null && !request.getStatus().isBlank()) {
        predicates.add(cb.equal(
                cb.lower(root.get("status")),
                request.getStatus().toLowerCase()));
      }

      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}