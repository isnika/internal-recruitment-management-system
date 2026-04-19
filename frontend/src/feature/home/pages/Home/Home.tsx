import React, { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";

import type { Job, HomeMetadata, JobFilters } from "../../../../service/jobApi";
import {
  fetchJobsApi,
  fetchMetadataApi,
  toggleBookmarkApi,
} from "../../../../service/jobApi";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";

import JobCard from "../../../job/components/JobCard/JobCard";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";

import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../../service/authApi";

const JOBS_PER_PAGE = 5;

const emptyFilters: JobFilters = {
  jobTypes: [],
  experienceLevels: [],
  departments: [],
  salaryRanges: [],
  skillTags: [],
};

const Home = () => {
  // ✅ FIX: hooks phải nằm trên cùng
  const navigate = useNavigate();
  const jobListRef = useRef<HTMLDivElement | null>(null);

  const [activeCategory, setActiveCategory] = useState("View All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState<JobFilters>({ ...emptyFilters });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [metadata, setMetadata] = useState<HomeMetadata | null>(null);

  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isMetaLoading, setIsMetaLoading] = useState(true);

  // ===== APPLY NOW =====
  const handleApplyNow = () => {
    const user = getCurrentUser();

    if (!user) {
      navigate("/login");
      return;
    }

    jobListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ===== LOAD METADATA =====
  useEffect(() => {
    const getMeta = async () => {
      try {
        const data = await fetchMetadataApi();
        setMetadata(data);
      } catch (err) {
        console.error("Lỗi metadata:", err);
      } finally {
        setIsMetaLoading(false);
      }
    };
    getMeta();
  }, []);

  // ===== LOAD JOBS =====
  useEffect(() => {
    if (!metadata) return;

    const getJobs = async () => {
      setIsLoading(true);
      try {
        const filterCount = Object.values(filters).reduce(
          (acc, curr) => acc + curr.length,
          0
        );

        const res = await fetchJobsApi(
          activeCategory,
          currentPage,
          JOBS_PER_PAGE,
          filterCount > 0 ? filters : undefined
        );

        setJobs(res.jobs);
        setTotalJobs(res.total);
        setTotalPages(res.totalPages);
        setCurrentPage(res.currentPage);
      } catch (err) {
        console.error("Lỗi jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getJobs();
  }, [activeCategory, currentPage, filters, metadata]);

  // ===== BOOKMARK =====
  const handleBookmark = async (id: string) => {
    try {
      await toggleBookmarkApi(id);

      setJobs(prev =>
        prev.map(job =>
          job.id === id
            ? { ...job, isBookmarked: !job.isBookmarked }
            : job
        )
      );
    } catch (err) {
      console.error("Bookmark lỗi:", err);
    }
  };

  // ===== FILTER =====
  const handleToggleFilter = (group: keyof JobFilters, value: string) => {
    setFilters(prev => {
      const list = prev[group];
      const newList = list.includes(value)
        ? list.filter(v => v !== value)
        : [...list, value];

      return { ...prev, [group]: newList };
    });
    setCurrentPage(1);
  };

  const handleClearGroup = (group: keyof JobFilters) => {
    setFilters(prev => ({ ...prev, [group]: [] }));
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setFilters({ ...emptyFilters });
    setCurrentPage(1);
  };

  // ===== UI =====
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const activeCount = Object.values(filters).reduce(
    (acc, curr) => acc + curr.length,
    0
  );

  if (isMetaLoading) return <div>Loading filters...</div>;

  return (
    <div className={styles.wrapper}>
      {/* HERO */}
      {!isFilterOpen && (
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Build a sustainable career with
              <span className={styles.logoWhite}> H</span>
              <span className={styles.logoBlue}>KK</span>
              <span className={styles.logoWhite}>Q</span>
            </h1>
            <p className={styles.heroSubtitle}>
              "We are looking for talented individuals who are ready to innovate
              and create value that makes a difference."
            </p>

            {/* ✅ giữ nguyên UI, chỉ thêm onClick */}
            <button
              className={styles.primaryButton}
              onClick={handleApplyNow}
            >
              Apply Job Now
            </button>
          </div>
        </section>
      )}

      {/* BODY */}
      <div
        className={`${styles.bodyLayout} ${
          isFilterOpen ? styles.bodyLayoutWithSidebar : ""
        }`}
      >
        {/* SIDEBAR */}
        {isFilterOpen && (
          <FilterSidebar
            filters={filters}
            metadata={metadata}
            onToggle={handleToggleFilter}
            onClearGroup={handleClearGroup}
            onClearAll={handleClearAll}
          />
        )}

        {/* MAIN */}
        <div className={styles.jobsColumn}>
          {/* CATEGORY */}
          <div className={styles.categoriesList}>
            <button
              className={`${styles.categoryBtn} ${
                activeCategory === "View All"
                  ? styles.categoryBtnActive
                  : ""
              }`}
              onClick={() => {
                setActiveCategory("View All");
                setCurrentPage(1);
              }}
            >
              View All
            </button>

            {metadata?.categories.map(cat => (
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

          {/* HEADER */}
          <div className={styles.jobsHeader}>
            <span className={styles.showingText}>
              Showing {totalJobs > 0 ? startIndex + 1 : 0} -{" "}
              {Math.min(startIndex + JOBS_PER_PAGE, totalJobs)} of {totalJobs} Jobs
            </span>

            <button
              className={`${styles.filterToggleBtn} ${
                isFilterOpen ? styles.filterToggleBtnActive : ""
              }`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <div className={styles.filterIconWrapper}>
                <AiOutlineMenu size={18} />
                {activeCount > 0 && (
                  <span className={styles.filterBadge}>
                    {activeCount}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* JOB LIST */}
          {/* ✅ FIX: gắn ref ở đây */}
          <section ref={jobListRef} className={styles.jobList}>
            {isLoading ? (
              <div className={styles.loadingInfo}>Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className={styles.loadingInfo}>
                No jobs found matching your filters.
              </div>
            ) : (
              jobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onBookmark={handleBookmark}
                />
              ))
            )}
          </section>

          {/* PAGINATION giữ nguyên */}
          {totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <div className={styles.pagination}>
                <button
                  className={styles.pageArrowBtn}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft size={24} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  page => (
                    <button
                      key={page}
                      className={`${styles.pageBtn} ${
                        currentPage === page
                          ? styles.pageBtnActive
                          : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  className={styles.pageArrowBtn}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FiChevronRight size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.backToTop}>
        <a href="#top">Return to top of page</a>
      </div>
    </div>
  );
};

export default Home;