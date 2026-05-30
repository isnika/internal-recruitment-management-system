package backend.service;

import java.util.List;

import backend.DTO.category.CategoryRequest;
import backend.DTO.category.CategoryResponse;

public interface CategoryService {

  List<CategoryResponse> getAllCategories();

  CategoryResponse getCategoryById(Long id);

  CategoryResponse createCategory(CategoryRequest request);

  CategoryResponse updateCategory(Long id, CategoryRequest request);

  void deleteCategory(Long id);
}
