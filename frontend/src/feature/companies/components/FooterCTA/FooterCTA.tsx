import styles from "./FooterCTA.module.css";

const FooterCTA = () => {
  return (
    <section className={styles.footerCta}>
      <h2>Ready to work with HKKQ?</h2>

      <p>
        Let’s build the future of technology together.
      </p>

      <button>Contact Us</button>
    </section>
  );
};

export default FooterCTA;