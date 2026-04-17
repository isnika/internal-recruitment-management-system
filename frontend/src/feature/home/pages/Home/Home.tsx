import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import type { Job, HomeMetadata } from "../../../../service/jobApi";
import { fetchJobsApi, fetchMetadataApi } from "../../../../service/jobApi";
import type { JobFilters } from "../../../../service/jobApi";
import { 
  FiChevronLeft, 
  FiChevronRight
} from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import JobCard from "../../../../shared/components/JobCard/JobCard";

// Số lượng công việc hiển thị trên mỗi trang
const JOBS_PER_PAGE = 5;

// Đối tượng mặc định khi chưa có bộ lọc nào được chọn
const emptyFilters: JobFilters = {
  jobTypes: [],
  experienceLevels: [],
  departments: [],
  salaryRanges: [],
  skillTags: [],
};

const Home = () => {

  // Quản lý Danh mục đang chọn (VD: Development, Marketing...)
  const [activeCategory, setActiveCategory] = useState("View All");
  
  // Quản lý trang hiện tại (Dùng cho phân trang)
  const [currentPage, setCurrentPage] = useState(1);
  
  // Quản lý danh sách các Job đã lưu (Bookmark) dùng Set để không bị trùng
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  
  // Trạng thái đóng/mở thanh Sidebar Filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Lưu trữ các giá trị lọc đang chọn (Checkbox)
  const [filters, setFilters] = useState<JobFilters>({ ...emptyFilters });

  // Dữ liệu từ API: Danh sách công việc và Thông tin bổ trợ (Metadata)
  const [jobs, setJobs] = useState<Job[]>([]);
  const [metadata, setMetadata] = useState<HomeMetadata | null>(null);
  
  // Thông tin về tổng số lượng để tính toán phân trang
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Trạng thái Loading để hiển thị thông báo "Đang tải..."
  const [isLoading, setIsLoading] = useState(false);
  const [isMetaLoading, setIsMetaLoading] = useState(true);

  // Lấy dữ liệu Metadata (Các danh sách lọc) một lần duy nhất khi mở trang
  useEffect(() => {
    const getMeta = async () => {
      try {
        const data = await fetchMetadataApi();
        setMetadata(data);
      } catch (err) {
        console.error("Lỗi tải metadata:", err);
      } finally {
        setIsMetaLoading(false);
      }
    };
    getMeta();
  }, []);

  // Lấy danh sách Job mỗi khi Category, Trang hoặc Bộ lọc thay đổi
  useEffect(() => {
    const getJobs = async () => {
      setIsLoading(true);
      try {
        // Tính tổng số filter đang chọn
        const filterCount = Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);
        
        const response = await fetchJobsApi(
          activeCategory,
          currentPage,
          JOBS_PER_PAGE,
          filterCount > 0 ? filters : undefined
        );
        
        setJobs(response.jobs);
        setTotalJobs(response.total);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
      } catch (err) {
        console.error("Lỗi tải danh sách job:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getJobs();
  }, [activeCategory, currentPage, filters]);


  // Xử lý khi nhấn vào Checkbox lọc
  const handleToggleFilter = (group: keyof JobFilters, value: string) => {
    setFilters(prev => {
      const currentList = prev[group];
      const isExist = currentList.includes(value);
      
      const newList = isExist 
        ? currentList.filter(v => v !== value) // Nếu có rồi thì xóa đi (Bỏ chọn)
        : [...currentList, value];            // Nếu chưa có thì thêm vào (Chọn)
        
      return { ...prev, [group]: newList };
    });
    setCurrentPage(1); // Reset về trang 1 khi lọc
  };

  // Reset một nhóm lọc về rỗng
  const handleClearGroup = (group: keyof JobFilters) => {
    setFilters(prev => ({ ...prev, [group]: [] }));
    setCurrentPage(1);
  };

  // Reset tất cả bộ lọc
  const handleClearAll = () => {
    setFilters({ ...emptyFilters });
    setCurrentPage(1);
  };

  // Xử lý khi nhấn Bookmark
  const handleBookmark = (id: string) => {
    setBookmarkedJobs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Hàm vẽ từng nhóm lọc (Job Type, Experience...) cho gọn code
  const renderFilterSection = (title: string, group: keyof JobFilters, options: string[], showClearBtn: boolean = true) => (
    <div className={styles.filterGroup}>
      <div className={styles.filterGroupHeader}>
        <h4>{title}</h4>
        {showClearBtn && (
          <button className={styles.clearBtn} onClick={() => handleClearGroup(group)}>
            Clear
          </button>
        )}
      </div>
      <div className={styles.checkboxList}>
        {options.map(opt => (
          <label key={opt} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={filters[group].includes(opt)}
              onChange={() => handleToggleFilter(group, opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // Tính toán số thứ tự đang hiển thị (Ví dụ: "Showing 1-5 of 16")
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const activeCount = Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);

  
  return (
    <div className={styles.wrapper}>
      {/* 1. Hero Section: Chỉ hiện khi không mở Filter */}
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
              "We are looking for talented individuals who are ready to innovate and create value that makes a difference."
            </p>
            <button className={styles.primaryButton}>Apply Job Now</button>
          </div>
        </section>
      )}

      {/* 2. Phần thân chính: Sidebar + Nội dung Job */}
      <div className={`${styles.bodyLayout} ${isFilterOpen ? styles.bodyLayoutWithSidebar : ""}`}>
        
        {/* --- SIDEBAR BỘ LỌC --- */}
        {isFilterOpen && (
          <aside className={styles.filterSidebar}>
            <div className={styles.filterSidebarHeader}>
              <button className={styles.clearAllBtn} onClick={handleClearAll}>Clear All</button>
              <span className={styles.filterSidebarTitle}>Filters</span>
            </div>

            {renderFilterSection("Job Type", "jobTypes", metadata?.jobTypes || [], false)}
            <div className={styles.filterDivider}></div>
            {renderFilterSection("Experience Level", "experienceLevels", metadata?.experienceLevels || [])}
            <div className={styles.filterDivider}></div>
            {renderFilterSection("Department", "departments", metadata?.departments || [])}
            <div className={styles.filterDivider}></div>
            {renderFilterSection("Salary", "salaryRanges", metadata?.salaryRanges || [])}
            <div className={styles.filterDivider}></div>
            {renderFilterSection("Skill Tags", "skillTags", metadata?.skillTags || [])}
          </aside>
        )}

        {/* --- CỘT NỘI DUNG BÊN PHẢI --- */}
        <div className={styles.jobsColumn}>
          
          {/* Thanh cuộn Danh mục */}
          <div className={styles.categoriesList}>
            <button 
              className={`${styles.categoryBtn} ${activeCategory === "View All" ? styles.categoryBtnActive : ""}`}
              onClick={() => { setActiveCategory("View All"); setCurrentPage(1); }}
            >
              View All
            </button>
            {metadata?.categories?.map(cat => (
              <button 
                key={cat} 
                className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ""}`}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Header hiển thị thông tin số lượng và nút bấm Filter */}
          <div className={styles.jobsHeader}>
            <span className={styles.showingText}>
              Showing {totalJobs > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + JOBS_PER_PAGE, totalJobs)} of {totalJobs} Jobs
            </span>
            <button
              className={`${styles.filterToggleBtn} ${isFilterOpen ? styles.filterToggleBtnActive : ""}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              title="Toggle Filters"
            >
              <div className={styles.filterIconWrapper}>
                <AiOutlineMenu size={18} />
                {activeCount > 0 && (
                  <span className={styles.filterBadge}>{activeCount}</span>
                )}
              </div>
            </button>
          </div>

          {/* DANH SÁCH JOB CARD */}
          <section className={styles.jobList}>
            {isLoading ? (
              <div className={styles.loadingInfo}>Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className={styles.loadingInfo}>No jobs found matching your filters.</div>
            ) : (
              jobs.map(job => (
                <JobCard 
                  key={job.id}
                  job={job}
                  isBookmarked={bookmarkedJobs.has(job.id)}
                  onBookmark={handleBookmark}
                />
              ))
            )}
          </section>

          {/* PHÂN TRANG (Chỉ hiện nếu có nhiều hơn 1 trang) */}
          {totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <div className={styles.pagination}>
                <button 
                  className={styles.pageArrowBtn} 
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft strokeWidth={4} size={24} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index) => (
                  <React.Fragment key={page}>
                    <button 
                      className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                    {index < totalPages - 1 && <div className={styles.pageDivider}></div>}
                  </React.Fragment>
                ))}

                <button 
                  className={styles.pageArrowBtn} 
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FiChevronRight strokeWidth={4} size={24} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer CTA Section */}
      {isFilterOpen && (
        <section className={styles.joinSection}>
          <div className={styles.joinContent}>
            <h2 className={styles.joinTitle}>Join HKKQ Today</h2>
            <p className={styles.joinSubtitle}>
              Gửi CV của bạn để trở thành một phần của đại gia đình HKKQ.
            </p>
            <button className={styles.joinBtn}>Sign up now</button>
          </div>
        </section>
      )}

      <div className={styles.backToTop}>
        <a href="#top">Return to top of page</a>
      </div>
    </div>
  );
}

export default Home;