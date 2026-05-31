import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import ApplyJobWizard from "./components/wizard/ApplyJobWizard";

import { jobApi } from "../../service/jobApi";
import cvApi from "../../service/cvApi";

import type { Job } from "../../types/job";

export default function ApplyJobPage() {
  const { jobId } = useParams<{ jobId: string }>();

  const location = useLocation();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(
    location.state?.job || null
  );

  const [cvs, setCvs] = useState<any[]>([]);
  const [selectedCvId, setSelectedCvId] = useState<number | null>(null);

  const [loadingJob, setLoadingJob] = useState(!job);
  const [loadingCv, setLoadingCv] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchJob = async () => {
      if (job) {
        setLoadingJob(false);
        return;
      }

      if (!jobId) {
        setLoadingJob(false);
        return;
      }

      try {
        const data = await jobApi.getById(Number(jobId));
        setJob(data);
      } catch (error) {
        console.error("Failed to load job:", error);
        setJob(null);
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJob();
  }, [jobId, job]);

  useEffect(() => {
    const fetchCv = async () => {
      try {
        const data = await cvApi.getMyCvs();

        setCvs(data || []);

        if (data?.length > 0) {
          setSelectedCvId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to load CV:", error);
      } finally {
        setLoadingCv(false);
      }
    };

    fetchCv();
  }, []);

  const selectedCv =
    cvs.find((cv) => cv.id === selectedCvId) || null;

  if (loadingJob || loadingCv) {
    return (
      <div style={{ padding: 20 }}>
        Loading apply form...
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Job not found</h3>

        <button onClick={() => navigate("/jobs")}>
          Back to jobs
        </button>
      </div>
    );
  }

  if (cvs.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h3>You don't have any CV yet.</h3>

        <button
          onClick={() => navigate("/profile/cv")}
        >
          Upload CV
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label>Select CV:</label>

        <select
          value={selectedCvId ?? ""}
          onChange={(e) =>
            setSelectedCvId(Number(e.target.value))
          }
        >
          {cvs.map((cv) => (
            <option
              key={cv.id}
              value={cv.id}
            >
              CV #{cv.id}
            </option>
          ))}
        </select>
      </div>

      <ApplyJobWizard
        job={job}
        cv={selectedCv}
        onSubmitSuccess={() => {
          navigate("/profile/applied");
        }}
      />
    </>
  );
}