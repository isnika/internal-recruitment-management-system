import styles from "./HeaderAuth.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <header className={styles.header}>
      {/* logo */}
      <div className={styles.logo} onClick={() => navigate("/")}>
        <span className={styles.logoBlack}>H</span>
        <span className={styles.logoBlue}>KK</span>
        <span>Q </span>
        <span className={styles.logoItalic}>Careers</span>
      </div>

      {/* action */}
      <div className={styles.actions}>
        <button
          className={styles.homeBtn}
          onClick={() => navigate("/")}
        >
          Home
        </button>

        {/* hiển thị button phù hợp */}
        {isLoginPage && (
          <button
            className={`${styles.homeBtn} ${styles.signupBtn}`}
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        )}

        {isRegisterPage && (
          <button
            className={`${styles.homeBtn} ${styles.signupBtn}`}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderAuth;