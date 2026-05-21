import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./Settings.module.css";
import ChangePassword from "./components/ChangePassword/ChangePassword";

export default function Settings(): React.ReactElement {
  const [language, setLanguage] = useState<string>("vi");
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cài đặt tài khoản</h2>
      <hr className={styles.divider} />

      {/* CHỨC NĂNG 1: THEME */}
      <div className={styles.section}>
        <h3>Giao diện (Theme)</h3>
        <p>Chọn chế độ hiển thị phù hợp với bạn.</p>
        <select
          value={theme}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value)}
          className={styles.select}
        >
          <option value="light">Chế độ Sáng (Light Mode)</option>
          <option value="dark">Chế độ Tối (Dark Mode)</option>
        </select>
      </div>

      <hr className={styles.divider} />

      {/* CHỨC NĂNG 2: NGÔN NGỮ */}
      <div className={styles.section}>
        <h3>Ngôn ngữ (Language)</h3>
        <p>Thay đổi ngôn ngữ hiển thị trên hệ thống.</p>
        <select
          value={language}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
          className={styles.select}
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      <hr className={styles.divider} />

      {/* CHỨC NĂNG 3: ĐỔI MẬT KHẨU (Đã tách riêng) */}
      <ChangePassword />
    </div>
  );
}