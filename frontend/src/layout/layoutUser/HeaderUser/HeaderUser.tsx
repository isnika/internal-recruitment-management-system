import styles from "./HeaderUser.module.css";

const HeaderUser = () => {
  return (
    <header className={styles.header}>
      
      {/* ===== TOP BAR ===== */}
      <div className={styles.topBar}>
        
        {/* logo */}
        <div className={styles.logo}>
          <span className={styles.logoBlack}>H</span>
          <span className={styles.logoBlue}>KK</span>
          <span className={styles.logoBlack}>Q</span>
          <span className={styles.logoItalic}> Careers</span>
        </div>

        {/* menu */}
        <nav className={styles.nav}>
          <a href="#" className={styles.home}>Home</a>
          <a href="#" className={styles.hideOnSmall}>Job</a>
          <a href="#" className={styles.hideOnSmall}>Companies</a>
          <a href="#" className={styles.hideOnSmall}>Salary Guide</a>
          <a href="#" className={styles.hideOnSmall}>Blog</a>
        </nav>

        {/* action */}
        <div className={styles.actions}>
          <button className={styles.signIn}>Sign in</button>
          <button className={`${styles.signIn} ${styles.signUp}`}>
            Sign up
          </button>
        </div>

      </div>

      {/* search en trending */}
      <div className={styles.container}>
        <div className={styles.searchSection}>
          
          <div className={styles.searchBox}>
            <input placeholder="Job title, Skills, ..." />
            <input placeholder="Address (TP Ho Chi Minh, Ha Noi ...)" />
            <button>Search</button>
          </div>

          <div className={styles.trending}>
            <span>Trending Searches: </span>

              <span className ={styles.tags}>Frontend Developer</span>
              <span className ={styles.tags}>Marketing</span>
              <span className ={styles.tags}>Remote</span>
              <span className ={styles.tags}>Java</span>
              <span className ={styles.tags}>Data Analyst</span>

          </div>

        </div>
      </div>

    </header>
  );
};

export default HeaderUser;