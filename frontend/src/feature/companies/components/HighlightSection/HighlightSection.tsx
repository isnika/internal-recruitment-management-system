import styles from "./HighlightSection.module.css";

const HighlightSection = () => {
  return (
    <section className={styles.highlight}>
      <div className={styles.card}>
        <h3>Vision</h3>
        <p>
          To become a leading technology company in Southeast Asia.
        </p>
      </div>

      <div className={styles.card}>
        <h3>Mission</h3>
        <p>
          To deliver optimized software solutions that empower businesses to
          accelerate digital transformation.
        </p>
      </div>

      <div className={styles.card}>
        <h3>Core Values</h3>
        <p>
          Creativity – Speed – Precision – Responsibility.
        </p>
      </div>
    </section>
  );
};

export default HighlightSection;