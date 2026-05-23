import styles from "./HeaderUser.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../feature/auth/context/AuthContext";
import { useState, useEffect } from "react";

import UserDropdown from "../../components/UserDropdown/UserDropdown";
import MailDropdown from "../../components/MailDropdown/MailDropdown";

const HeaderUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [keyword, setKeyword] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const isActive = (path: string) => location.pathname === path;
  const hideSearch = location.pathname === "/companies";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSearch = () => {
    const q = keyword.trim();
    const loc = locationInput.trim();

    if (!q && !loc) return;

    navigate(
      `/search?q=${encodeURIComponent(q)}&location=${encodeURIComponent(loc)}`
    );
  };

    useEffect(() => {
      if (location.pathname !== "/search") {
        setKeyword("");
        setLocationInput("");
      }
    }, [location.pathname]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSearch();
    };

  return (
    <header className={styles.header}>
      {/* ================= TOP BAR ================= */}
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

        {/* NAV */}
        <nav className={styles.nav}>
                  <a
                    onClick={() => navigate("/")}
                    className={isActive("/") ? styles.active : ""}
                  >
                    Home
                  </a>

                  <a
                    className={`${styles.hideOnSmall} ${isActive("/jobPage") ? styles.active : ""}`}
                    onClick={() => navigate("/jobPage")}
                  >
                    Job
                  </a>

                  <a
                    className={`${styles.hideOnSmall} ${isActive("/companies") ? styles.active : ""}`}
                    onClick={() => navigate("/companies")}
                  >
                    Companies
                  </a>

                  <a
                    className={`${styles.hideOnSmall} ${isActive("/salary-guide") ? styles.active : ""}`}
                    onClick={() => navigate("/salary-guide")}
                  >
                    Salary Guide
                  </a>

                  <a
                    className={`${styles.hideOnSmall} ${isActive("/blog") ? styles.active : ""}`}
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

      {/* ================= SEARCH (HIDE ON COMPANIES) ================= */}
      {!hideSearch && (
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
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
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
      )}
    </header>
  );
};

export default HeaderUser;