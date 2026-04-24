package backend.mapper;

import backend.DTO.company.CompanyResponse;
import backend.DTO.company.CreateCompanyRequest;
import backend.entity.Company;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class CompanyMapper {

  public static Company toEntity(CreateCompanyRequest request) {
    if (request == null) {
      return null;
    }

    return Company.builder()
        .name(request.getName() != null ? request.getName().trim() : null)
        .description(request.getDescription())
        .address(request.getAddress())
        .website(request.getWebsite())
        .build();
  }

  public static CompanyResponse toResponse(Company company) {
    if (company == null) {
      return null;
    }

    return CompanyResponse.builder()
        .id(company.getId())
        .name(company.getName())
        .description(company.getDescription())
        .address(company.getAddress())
        .website(company.getWebsite())
        .logoUrl(company.getLogoUrl())
        .status(company.getStatus())
        .build();
  }

  public static void updateEntity(Company company, CreateCompanyRequest request) {
    if (company == null || request == null) {
      return;
    }

    company.setName(request.getName() != null ? request.getName().trim() : null);
    company.setDescription(request.getDescription());
    company.setAddress(request.getAddress());
    company.setWebsite(request.getWebsite());
  }
}
