package backend.mapper;

import backend.DTO.category.CategoryRequest;
import backend.DTO.category.CategoryResponse;
import backend.entity.Category;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class CategoryMapper {

  public static CategoryResponse toResponse(Category category) {
    if (category == null) {
      return null;
    }

    return CategoryResponse.builder()
        .id(category.getId())
        .name(category.getName())
        .build();
  }

  public static Category toEntity(CategoryRequest request) {
    if (request == null) {
      return null;
    }

    return Category.builder()
        .name(request.getName().trim())
        .build();
  }

  public static void updateEntity(Category category, CategoryRequest request) {
    if (category == null || request == null) {
      return;
    }

    category.setName(request.getName().trim());
  }
}
