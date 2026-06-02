import React from "react";
import styles from "./CategoryTabs.module.css";

interface Category {
  id: number;
  name: string;
}

type Props = {
  categories?: Category[];

  activeCategory?: number;

  setActiveCategory: (value: number | undefined) => void;

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
      {/* VIEW ALL */}
      <button
        className={`${styles.categoryBtn} ${
          activeCategory === undefined
            ? styles.categoryBtnActive
            : ""
        }`}
        onClick={() => {
          setActiveCategory(undefined);
          setCurrentPage(1);
        }}
      >
        View All
      </button>

      {/* CATEGORY */}
      {categories?.map((cat) => (
        <button
          key={cat.id}
          className={`${styles.categoryBtn} ${
            activeCategory === cat.id
              ? styles.categoryBtnActive
              : ""
          }`}
          onClick={() => {
            setActiveCategory(cat.id);
            setCurrentPage(1);
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;