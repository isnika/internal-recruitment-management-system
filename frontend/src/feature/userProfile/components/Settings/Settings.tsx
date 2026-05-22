import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import ChangePassword from "./components/ChangePassword/ChangePassword";

interface OptionItem<T> {
  value: T;
  label: string;
  icon?: string;
  description: string; // Thêm mô tả chi tiết cho từng tính năng
}

export default function Settings(): React.ReactElement {
  // Mock dữ liệu mặc định hệ thống (vì tính năng chưa thực tế thay đổi được)
  const [language] = useState<string>("en");
  const [theme] = useState<string>("light");

  // State quản lý việc hiển thị popup thông báo chi tiết tính năng cho từng khu vực
  const [activeNotice, setActiveNotice] = useState<"theme" | "lang" | null>(null);

  // Bộ data chứa đầy đủ thông tin mô tả chi tiết hệ thống sẽ phát triển
  const themeOptions: OptionItem<"light" | "dark">[] = [
    {
      value: "light",
      label: "Light Mode",
      icon: "☀️",
      description: "Optimizes UI contrast with workspace light dynamics to reduce glare in well-lit environments."
    },
    {
      value: "dark",
      label: "Dark Mode",
      icon: "🌙",
      description: "Engages deep-slate palettes to maintain comfortable data processing during low-light night operations."
    },
  ];

  const languageOptions: OptionItem<"en" | "vi" | "ja">[] = [
    { value: "en", label: "English", description: "Standardizes workspace terminal language parameters to US Global English context." },
    { value: "vi", label: "Tiếng Việt", description: "Bản địa hóa toàn bộ hệ thống báo cáo, danh mục và luồng xử lý sang ngôn ngữ Tiếng Việt." },
    { value: "ja", label: "日本語", description: "システム全体の表記、通知、およびダッシュボードを日本語環境に切り替えます。" },
  ];

  // Hàm trigger hiển thị thông báo "Coming soon" kèm mô tả chi tiết
  const handleFeatureClick = (type: "theme" | "lang", optLabel: string) => {
    setActiveNotice(type);
    // Tự động tắt thông báo sau 5 giây nếu người dùng không bấm đóng
    setTimeout(() => {
      setActiveNotice((current) => (current === type ? null : current));
    }, 5000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Account Settings</h2>
      <hr className={styles.divider} />

      {/* CHỨC NĂNG 1: THEME CONFIGURATION (UNDER DEVELOPMENT) */}
      <div className={styles.section}>
        <h3>Interface Theme</h3>
        <p>Select your preferred visual environment layout.</p>

        <div className={styles.gridOptions}>
          {themeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.optionCard} ${theme === opt.value ? styles.optionActive : ""}`}
              onClick={() => handleFeatureClick("theme", opt.label)}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Banner thông báo chi tiết tính năng đang phát triển */}
        {activeNotice === "theme" && (
          <div className={styles.comingSoonBanner}>
            <div className={styles.bannerHeader}>
              <span className={styles.badge}>Coming Soon</span>
              <button className={styles.closeBtn} onClick={() => setActiveNotice(null)}>×</button>
            </div>
            <h4>Feature Under Development</h4>
            <p>We are configuring high-performance sub-layers for instant CSS-variable rendering. Once released, you can toggle seamlessly between light environments and deep dark layouts without dashboard reload latencies.</p>
          </div>
        )}
      </div>

      <hr className={styles.divider} />

      {/* CHỨC NĂNG 2: REGIONAL LANGUAGE (UNDER DEVELOPMENT) */}
      <div className={styles.section}>
        <h3>System Language</h3>
        <p>Change the localization display across your active workspace session.</p>

        <div className={styles.gridOptions}>
          {languageOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.optionCard} ${language === opt.value ? styles.optionActive : ""}`}
              onClick={() => handleFeatureClick("lang", opt.label)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Banner thông báo chi tiết tính năng đang phát triển */}
        {activeNotice === "lang" && (
          <div className={styles.comingSoonBanner}>
            <div className={styles.bannerHeader}>
              <span className={styles.badge}>In Progress</span>
              <button className={styles.closeBtn} onClick={() => setActiveNotice(null)}>×</button>
            </div>
            <h4>Localization Integration</h4>
            <p>Our engineering team is mapping the system translation keys onto a central i18n dictionary context. Future releases will support automated document, layout, and notification translation updates dynamically.</p>
          </div>
        )}
      </div>

      <hr className={styles.divider} />

      {/* CHỨC NĂNG 3: SECURE PASSPHRASE ROTATION (TÍNH NĂNG ĐÃ CHẠY) */}
      <ChangePassword />
    </div>
  );
}