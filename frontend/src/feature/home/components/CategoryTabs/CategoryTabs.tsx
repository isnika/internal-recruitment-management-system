import React from "react";
import styles from "./CategoryTabs.module.css";

type Props = {
  categories?: string[];
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  setCurrentPage: (page: number) => void;
};

const CategoryTabs = ({
  categories,
  activeCategory,
  setActiveCategory,
  setCurrentPage,
}: Props) => {
  return (
    <div className={styles.categoriesList}>
      <button
        className={`${styles.categoryBtn} ${
          activeCategory === "View All"
            ? styles.categoryBtnActive
            : ""
        }`}
        onClick={() => setActiveCategory("View All")}
      >
        View All
      </button>

      {categories?.map(cat => (
        <button
          key={cat}
          className={`${styles.categoryBtn} ${
            activeCategory === cat
              ? styles.categoryBtnActive
              : ""
          }`}
          onClick={() => {
            setActiveCategory(cat);
            setCurrentPage(1);
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;