import styles from "./HeroSection.module.css";

type Props = {
  visible: boolean;
};

const HeroSection = ({ visible }: Props) => {
  return (
    <section className={`${styles.hero} ${visible ? styles.show : ""}`}>
      <div className={styles.overlay} />

      <div className={styles.heroContent}>
        <h1>HKKQ Company</h1>

        <p>
          Creating technological value – connecting people – leading the future
        </p>

        <button className={styles.ctaBtn}>Discover More</button>
      </div>
    </section>
  );
};

export default HeroSection;