import styles from "./JobSections.module.css";

const JobSections = ({
  job,
  refs,
  onApply,
}: any) => {
  return (
    <>
      {/* DESCRIPTION */}
      <div
        ref={refs.Description}
        className={styles.greyCard}
      >
        <h3 className={styles.sectionTitle}>
          Job Description
        </h3>

        <div className={styles.textContent}>
          <p>{job.description}</p>
        </div>
      </div>

      {/* REQUIREMENTS */}
      <div
        ref={refs.Requirements}
        className={styles.greyCard}
      >
        <h3 className={styles.sectionTitle}>
          Candidate Requirements
        </h3>

        <div className={styles.textContent}>
          <p>{job.requirements}</p>
        </div>
      </div>

      {/* BENEFITS */}
      <div
        ref={refs.Benefits}
        className={styles.greyCard}
      >
        <h3 className={styles.sectionTitle}>
          Benefits
        </h3>

        <div className={styles.textContent}>
          <p>{job.benefits}</p>
        </div>
      </div>

      {/* COMPANY */}
      <div
        ref={refs.Company}
        className={styles.greyCard}
      >
        <h3 className={styles.sectionTitle}>
          Company
        </h3>

        <div className={styles.textContent}>
          <ul>
            <li>{job.company?.name}</li>

            <li>
              Address: {job.company?.address}
            </li>

            <li>
              Website: {job.company?.website}
            </li>

            <li>
              {job.company?.description}
            </li>
          </ul>
        </div>
      </div>

      {/* APPLY */}
      <div className={styles.greyCard}>
        <h3 className={styles.sectionTitle}>
          How to Apply
        </h3>

        <div className={styles.textContent}>
          Submit your application by clicking
          the Apply Now button below.
        </div>

        <div className={styles.applyActions}>
          <button
            className={styles.applyBtn}
            onClick={onApply}
          >
            Apply Now
          </button>

          <button
            className={styles.saveTaskBtn}
          >
            Save Job
          </button>
        </div>

        <span className={styles.deadlineText}>
          Deadline: {job.deadline}
        </span>
      </div>
    </>
  );
};

export default JobSections;