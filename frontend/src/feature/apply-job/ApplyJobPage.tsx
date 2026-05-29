import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import ApplyJobWizard from "./components/wizard/ApplyJobWizard";
import { jobApi } from "../../service/jobApi";

import type { Job } from "../../types/job";

export default function ApplyJobPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(
    location.state?.job || null
  );

  const [loading, setLoading] = useState(!job);

  
  // FETCH JOB (fallback nếu refresh page)
  useEffect(() => {
    const fetchJob = async () => {
      if (job) return;
      if (!jobId) return;

      try {
        setLoading(true);

        const res = await jobApi.getById(Number(jobId));

        setJob(res);
      } catch (err) {
        console.error("Failed to load job:", err);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  
  // LOADING STATE
  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        Loading apply form...
      </div>
    );
  }
  
  // NOT FOUND
  if (!job) {
    return (
      <div style={{ padding: 20 }}>
        Job not found

        <button
          onClick={() => navigate("/jobs")}
          style={{ marginTop: 10 }}
        >
          Back to jobs
        </button>
      </div>
    );
  }

  
  // CV ID (REAL PROJECT SHOULD COME FROM USER CV LIST)
  const cvId = 1; // TODO: replace with CV selector / user CV API

  // APPLY WIZARD
  return (
    <ApplyJobWizard
      job={job}
      cvId={cvId}
      onSubmitSuccess={() => {
        navigate(`/jobs/${job.id}`, {
          state: {
            applied: true,
          },
        });
      }}
    />
  );
}