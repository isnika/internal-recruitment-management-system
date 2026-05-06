import React, { useRef, useState } from "react";
import styles from "./Home.module.css";

import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";

import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../../service/authApi";

import { useHomeMetadata } from "../../../../hooks/useHomeMetadata";
import { useJobs } from "../../../../hooks/useJobs";

import HeroBanner from "../../components/HeroBanner/HeroBanner";
import CategoryTabs from "../../components/CategoryTabs/CategoryTabs";
import JobHeader from "../../components/JobHeader/JobHeader";
import JobList from "../../components/JobList/JobList";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const jobListRef = useRef<HTMLDivElement | null>(null);

  const [activeCategory, setActiveCategory] = useState("View All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const handleApplyNow = () => {
    const user = getCurrentUser();
    if (!user) return navigate("/login");

    jobListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;

  if (isMetaLoading) {
    return <div className={styles.loadingInfo}>Loading filters...</div>;
  }

  return (
    <div className={styles.wrapper}>

      <HeroBanner
        isFilterOpen={isFilterOpen}
        onApply={handleApplyNow}
      />

      {/* BODY */}
      <div className={styles.bodyLayout}>
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
            jobListRef={jobListRef}
            handleBookmark={handleBookmark}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>

      <div className={styles.backToTop}>
        <a href="#top">Return to top of page</a>
      </div>
    </div>
  );
};

export default Home;

