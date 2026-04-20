
import styles from "./JobSections.module.css";

const JobSections = ({ job, refs, onApply }: any) => {

  return (
    <>
      {/* Job Description */}
            <div ref={refs.Description} className={styles.greyCard}>
              <h3 className={styles.sectionTitle}>Job Description:</h3>
              <div className={styles.textContent}>
                <ul>
                  {job.description?.map((desc: string, i: number) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Requirements */}
            <div ref={refs.Requirements} className={styles.greyCard}>
              <h3 className={styles.sectionTitle}>Candidate Requirements:</h3>
              <div className={styles.textContent}>
                <ul>
                  {job.requirements?.map((req: string, i: number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div ref={refs.Benefits} className={styles.greyCard}>
              <h3 className={styles.sectionTitle}>Benefits:</h3>
              <div className={styles.textContent}>
                <ul>
                  {job.benefits?.map((benefit: string, i: number) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Company */}
            <div ref={refs.Company} className={styles.greyCard}>
              <h3 className={styles.sectionTitle}>Company:</h3>
              <div className={styles.textContent}>
                <ul>
                  <li>{job.company?.name}</li>
                  <li>Address: {job.company?.address}</li>
                  {job.company?.bio && <li>{job.company.bio}</li>}
                </ul>
              </div>
            </div>

      {/* Working Hours */}
      <div className={styles.greyCard}>
        <h3 className={styles.sectionTitle}>
          Working Hours:{" "}
          <span
            style={{
              fontWeight: "normal",
              fontSize: "14px",
              color: "#334155",
            }}
          >
            {job.workingHours}
          </span>
        </h3>
      </div>

      {/* Apply */}
      <div className={styles.greyCard}>
        <h3 className={styles.sectionTitle}>How to Apply:</h3>
        <div className={styles.textContent}>
          Applicants can submit their applications online by clicking "Apply Now" below.
        </div>

        <div className={styles.applyActions}>
          <button className={styles.applyBtn} onClick={onApply}>Apply Now</button>
          <button className={styles.saveTaskBtn}>Save task</button>
        </div>

        <span className={styles.deadlineText}>
          Application deadline: {job.deadline}
        </span>
      </div>
    </>
  );
};

export default JobSections;