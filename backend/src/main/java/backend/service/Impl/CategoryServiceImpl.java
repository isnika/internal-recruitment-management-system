package backend.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.DTO.category.CategoryRequest;
import backend.DTO.category.CategoryResponse;
import backend.entity.Category;
import backend.exception.BadRequestException;
import backend.exception.ResourceNotFoundException;
import backend.mapper.CategoryMapper;
import backend.repository.CategoryRepository;
import backend.service.CategoryService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;

  @Override
  public List<CategoryResponse> getAllCategories() {
    return categoryRepository.findAll().stream()
        .map(CategoryMapper::toResponse)
        .toList();
  }

  @Override
  public CategoryResponse getCategoryById(Long id) {
    return CategoryMapper.toResponse(findCategoryById(id));
  }

  @Override
  @Transactional
  public CategoryResponse createCategory(CategoryRequest request) {
    validateRequest(request);
    validateDuplicateName(request.getName(), null);

    Category category = CategoryMapper.toEntity(request);
    return CategoryMapper.toResponse(categoryRepository.save(category));
  }

  @Override
  @Transactional
  public CategoryResponse updateCategory(Long id, CategoryRequest request) {
    validateRequest(request);

    Category category = findCategoryById(id);
    validateDuplicateName(request.getName(), category.getId());

    CategoryMapper.updateEntity(category, request);
    return CategoryMapper.toResponse(categoryRepository.save(category));
  }

  @Override
  @Transactional
  public void deleteCategory(Long id) {
    Category category = findCategoryById(id);
    categoryRepository.delete(category);
  }

  private void validateRequest(CategoryRequest request) {
    if (request == null || isBlank(request.getName())) {
      throw new BadRequestException("Name khong duoc de trong");
    }
  }

  private void validateDuplicateName(String name, Long currentId) {
    categoryRepository.findByNameIgnoreCase(name.trim())
        .ifPresent(existing -> {
          if (currentId == null || !existing.getId().equals(currentId)) {
            throw new BadRequestException("Category da ton tai");
          }
        });
  }

  private Category findCategoryById(Long id) {
    if (id == null) {
      throw new BadRequestException("Category id khong hop le");
    }

    return categoryRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay category voi id: " + id));
  }

  private boolean isBlank(String value) {
    return value == null || value.trim().isEmpty();
  }
}
