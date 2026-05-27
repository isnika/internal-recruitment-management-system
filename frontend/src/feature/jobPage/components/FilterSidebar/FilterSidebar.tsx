import React from "react";
import styles from "./FilterSidebar.module.css";
import type {
  JobFilterRequest,
  HomeMetadata,
} from "../../../../types/job";

interface Props {
  filters: JobFilterRequest;
  metadata: HomeMetadata | null;

  onStatusChange: (value: string) => void;
  onToggleSkill: (id: number) => void;
  onCategoryChange: (id: number) => void;

  onClearAll: () => void;
}

const FilterSidebar = ({
  filters,
  metadata,
  onStatusChange,
  onToggleSkill,
  onCategoryChange,
  onClearAll,
}: Props) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <span className={styles.title}>
          Bộ lọc tìm kiếm
        </span>

        <button
          className={styles.clearAllBtn}
          onClick={onClearAll}
        >
          Xóa tất cả
        </button>
      </div>

      {/* STATUS */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Trạng thái</span>
        </div>

        <select
          value={filters.status || ""}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className={styles.select}
        >
          <option value="">Tất cả</option>
          <option value="ACTIVE">
            Đang tuyển dụng
          </option>
          <option value="PAUSED">
            Tạm dừng
          </option>
          <option value="CLOSED">
            Đã đóng
          </option>
          <option value="DRAFT">
            Bản nháp
          </option>
        </select>
      </div>

      {/* CATEGORY */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Danh mục</span>
        </div>

        <div className={styles.list}>
          {metadata?.categories?.map((category) => (
            <label
              key={category.id}
              className={styles.item}
            >
              <input
                type="checkbox"
                checked={
                  filters.categoryId === category.id
                }
                onChange={() =>
                  onCategoryChange(category.id)
                }
              />

              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div className={styles.group}>
        <div className={styles.header}>
          <span>Kỹ năng</span>
        </div>

        <div className={styles.list}>
          {metadata?.skills?.map((skill) => {
            const checked =
              filters.skillIds?.includes(skill.id);

            return (
              <label
                key={skill.id}
                className={styles.item}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onToggleSkill(skill.id)
                  }
                />

                <span>{skill.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;