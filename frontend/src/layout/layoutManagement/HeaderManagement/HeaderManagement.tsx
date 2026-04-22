import styles from "./HeaderManagement.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../feature/auth/context/AuthContext";
import { useState } from "react";

import UserDropdown from "../../components/UserDropdown/UserDropdown";
import MailDropdown from "../../components/MailDropdown/MailDropdown";

const HeaderUser = () => {
  const navigate = useNavigate();
  const location = useLocation(); //
  const { user, logout } = useAuth();

  const isEmployer = location.pathname.startsWith("/layoutManagement");
  const isAdmin = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const [keyword, setKeyword] = useState("");
  const [locationInput, setLocation] = useState("");

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>

        {/* LOGO */}
        <div
          className={styles.logo}
          onClick={() => handleNavigate("/layoutManagement")}
          style={{ cursor: "pointer" }}
        >
          <span className={styles.logoBlack}>H</span>
          <span className={styles.logoBlue}>KK</span>
          <span className={styles.logoBlack}>Q</span>
          <span className={styles.logoItalic}> Careers</span>
        </div>

        {/* MENU */}
        <nav className={styles.nav}>
          <a
            className={`${styles.hideOnSmall} ${isEmployer ? styles.active : ""}`}
            onClick={() => navigate("/layoutManagement")}
          >
            Employer
          </a>

          <a
            className={`${styles.hideOnSmall} ${isAdmin ? styles.active : ""}`}
            onClick={() => {
              if (user?.role !== "admin") {
                alert("Bạn không có quyền truy cập trang Admin");
                return;
              }
              navigate("/admin");
            }}
          >
            Admin
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
    </header>
  );
};

export default HeaderUser;