import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "../../pages/Home/Home.module.css";
import JobList from "../../../jobPage/components/JobList/JobList";
import type { Job } from "../../../../service/jobApi";

// Dữ liệu mẫu (Fallback Data) - Thay đổi cho phù hợp với dữ liệu thật của bạn
const MOCK_JOBS: Job[] = [
  {
    id: "mock-1",
    title: "Senior Frontend Developer",
    category: "Development",
    logo: "https://corgicare.com/wp-content/uploads/the-reasons-behind-my-corgis-long-tongue.jpg",
    skills: ["React", "TypeScript", "Tailwind"],
    salary: { min: 20000000, max: 35000000, currency: "VND" },
    location: "Ho Chi Minh City",
    postedAt: "1 day ago",
    isBookmarked: false,
  },
  {
    id: "mock-2",
    title: "Backend Engineer (Java)",
    category: "Development",
    logo: "https://tse1.explicit.bing.net/th/id/OIP.e0FrvE6kUlw8-VtPufP4rgHaE8?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
    salary: { min: 25000000, max: 45000000, currency: "VND" },
    location: "Ha Noi",
    postedAt: "2 days ago",
    isBookmarked: false,
  },
  {
    id: "mock-3",
    title: "Product Designer (UI/UX)",
    category: "Design",
    logo: "https://tse2.mm.bing.net/th/id/OIP.CA1jGPW-UnH_StuL1pborgHaHa?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    salary: { min: 18000000, max: 30000000, currency: "VND" },
    location: "Da Nang",
    postedAt: "3 days ago",
    isBookmarked: false,
  },
];

interface FeaturedSectionProps {
  jobs: Job[];
  isLoading: boolean;
  onViewAll: () => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ jobs, isLoading, onViewAll }) => {
  // Logic: Nếu đang loading thì hiện loading,
  // nếu đã xong mà không có job thật thì hiển thị MOCK_JOBS
  const displayJobs = !isLoading && (jobs?.length === 0) ? MOCK_JOBS : (jobs || []);

  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <h2>Featured Opportunities</h2>
            <p>Latest openings across Company A branches</p>
          </div>
          <button className={styles.viewAllBtn} onClick={onViewAll}>
            View All Positions <ArrowRight size={16} />
          </button>
        </div>

        <JobList
          jobs={displayJobs.slice(0, 2)}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default FeaturedSection;