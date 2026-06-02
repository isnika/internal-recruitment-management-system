import React from "react";
import styles from "./Pagination.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, setCurrentPage }: Props) => {
  if (totalPages <= 1) return null;

  // Hàm sinh mảng hiển thị số trang (ví dụ: [1, '...', 4, 5, 6, '...', 20])
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const siblingCount = 1; // Số lượng trang hiển thị ở 2 bên trang hiện tại

    // Luôn hiển thị trang đầu, trang cuối, trang hiện tại và các trang liền kề
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return pages;
  };

  const allPages = getPageNumbers();

  return (
    <nav className={styles.paginationContainer} aria-label="Pagination">
      <button
        className={styles.arrowBtn}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      <div className={styles.pageNumbers}>
        {allPages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className={styles.dots}>
                &#8230;
              </span>
            );
          }

          return (
            <button
              key={`page-${page}`}
              className={`${styles.pageBtn} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => setCurrentPage(Number(page))}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className={styles.arrowBtn}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;