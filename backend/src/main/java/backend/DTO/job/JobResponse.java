package backend.DTO.job;

import java.time.LocalDate;
import java.util.List;

import backend.DTO.category.CategoryResponse;
import backend.DTO.company.CompanyResponse;
import backend.DTO.experiencelevel.ExperienceLevelResponse;
import backend.DTO.skill.SkillResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobResponse {

    private Long id;
    private String title;
    private String description;
    private String requirements;
    private String benefits;

    private Double salaryMin;
    private Double salaryMax;

    private String location;
    private String type;
    private String status;

    private LocalDate deadline;

    private CompanyResponse company;
    private CategoryResponse category;
    private ExperienceLevelResponse experienceLevel;

    private List<SkillResponse> skills;
}
