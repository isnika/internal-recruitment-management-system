import React, { useState, useMemo } from "react";
import { Search, Calendar, Clock, User } from "lucide-react";
import styles from "./BlogPage.module.css";

type BlogPost = {
  id: number;
  title: string;
  summary: string;
  category: "All", "Experience", "Technolog Update", "Internal Affairs", "Recruitment";
  date: string;
  readTime: string;
  thumbnail: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
};

const mockBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Bí kíp chuyển team nội bộ mượt mà tại HKKQ",
    summary: "Chia sẻ lộ trình chuẩn bị, cách làm việc với Manager cũ và phỏng vấn với bộ phận mới mà không gây ảnh hưởng đến tiến độ dự án hiện tại.",
    category: "Experience",
    date: "20 Tháng 5, 2026",
    readTime: "5 phút đọc",
    thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600",
    author: {
      name: "Nika Nguyen",
      role: "Frontend Engineer",
      avatar: "https://i.pinimg.com/474x/ee/ed/03/eeed037e1319eec1cbe972b8787b05a0.jpg"
    }
  },
  {
    id: 2,
    title: "Ứng dụng hệ thống Design System mới vào dự án Core năm 2026",
    summary: "Khám phá cách đội ngũ UI/UX và Engineering tối ưu hóa 40% thời gian code giao diện nhờ việc tái cấu trúc thư viện thành phần dùng chung toàn hệ thống.",
    category: "Technolog Update",
    date: "18 Tháng 5, 2026",
    readTime: "8 phút đọc",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600",
    author: {
      name: "Minh Thư",
      role: "UI/UX Designer",
      avatar: "https://i.pinimg.com/736x/43/44/39/4344397ead16b67b257ae781ed8f3f1a.jpg"
    }
  },
  {
    id: 3,
    title: "Nhật ký Teambuilding Đà Nẵng: Gắn kết và bứt phá",
    summary: "Nhìn lại những khoảnh khắc bùng nổ, vui nhộn và vô cùng ý nghĩa của đại gia đình Company A tại bãi biển Mỹ Khê vừa qua.",
    category: "Internal Affairs",
    date: "15 Tháng 5, 2026",
    readTime: "4 phút đọc",
    thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600",
    author: {
      name: "Hoàng Long",
      role: "HR & People Ops",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }
  },
  {
    id: 4,
    title: "HKKQ chính thức khởi động chiến dịch Tuyển dụng Nội bộ Quý 2",
    summary: "Mở rộng hơn 50 cơ hội thăng tiến và thử sức ở các vị trí Tech Lead, Product Owner tại các chi nhánh Hà Nội, Đà Nẵng và TP.HCM.",
    category: "Recruitment",
    date: "10 Tháng 5, 2026",
    readTime: "3 phút đọc",
    thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
    author: {
      name: "Thu Hà",
      role: "Talent Acquisition",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
    }
  }
];

const CATEGORIES = ["All", "Experience", "Technolog Update", "Internal Affairs", "Recruitment"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Xử lý bộ lọc tìm kiếm văn bản và danh mục bài viết
  const filteredBlogs = useMemo(() => {
    return mockBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Company Insights & Blog</h1>
        <p className={styles.subtitle}>
          A place to update technology news, internal cultural stories, and share practical experience from HKKQ members.
        </p>
      </div>

      {/* TOOLBAR: SEARCH & CATEGORIES */}
      <div className={styles.toolbarCard}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.categoryTabs}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`${styles.tabBtn} ${selectedCategory === category ? styles.activeTab : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* BLOG GRID */}
      <div className={styles.blogGrid}>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <article key={blog.id} className={styles.blogCard}>
              <div className={styles.thumbnailWrapper}>
                <img src={blog.thumbnail} alt={blog.title} className={styles.thumbnail} />
                <span className={styles.tagBadge}>{blog.category}</span>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.metaRow}>
                  <div className={styles.metaItem}>
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <h3 className={styles.blogTitle}>{blog.title}</h3>
                <p className={styles.blogSummary}>{blog.summary}</p>

                <div className={styles.authorRow}>
                  <img src={blog.author.avatar} alt={blog.author.name} className={styles.avatar} />
                  <div>
                    <h4 className={styles.authorName}>{blog.author.name}</h4>
                    <span className={styles.authorRole}>{blog.author.role}</span>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No articles matching the keyword or category you selected were found.</p>
          </div>
        )}
      </div>
    </div>
  );
}