import styles from "./AboutSection.module.css";

const AboutSection = () => {
  return (
    <section className={styles.section}>
      <h2>About HKKQ</h2>

      <p>
        HKKQ is a technology-driven company dedicated to building modern,
        scalable, and high-performance software solutions. We focus on
        delivering seamless user experiences, robust system architecture, and
        long-term maintainability for businesses in the digital era.
      </p>

      <p>
        Our engineering philosophy is rooted in clean architecture,
        modular design, and continuous innovation. We believe that great
        software is not only functional, but also intuitive, efficient, and
        adaptable to rapid technological change.
      </p>

      <p>
        At HKKQ, we combine engineering excellence with product thinking to
        create solutions that empower businesses to transform digitally,
        optimize operations, and unlock new growth opportunities.
      </p>

      <p>
        We are committed to building technology that scales with ambition —
        from internal systems to enterprise platforms and future SaaS
        ecosystems.
      </p>

      <p>
        <b>Our philosophy:</b> simplicity, performance, and impact.
      </p>
    </section>
  );
};

export default AboutSection;