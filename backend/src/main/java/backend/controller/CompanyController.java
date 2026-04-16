package backend.controller;

import java.util.List;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import backend.DTO.company.CompanyResponse;
import backend.DTO.company.CreateCompanyRequest;
import backend.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/companies")
public class CompanyController {

  private final CompanyService companyService;

  @GetMapping
  public ResponseEntity<List<CompanyResponse>> getAllCompanies(
          @RequestParam(required = false) String keyword,
          @RequestParam(required = false) String status) {
    return ResponseEntity.ok(companyService.getAllCompanies(keyword, status));
  }

  @GetMapping("/{id}")
  public ResponseEntity<CompanyResponse> getCompanyById(@PathVariable Long id) {
    return ResponseEntity.ok(companyService.getCompanyById(id));
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<CompanyResponse> createCompany(@Valid @RequestBody CreateCompanyRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(companyService.createCompany(request));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<CompanyResponse> updateCompany(
          @PathVariable Long id,
          @Valid @RequestBody CreateCompanyRequest request) {
    return ResponseEntity.ok(companyService.updateCompany(id, request));
  }

  @PostMapping(value = "/{id}/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<CompanyResponse> uploadCompanyLogo(
          @PathVariable Long id,
          @RequestPart("file") MultipartFile file) {
    return ResponseEntity.ok(companyService.uploadCompanyLogo(id, file));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
    companyService.deleteCompany(id);
    return ResponseEntity.noContent().build();
  }
}