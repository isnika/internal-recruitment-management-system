import styles from "./HeaderUser.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../feature/auth/context/AuthContext";
import { useState } from "react";

import UserDropdown from "../../components/UserDropdown/UserDropdown";
import MailDropdown from "../../components/MailDropdown/MailDropdown";

const HeaderUser = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

const [keyword, setKeyword] = useState("");
const [location, setLocation] = useState("");


/*ham search*/
const handleSearch = () => {
  if (!keyword.trim() && !location.trim()) return;

  navigate(
    `/search?q=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`
  );
};


  return (
    <header className={styles.header}>
      {/* TOP BAR */}
      <div className={styles.topBar}>
        {/* LOGO */}
        <div
          className={styles.logo}
          onClick={() => handleNavigate("/")}
          style={{ cursor: "pointer" }}
        >
          <span className={styles.logoBlack}>H</span>
          <span className={styles.logoBlue}>KK</span>
          <span className={styles.logoBlack}>Q</span>
          <span className={styles.logoItalic}> Careers</span>
        </div>

        {/* menu */}
        <nav className={styles.nav}>
          <a onClick={() => navigate("/")}>Home</a>

          <a
            className={styles.hideOnSmall}
            onClick={() => navigate("/jobs")}
          >
            Job
          </a>

          <a
            className={styles.hideOnSmall}
            onClick={() => navigate("/companies")}
          >
            Companies
          </a>

          <a
            className={styles.hideOnSmall}
            onClick={() => navigate("/salary-guide")}
          >
            Salary Guide
          </a>

          <a
            className={styles.hideOnSmall}
            onClick={() => navigate("/blog")}
          >
            Blog
          </a>
        </nav>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <MailDropdown user={user} />

          {!user ? (
            <>
              <button
                className={styles.signIn}
                onClick={() => handleNavigate("/login")}
              >
                Sign in
              </button>

              <button
                className={`${styles.signIn} ${styles.signUp}`}
                onClick={() => handleNavigate("/register")}
              >
                Sign up
              </button>
            </>
          ) : (
            <UserDropdown user={user} onLogout={handleLogout} />
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className={styles.container}>
        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <input
              placeholder="Job title, Skills, ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <input
              placeholder="Address (TP HCM, Ha Noi ...)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button onClick={handleSearch}>Search</button>
          </div>

          <div className={styles.trending}>
            <span>Trending Searches: </span>

            <span className={styles.tags}>Frontend Developer</span>
            <span className={styles.tags}>Marketing</span>
            <span className={styles.tags}>Remote</span>
            <span className={styles.tags}>Java</span>
            <span className={styles.tags}>Data Analyst</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;