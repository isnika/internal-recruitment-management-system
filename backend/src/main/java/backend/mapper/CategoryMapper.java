package backend.mapper;

import backend.DTO.category.CategoryResponse;
import backend.entity.Category;

public class CategoryMapper {

    public static CategoryResponse toResponse(Category category) {
        if (category == null) return null;

        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}