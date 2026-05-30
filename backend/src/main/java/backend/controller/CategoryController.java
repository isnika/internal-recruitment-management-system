package backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.DTO.category.CategoryRequest;
import backend.DTO.category.CategoryResponse;
import backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

  private final CategoryService categoryService;

  @GetMapping
  public ResponseEntity<List<CategoryResponse>> getAllCategories() {
    return ResponseEntity.ok(categoryService.getAllCategories());
  }

  @GetMapping("/{id}")
  public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long id) {
    return ResponseEntity.ok(categoryService.getCategoryById(id));
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<CategoryResponse> createCategory(
      @Valid @RequestBody CategoryRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(categoryService.createCategory(request));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<CategoryResponse> updateCategory(
      @PathVariable Long id,
      @Valid @RequestBody CategoryRequest request) {
    return ResponseEntity.ok(categoryService.updateCategory(id, request));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
    categoryService.deleteCategory(id);
    return ResponseEntity.noContent().build();
  }
}
