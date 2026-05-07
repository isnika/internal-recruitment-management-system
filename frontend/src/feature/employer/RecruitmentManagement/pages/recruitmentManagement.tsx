import React, { useState, useEffect, useMemo } from "react";
import styles from "./RecruitmentManagement.module.css";
import { fetchJobsApi } from "../../../../service/jobApi";
import type { Job } from "../../../../types/job";
import RecruitmentFilterBar from "../components/RecruitmentFilterBar/RecruitmentFilterBar";
import RecruitmentTable from "../components/RecruitmentTable/RecruitmentTable";
import CreateJobModal from "../components/CreateJobModal/CreateJobModal";
import DeleteJobModal from "../components/DeleteJobModal/DeleteJobModal";

const RecruitmentManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [jobType, setJobType] = useState("");
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetchJobsApi("View All", 1, 100); // Fetch max 100 for local filtering demo
        // Filter jobs by current mock employer
        const myJobs = res.jobs.filter(job => job.createdBy === "company1");
        setJobs(myJobs);
        setTotalJobs(myJobs.length);
      } catch (err) {
        console.error("Failed to load jobs", err);
      }
    };
    loadJobs();
  }, []);

  // Local Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchDept =
        department === "" || (job.department || job.category) === department;

      const matchJobType = jobType === "" || job.jobType === jobType;

      // Status is mocked as 'Posted' for all jobs right now in UI
      const matchStatus = status === "" || status === "Posted";

      return matchSearch && matchDept && matchJobType && matchStatus;
    });
  }, [jobs, searchQuery, department, status, jobType]);

  const handleSaveJob = (newJob: Partial<Job>) => {
    if (editingJob) {
      setJobs(jobs.map(j => j.id === newJob.id ? { ...j, ...newJob } as Job : j));
    } else {
      setJobs([newJob as Job, ...jobs]);
      setTotalJobs(prev => prev + 1);
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsCreateModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setIsCreateModalOpen(true);
  };

  const handleDeleteJob = (job: Job) => {
    setDeletingJob(job);
  };

  const handleConfirmDelete = () => {
    if (deletingJob) {
      setJobs(jobs.filter(j => j.id !== deletingJob.id));
      setTotalJobs(prev => prev - 1);
      setDeletingJob(null);
    }
  };

  return (
    <div className={styles.recruitmentSection}>
      <RecruitmentFilterBar
        onSearch={setSearchQuery}
        onDepartmentChange={setDepartment}
        onStatusChange={setStatus}
        onEmploymentTypeChange={setJobType}
        onCreateJob={handleOpenCreateModal}
      />

      {/* Info Banner */}
      <div className={styles.infoBanner}>
        Showing {filteredJobs.length} of {totalJobs} jobs
      </div>

      <RecruitmentTable jobs={filteredJobs} onEditJob={handleEditJob} onDeleteJob={handleDeleteJob} />

      <CreateJobModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSaveJob}
        initialData={editingJob}
      />

      <DeleteJobModal
        isOpen={!!deletingJob}
        jobTitle={deletingJob?.title || ""}
        onClose={() => setDeletingJob(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default RecruitmentManagement;
