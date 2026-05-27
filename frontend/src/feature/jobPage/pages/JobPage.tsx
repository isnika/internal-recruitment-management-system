import React, { useState, useEffect } from "react";
import styles from "./JobPage.module.css";

import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import JobList from "../components/JobList/JobList";
import Pagination from "../components/Pagination/Pagination";
import JobHeader from "../components/JobHeader/JobHeader";

import { useHomeMetadata } from "../../../hooks/useHomeMetadata";
import { useJobs } from "../../../hooks/useJobs";

const JobPage = () => {
  const [activeCategory, setActiveCategory] = useState<number | undefined>(undefined);

  const { metadata, isMetaLoading } = useHomeMetadata();

  const {
    jobs,
    totalJobs,       // <-- FIX: Thêm totalJobs lấy từ hook ra
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    filters,
    handleBookmark,
    handleToggleFilter,
    handleClearGroup,
    handleClearAll,
    JOBS_PER_PAGE,   // <-- FIX: Thêm JOBS_PER_PAGE lấy từ hook ra
  } = useJobs(activeCategory, !!metadata);

  // <-- FIX: Tính toán startIndex dựa trên số trang hiện tại và số lượng job mỗi trang
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;

  // Reset về trang 1 mỗi khi đổi Category Tab
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, setCurrentPage]);

  if (isMetaLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bodyLayout}>

        {/* KHUNG LỌC (Cố định ở bên trái) */}
        <aside className={styles.filterSidebar}>
          <FilterSidebar
            filters={filters}
            metadata={metadata}
            onToggle={handleToggleFilter}
            onClearGroup={handleClearGroup}
            onClearAll={handleClearAll}
          />
        </aside>

        {/* KHUNG NỘI DUNG CHÍNH (Ở bên phải) */}
        <main className={styles.jobsColumn}>

          {/* HỆ THỐNG TAB DANH MỤC */}
          <CategoryTabs
            categories={metadata?.categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            setCurrentPage={setCurrentPage}
          />

          {/* HIỂN THỊ SỐ LƯỢNG KẾT QUẢ TÌM KIẾM */}
          <JobHeader
            startIndex={startIndex}
            jobsPerPage={JOBS_PER_PAGE}
            totalJobs={totalJobs}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />

          {/* DANH SÁCH VIỆC LÀM */}
          <JobList
            jobs={jobs}
            isLoading={isLoading}
            handleBookmark={handleBookmark}
          />


        </main>
      </div>
    </div>
  );
};

export default JobPage;