import styles from "./TimelineSection.module.css";

const TimelineSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Our Journey</h2>

      <div className={styles.timeline}>
        <div className={styles.item}>
          <span className={styles.year}>2022</span>
          <p className={styles.text}>
            HKKQ was founded with a small team of 5 software engineers.
          </p>
        </div>

        <div className={styles.item}>
          <span className={styles.year}>2023</span>
          <p className={styles.text}>
            Launched the first internal management system platform.
          </p>
        </div>

        <div className={styles.item}>
          <span className={styles.year}>2024</span>
          <p className={styles.text}>
            Expanded our ecosystem with HR, CRM, and E-commerce solutions.
          </p>
        </div>

        <div className={styles.item}>
          <span className={styles.year}>2025</span>
          <p className={styles.text}>
            Entered the global expansion phase, targeting international markets.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;