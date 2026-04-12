import styles from "./HeaderAuth.module.css";
import { useNavigate } from "react-router-dom";

const HeaderAuth = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {/* LOGO */}
      <div className={styles.logo} onClick={() => navigate("/")}>
        <span className={styles.logoBlack}>H</span>
        <span className={styles.logoBlue}>KK</span>
        <span>Q </span>
        <span className={styles.logoItalic}>Careers</span>
      </div>

      {/* ACTION */}
      <div className={styles.actions}>
        <button
          className={styles.homeBtn}
          onClick={() => navigate("/")}
        >
         Home
        </button>

        <button className={`${styles.homeBtn} ${styles.signupBtn}`}>
          Sign up
        </button>
      </div>
    </header>
  );
};

export default HeaderAuth;