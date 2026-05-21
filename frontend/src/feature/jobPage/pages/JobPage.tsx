import React, { useState } from "react";
import styles from "./JobPage.module.css";

import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import JobHeader from "../components/JobHeader/JobHeader";
import JobList from "../components/JobList/JobList";
import Pagination from "../components/Pagination/Pagination";

import { useHomeMetadata } from "../../../hooks/useHomeMetadata";
import { useJobs } from "../../../hooks/useJobs";

const JobPage = () => {
  const [activeCategory, setActiveCategory] = useState("View All");
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const { metadata, isMetaLoading } = useHomeMetadata();

  const {
    jobs,
    totalJobs,
    totalPages,
    currentPage,
    setCurrentPage,
    isLoading,
    filters,
    handleBookmark,
    handleToggleFilter,
    handleClearGroup,
    handleClearAll,
    activeCount,
    JOBS_PER_PAGE,
  } = useJobs(activeCategory, !!metadata);

  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;

  if (isMetaLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bodyLayout}>

        {/* FILTER SIDEBAR */}
        {isFilterOpen && (
          <aside className={styles.filterSidebar}>
            <FilterSidebar
              filters={filters}
              metadata={metadata}
              onToggle={handleToggleFilter}
              onClearGroup={handleClearGroup}
              onClearAll={handleClearAll}
            />
          </aside>
        )}

        {/* MAIN CONTENT */}
        <main className={styles.jobsColumn}>

          <CategoryTabs
            categories={metadata?.categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            setCurrentPage={setCurrentPage}
          />

          <JobHeader
            startIndex={startIndex}
            jobsPerPage={JOBS_PER_PAGE}
            totalJobs={totalJobs}
            isFilterOpen={isFilterOpen}
            activeCount={activeCount}
            setIsFilterOpen={setIsFilterOpen}
          />

          <JobList
            jobs={jobs}
            isLoading={isLoading}
            handleBookmark={handleBookmark}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
};

export default JobPage;