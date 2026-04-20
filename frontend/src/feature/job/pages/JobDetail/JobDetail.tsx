import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Cards below tabs */}
          <div className={styles.greyCard}>
            <h3 className={styles.sectionTitle}>Job Description:</h3>
            <div className={styles.textContent}>
              <ul>
                {job.description?.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.greyCard}>
            <h3 className={styles.sectionTitle}>Candidate Requirements:</h3>
            <div className={styles.textContent}>
              <ul>
                {job.requirements?.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.greyCard}>
            <h3 className={styles.sectionTitle}>Benefits:</h3>
            <div className={styles.textContent}>
              <ul>
                {job.benefits?.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.greyCard}>
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
