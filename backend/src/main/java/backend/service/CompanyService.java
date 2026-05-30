package backend.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import backend.DTO.company.CompanyResponse;
import backend.DTO.company.CreateCompanyRequest;
import backend.DTO.company.UpdateCompanyRequest;

public interface CompanyService {

  List<CompanyResponse> getAllCompanies(String keyword, String status);

  CompanyResponse getCompanyById(Long id);

  CompanyResponse createCompany(CreateCompanyRequest request);

  CompanyResponse updateCompany(Long id, UpdateCompanyRequest request);

  CompanyResponse uploadCompanyLogo(Long id, MultipartFile file);

  void deleteCompany(Long id);
}
