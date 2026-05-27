import React from "react";
import styles from "./JobPage.module.css";

import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import JobList from "../components/JobList/JobList";
import Pagination from "../components/Pagination/Pagination";
import JobHeader from "../components/JobHeader/JobHeader";

import { useHomeMetadata } from "../../../hooks/useHomeMetadata";
import {
  useJobs,
  JOBS_PER_PAGE,
} from "../../../hooks/useJobs";

const JobPage = () => {
  const { metadata, isMetaLoading } = useHomeMetadata();

  const {
    jobs,
    totalJobs,
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,

    filters,

    handleToggleSkill,
    handleSetCategory,
    handleSetStatus,
    handleClearAll,
    handleBookmark,
    handleKeywordsChange,
    handleLocationChange,
    handleMinSalaryChange,
    handleMaxSalaryChange,
    handleSetJobType,
  } = useJobs();

  const startIndex =
    (currentPage - 1) * JOBS_PER_PAGE;

  if (isMetaLoading) {
    return (
      <div className={styles.loading}>
        Đang tải dữ liệu...
      </div>
    );
  }
console.log(metadata);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bodyLayout}>
        {/* FILTER */}
        <aside className={styles.filterSidebar}>
          <FilterSidebar
            filters={filters}
            metadata={metadata}
            onKeywordsChange={handleKeywordsChange}
            onLocationChange={handleLocationChange}
            onMinSalaryChange={handleMinSalaryChange}
            onMaxSalaryChange={handleMaxSalaryChange}
            onJobTypeChange={handleSetJobType}
            onStatusChange={handleSetStatus}
            onToggleSkill={handleToggleSkill}
            onCategoryChange={handleSetCategory}
            onClearAll={handleClearAll}
          />
        </aside>

        {/* JOB CONTENT */}
        <main className={styles.jobsColumn}>
          <CategoryTabs
            categories={metadata?.categories}
            activeCategory={filters.categoryId}
            setActiveCategory={handleSetCategory}
            setCurrentPage={setCurrentPage}
          />

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