import styles from "./JobSections.module.css";

const JobSections = ({ job, refs }) => {
  return (
    <>
      <div ref={refs.descriptionRef} className={styles.sectionCard}>
        <h3 className={styles.title}>Description</h3>
        <div className={styles.content}>
          {job.description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
      </div>

      <div ref={refs.requirementsRef} className={styles.sectionCard}>
        <h3 className={styles.title}>Requirements</h3>
        <div className={styles.content}>
          {job.requirements.map((r, i) => (
            <p key={i}>{r}</p>
          ))}
        </div>
      </div>

      <div ref={refs.benefitsRef} className={styles.sectionCard}>
        <h3 className={styles.title}>Benefits</h3>
        <div className={styles.content}>
          {job.benefits.map((b, i) => (
            <p key={i}>{b}</p>
          ))}
        </div>
      </div>

      <div ref={refs.companyRef} className={styles.sectionCard}>
        <h3 className={styles.title}>Company</h3>
        <div className={styles.content}>
          <p>{job.company?.name}</p>
        </div>
      </div>
    </>
  );
};

export default JobSections;
