import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "../../pages/Home/Home.module.css";
import JobList from "../../../jobPage/components/JobList/JobList";

const FeaturedSection = ({ jobs, isLoading, onViewAll }) => {
  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <h2>Featured Opportunities</h2>
            <p>Latest openings across Company A branches</p>
          </div>
          <button className={styles.viewAllBtn} onClick={onViewAll}>
            View All Positions <ArrowRight size={16} />
          </button>
        </div>

        <JobList jobs={Array.isArray(jobs) ? jobs.slice(0, 6) : []} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default FeaturedSection;