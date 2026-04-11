package backend.service.Impl;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import backend.DTO.company.CompanyResponse;
import backend.DTO.company.CreateCompanyRequest;
import backend.entity.Company;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.mapper.CompanyMapper;
import backend.repository.CompanyRepository;
import backend.repository.JobRepository;
import backend.service.CompanyService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

  private static final Set<String> ALLOWED_EXTENSIONS = Set.of("jpg", "jpeg", "png", "webp");

  private final CompanyRepository companyRepository;
  private final JobRepository jobRepository;

  @Value("${file.upload-dir:uploads}")
  private String uploadDir;

  @Override
  public List<CompanyResponse> getAllCompanies(String keyword, String status) {
    List<Company> companies;

    if (!isBlank(keyword)) {
      companies = companyRepository.findByNameContainingIgnoreCase(keyword.trim());
    } else if (!isBlank(status)) {
      companies = companyRepository.findByStatus(status.trim().toUpperCase());
    } else {
      companies = companyRepository.findAll();
    }

    return companies.stream()
        .filter(company -> isBlank(status) || status.trim().equalsIgnoreCase(company.getStatus()))
        .map(CompanyMapper::toResponse)
        .toList();
  }

  @Override
  public CompanyResponse getCompanyById(Long id) {
    return CompanyMapper.toResponse(findCompanyById(id));
  }

  @Override
  @Transactional
  public CompanyResponse createCompany(CreateCompanyRequest request) {
    validateRequest(request);
    validateDuplicateName(request.getName(), null);

    Company company = CompanyMapper.toEntity(request);
    company.setStatus("ACTIVE");
    company.setCreatedAt(LocalDateTime.now());
    company.setUpdatedAt(LocalDateTime.now());

    return CompanyMapper.toResponse(companyRepository.save(company));
  }

  @Override
  @Transactional
  public CompanyResponse updateCompany(Long id, CreateCompanyRequest request) {
    validateRequest(request);

    Company company = findCompanyById(id);
    validateDuplicateName(request.getName(), company.getId());

    CompanyMapper.updateEntity(company, request);
    company.setUpdatedAt(LocalDateTime.now());

    return CompanyMapper.toResponse(companyRepository.save(company));
  }

  @Override
  @Transactional
  public CompanyResponse uploadCompanyLogo(Long id, MultipartFile file) {
    validateImageFile(file);

    Company company = findCompanyById(id);
    Path uploadPath = initUploadDirectory();

    String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
    String fileExtension = getFileExtension(originalFilename);
    String storedFilename = "company-logo-" + UUID.randomUUID() + "." + fileExtension;
    Path destination = uploadPath.resolve(storedFilename).normalize();

    if (!destination.startsWith(uploadPath)) {
      throw new BadRequestException("Duong dan file khong hop le");
    }

    try (InputStream inputStream = file.getInputStream()) {
      Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException exception) {
      throw new BadRequestException("Khong the luu file logo");
    }

    deletePhysicalFile(company.getLogoUrl());
    company.setLogoUrl("/uploads/" + storedFilename);
    company.setUpdatedAt(LocalDateTime.now());

    return CompanyMapper.toResponse(companyRepository.save(company));
  }

  @Override
  @Transactional
  public void deleteCompany(Long id) {
    Company company = findCompanyById(id);

    if (!jobRepository.findByCompanyId(id).isEmpty()) {
      throw new BadRequestException("Khong the xoa company dang duoc su dung trong job");
    }

    companyRepository.delete(company);
  }

  private Company findCompanyById(Long id) {
    if (id == null) {
      throw new BadRequestException("Company id khong hop le");
    }

    return companyRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay company voi id: " + id));
  }

  private void validateRequest(CreateCompanyRequest request) {
    if (request == null || isBlank(request.getName())) {
      throw new BadRequestException("Name khong duoc de trong");
    }
  }

  private void validateDuplicateName(String name, Long currentId) {
    companyRepository.findByNameIgnoreCase(name.trim())
        .ifPresent(existing -> {
          if (currentId == null || !existing.getId().equals(currentId)) {
            throw new BadRequestException("Company da ton tai");
          }
        });
  }

  private Path initUploadDirectory() {
    try {
      Path uploadPath = Path.of(uploadDir).toAbsolutePath().normalize();
      Files.createDirectories(uploadPath);
      return uploadPath;
    } catch (IOException exception) {
      throw new BadRequestException("Khong the tao thu muc uploads");
    }
  }

  private void validateImageFile(MultipartFile file) {
    if (file == null || file.isEmpty()) {
      throw new BadRequestException("File logo khong duoc de trong");
    }

    String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
    String fileExtension = getFileExtension(originalFilename);
    if (!ALLOWED_EXTENSIONS.contains(fileExtension)) {
      throw new BadRequestException("Chi ho tro file jpg, jpeg, png, webp");
    }
  }

  private String getFileExtension(String filename) {
    if (!StringUtils.hasText(filename) || !filename.contains(".")) {
      throw new BadRequestException("Ten file khong hop le");
    }

    return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
  }

  private void deletePhysicalFile(String fileUrl) {
    if (!StringUtils.hasText(fileUrl)) {
      return;
    }

    String relativeFileName = fileUrl.replace("/uploads/", "").trim();
    if (!StringUtils.hasText(relativeFileName)) {
      return;
    }

    Path uploadPath = initUploadDirectory();
    Path filePath = uploadPath.resolve(relativeFileName).normalize();

    if (!filePath.startsWith(uploadPath)) {
      throw new BadRequestException("Duong dan file logo khong hop le");
    }

    try {
      Files.deleteIfExists(filePath);
    } catch (IOException exception) {
      throw new BadRequestException("Khong the xoa file logo cu");
    }
  }

  private boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }
}
