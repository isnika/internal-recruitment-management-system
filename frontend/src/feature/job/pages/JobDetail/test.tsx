.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #F5F7FA;
  min-height: 100vh;
}


/* Header Card (looks like a large JobCard) */
.headerCard {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  gap: 24px;
  position: relative;
}

.logoWrapper {
  flex-shrink: 0;
}

/* ===== LOGO ===== */
.jobLogoCol {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
}

.logoImage {
  width: 80px;
  height: 80px;
  min-width: 80px;
  border-radius: 50%;
  object-fit: contain;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10px;
  color: #94a3b8;
}


.headerInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.jobTitle {
  font-size: 22px;
  font-weight: 700;
  color: #4338ca;
  margin: 0;
}

.jobCategory {
  font-size: 14px;
  color: #475569;
  margin: 0;
}

.skillsRow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.skillsLabel {
  font-size: 13px;
  color: #64748b;
}

.skillTag {
  background: #EEF2FF;
  color: #4338ca;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.metaRow {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.metaItem {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.metaIconYellow {
  color: #f59e0b;
  font-size: 18px;
}

.metaIconRed {
  color: #ef4444;
  font-size: 18px;
}

.headerRight {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  min-width: 140px;
}

.topRight {
  display: flex;
  align-items: center;
  gap: 12px;
}

.postedAt {
  font-size: 13px;
  color: #5280bc;
}

.bookmarkBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bookmarkIcon {
  font-size: 24px;
  color: #64748b;
}

.bookmarkIconActive {
  color: #4338ca;
}

.applyBtn {
  background: #9f191b;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.applyBtn:hover {
  background: #7f1d1d;
}

.saveTaskBtn {
  background: white;
  color: #5280bc;
  border: 1px solid #5280bc;
  border-radius: 12px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

/* Two Columns Layout */
.contentLayout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.leftCol {
  flex: 7;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.rightCol {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Tabs */
.tabsContainer {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.tab {
  padding: 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.activeTab {
  color: #4338ca;
  border-bottom-color: #4338ca;
}

/* Grey Content Cards */
.greyCard {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid #f1f5f9;
}

.sectionTitle {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 16px;
}

.textContent {
  font-size: 14px;
  color: #334155;
  line-height: 1.6;
}

.textContent ul {
  padding-left: 20px;
  margin: 0;
}

.textContent li {
  margin-bottom: 8px;
}

.applyActions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
}

.deadlineText {
  color: #dc2626;
  font-size: 13px;
  margin-top: 12px;
  display: block;
}

/* Right Sidebar Cards */
.generalInfoCard {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.generalInfoTitle {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 20px;
}

.infoList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.infoItem {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.infoIcon {
  color: #4338ca;
  font-size: 18px;
  margin-top: 2px;
}

.infoText {
  font-size: 14px;
  color: #1e293b;
}

.seeMoreTitle {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 16px;
}

.blueCard {
  background: #e0f2fe;
  border-radius: 16px;
  padding: 24px;
}

.blueCardTitle {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 12px;
}

.blueCardList {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.blueCardItem {
  font-size: 14px;
  color: #334155;
}

/* Related Work */
.relatedTitle {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 40px 0 20px;
}

.relatedList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 992px) {
  .contentLayout {
    flex-direction: column;
  }
  .headerCard {
    flex-direction: column;
  }
  .headerRight {
    align-items: flex-start;
    gap: 16px;
  }
}

.contentLayout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

/* LEFT 70% */
.leftCol {
  width: 70%;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

/* RIGHT 30% */
.rightCol {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";

import styles from "./JobDetail.module.css";
import { FiMapPin, FiBriefcase, FiUsers, FiClock } from "react-icons/fi";
import { BsCash } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
import { PiGraduationCap } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";

import type { Job } from "../../../../types/job";
import { fetchJobByIdApi, toggleBookmarkApi, formatSalary } from "../../../../service/jobApi";
import JobCard from "../../components/JobCard/JobCard";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Description");

  // Mock related jobs for the bottom section
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const requirementsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  const tabRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    Description: descriptionRef,
    Requirements: requirementsRef,
    Benefits: benefitsRef,
    Company: companyRef,
  };

  useEffect(() => {
    const getJob = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await fetchJobByIdApi(id);
        setJob(data);

        // Mock 3 related jobs
        setRelatedJobs([data, data, data]);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Job not found or an error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    getJob();
  }, [id]);

  const handleBookmark = async () => {
    if (!job) return;
    try {
      await toggleBookmarkApi(job.id);
      setJob({ ...job, isBookmarked: !job.isBookmarked });
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  if (isLoading) {
    return <div className={styles.wrapper}>Loading job details...</div>;
  }

  if (error || !job) {
    return (
      <div className={styles.wrapper}>
        <p>{error || "Job not found."}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* Content Layout */}
      <div className={styles.contentLayout}>
        {/* Left Column (70%) */}
        <div className={styles.leftCol}>

          {/* Header Card now inside leftCol */}
          <div className={styles.headerCard}>
            <div className={styles.logoWrapper}>
              <img src={job.logo} alt={job.title} className={styles.logoImage} />
            </div>

            <div className={styles.headerInfo}>
              <h1 className={styles.jobTitle}>{job.title}</h1>
              <p className={styles.jobCategory}>{job.category}</p>

              <div className={styles.skillsRow}>
                <span className={styles.skillsLabel}>Skills:</span>
                {job.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>{skill}</span>
                ))}
              </div>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <BsCash className={styles.metaIconYellow} />
                  <span>{formatSalary(job.salary)}</span>
                </div>
                <div className={styles.metaItem}>
                  <FiMapPin className={styles.metaIconRed} />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>

            <div className={styles.headerRight}>
              <div className={styles.topRight}>
                <span className={styles.postedAt}>{job.postedAt}</span>
                <button
                  className={styles.bookmarkBtn}
                  onClick={handleBookmark}
                  title={job.isBookmarked ? "Remove bookmark" : "Bookmark this job"}
                >
                  {job.isBookmarked ? (
                    <FaBookmark className={`${styles.bookmarkIcon} ${styles.bookmarkIconActive}`} />
                  ) : (
                    <FaBookmark className={styles.bookmarkIcon} />
                  )}
                </button>
              </div>
              <button className={styles.applyBtn}>
                Apply Now
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabsContainer}>
            {["Description", "Requirements", "Benefits", "Company"].map((tab) => (
              <div
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                onClick={() => {
                  setActiveTab(tab);

                  tabRefs[tab]?.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Cards below tabs */}
          <div ref={descriptionRef} className={styles.greyCard}>
            <h3 className={styles.sectionTitle}>Job Description:</h3>
            <div className={styles.textContent}>
              <ul>
                {job.description?.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={requirementsRef} className={styles.greyCard}>
            <h3 className={styles.sectionTitle}>Candidate Requirements:</h3>
            <div className={styles.textContent}>
              <ul>
                {job.requirements?.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={benefitsRef} className={styles.greyCard}>
            <h3 className={styles.sectionTitle}>Benefits:</h3>
            <div className={styles.textContent}>
              <ul>
                {job.benefits?.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={companyRef} className={styles.greyCard}>
            <h3 className={styles.sectionTitle}>Company:</h3>
            <div className={styles.textContent}>
              <ul>
                <li>{job.company?.name}</li>
                <li>Address: {job.company?.address}</li>
                {job.company?.bio && <li>{job.company.bio}</li>}
              </ul>
            </div>
          </div>

          <div className={styles.greyCard}>
            <h3 className={styles.sectionTitle}>Working Hours: <span style={{fontWeight: 'normal', fontSize: '14px', color: '#334155'}}>{job.workingHours}</span></h3>
          </div>

          <div className={styles.greyCard}>
            <h3 className={styles.sectionTitle}>How to Apply:</h3>
            <div className={styles.textContent}>
              Applicants can submit their applications online by clicking "Apply Now" below.
            </div>
            <div className={styles.applyActions}>
              <button className={styles.applyBtn}>Apply Now</button>
              <button className={styles.saveTaskBtn}>Save task</button>
            </div>
            <span className={styles.deadlineText}>Application deadline: {job.deadline}</span>
          </div>

        </div>

        {/* Right Column (30%) */}
        <div className={styles.rightCol}>
          <div className={styles.generalInfoCard}>
            <h3 className={styles.generalInfoTitle}>General Information</h3>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <AiOutlineUser className={styles.infoIcon} />
                <span className={styles.infoText}>Job Title: Employee</span>
              </div>
              <div className={styles.infoItem}>
                <PiGraduationCap className={styles.infoIcon} />
                <span className={styles.infoText}>Education: University degree or higher</span>
              </div>
              <div className={styles.infoItem}>
                <FiUsers className={styles.infoIcon} />
                <span className={styles.infoText}>Number of Vacancies: 1 person</span>
              </div>
              <div className={styles.infoItem}>
                <FiBriefcase className={styles.infoIcon} />
                <span className={styles.infoText}>Employment Type: {job.jobType}</span>
              </div>
              <div className={styles.infoItem}>
                <FiClock className={styles.infoIcon} />
                <span className={styles.infoText}>Application Deadline: {job.deadline}</span>
              </div>
            </div>
          </div>

          <h3 className={styles.seeMoreTitle}>See more</h3>

          <div className={styles.blueCard}>
            <h4 className={styles.blueCardTitle}>Skill Tags</h4>
            <div className={styles.blueCardList}>
              {['ReactJs', 'Java', 'JavaScript, TypeScript', 'Adobe', 'Design UI/UX', 'Data Analyst', 'Python'].map(skill => (
                <span key={skill} className={styles.blueCardItem}>{skill}</span>
              ))}
            </div>
          </div>

          <div className={styles.blueCard}>
            <h4 className={styles.blueCardTitle}>Department</h4>
            <div className={styles.blueCardList}>
              <span className={styles.blueCardItem}>Information Technology (IT) / Software Dev</span>
              <span className={styles.blueCardItem}>Marketing</span>
              <span className={styles.blueCardItemActive}>Business Development / Sales</span>
              <span className={styles.blueCardItem}>Design / Multimedia</span>
              <span className={styles.blueCardItem}>Finance / Accounting</span>
              <span className={styles.blueCardItem}>Human Resources (HR)</span>
              <span className={styles.blueCardItem}>Logistics / Operations</span>
              <span className={styles.blueCardItem}>Customer Service</span>
            </div>
          </div>

          <div className={styles.blueCard}>
            <h4 className={styles.blueCardTitle}>Salary</h4>
            <div className={styles.blueCardList}>
              <span className={styles.blueCardItem}>Under 10M VND</span>
              <span className={styles.blueCardItem}>10M - 20M VND</span>
              <span className={styles.blueCardItem}>20M - 30M VND</span>
              <span className={styles.blueCardItem}>&gt; 30M VND</span>
              <span className={styles.blueCardItem}>Negotiable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Relate Work Section */}
      <h2 className={styles.relatedTitle}>Relate Work</h2>
      <div className={styles.relatedList}>
        {relatedJobs.map((job, index) => (
          <JobCard key={`${job.id}-${index}`} job={job} onBookmark={async () => {}} />
        ))}
      </div>
    </div>
  );
};

export default JobDetail;