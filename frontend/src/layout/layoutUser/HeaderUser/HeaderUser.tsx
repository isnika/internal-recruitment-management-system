import styles from "./HeaderUser.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


import { useAuth } from "../../../feature/auth/context/AuthContext";

import type { User } from "../../../dataMock/User";

import UserDropdown from "../../components/UserDropdown/UserDropdown";
import MailDropdown from "../../components/MailDropdown/MailDropdown";


import { FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const HeaderUser = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();


    const handleLogout = () => {
      logout();
      navigate("/login");
    };

  return (
    <header className={styles.header}>

      {/* top bar */}
      <div className={styles.topBar}>

        {/* logo */}
        <div
          className={styles.logo}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <span className={styles.logoBlack}>H</span>
          <span className={styles.logoBlue}>KK</span>
          <span className={styles.logoBlack}>Q</span>
          <span className={styles.logoItalic}> Careers</span>
        </div>

        {/* menu */}
        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#" className={styles.hideOnSmall}>Job</a>
          <a href="#" className={styles.hideOnSmall}>Companies</a>
          <a href="#" className={styles.hideOnSmall}>Salary Guide</a>
          <a href="#" className={styles.hideOnSmall}>Blog</a>
        </nav>

        {/* ACTION */}
            <div className={styles.actions}>
              <MailDropdown user={user} />

              {!user ? (
                <>
                  <button
                    className={styles.signIn}
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </button>

                  <button
                    className={`${styles.signIn} ${styles.signUp}`}
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <UserDropdown user={user} onLogout={handleLogout} />
              )}
            </div>
      </div>

      {/* search */}
      <div className={styles.container}>
        <div className={styles.searchSection}>

          <div className={styles.searchBox}>
            <input placeholder="Job title, Skills, ..." />
            <input placeholder="Address (TP Ho Chi Minh, Ha Noi ...)" />
            <button>Search</button>
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