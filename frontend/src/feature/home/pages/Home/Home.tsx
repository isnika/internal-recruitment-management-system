import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

import { getCurrentUser } from "../../../../service/authApi";
import { useJobs } from "../../../../hooks/useJobs";

import HeroBanner from "../../components/HeroBanner/HeroBanner";
import StatsSection from "../../components/StatsSection/StatsSection";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection";
import DepartmentSection from "../../components/DepartmentSection/DepartmentSection";
import TestimonialSection from "../../components/TestimonialSection/TestimonialSection";
import CTASection from "../../components/CTASection/CTASection";

const Home = () => {
  const navigate = useNavigate();
  const jobListRef = useRef(null);
  const { jobs, isLoading } = useJobs("View All", false);

  /* ===================== HANDLERS ===================== */
  const handleApplyNow = () => {
    const user = getCurrentUser();
    if (!user) return navigate("/login");
    jobListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigateToJobs = () => {
    navigate("/jobPage");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectDepartment = (query) => {
    navigate(`/jobPage?departments=${query}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      {/* Hero Banner giữ nguyên vì nhận hàm cuộn */}
      <HeroBanner onApply={handleApplyNow} />

      {/* Khối thống kê số liệu */}
      <StatsSection />

      {/* Danh sách công việc nổi bật - bọc ref ngoài container để scroll trúng đích */}
      <div ref={jobListRef}>
        <FeaturedSection
          jobs={jobs}
          isLoading={isLoading}
          onViewAll={handleNavigateToJobs}
        />
      </div>

      {/* Danh mục phòng ban */}
      <DepartmentSection onSelectCategory={handleSelectDepartment} />

      {/* Đánh giá từ nhân viên */}
      <TestimonialSection />

      {/* Khối kêu gọi hành động cuối trang */}
      <CTASection onExplore={handleNavigateToJobs} />
    </div>
  );
};

export default Home;