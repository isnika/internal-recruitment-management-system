import { useState } from "react";
import applicationApi from "../../../../../service/applicationApi";

import PersonalInfoSection from "../PersonalInfoSection/PersonalInfoSection";
import DocumentInfoSection from "../DocumentInfoSection/DocumentInfoSection";
import ProfessionalInfoSection from "../ProfessionalInfoSection/ProfessionalInfoSection";

import { FiX } from "react-icons/fi";
import styles from "./ApplyJobForm.module.css";

type Props = {
  job: Job;
  cvId: number;
  onSubmitSuccess: (application?: any) => void;
  onCancel?: () => void;
};

const ApplyJobForm = ({ job, cvId, onSubmitSuccess, onCancel }: Props) => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //  chống spam click
    if (loading) return;

    // nếu đã submit rồi thì không cho submit lại
    if (success) return;

    // validate
    if (!agreed) {
      alert("You must agree to Terms & Privacy Policy");
      return;
    }

    if (!job?.id) {
      alert("Missing job data");
      return;
    }

    if (!cvId) {
      alert("Please select a CV");
      return;
    }

    try {
      setLoading(true);

      const res = await applicationApi.create({
        jobId: job.id,
        cvId: cvId,
      });

      const application = res?.data;

      console.log("Application created:", application);

      // update UI state
      setSuccess(true);

      // notify parent (update job list / disable apply button / refetch)
      onSubmitSuccess(application);

    } catch (error: any) {
      console.error("Apply error:", error);

      alert(
        error?.response?.data?.message ||
          "Apply failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      {/* HEADER */}
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>
          RECRUITMENT INFORMATION
        </h2>

        {onCancel && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onCancel}
          >
            <FiX />
          </button>
        )}
      </div>

      {/* SUCCESS STATE */}
      {success ? (
        <div className={styles.successBox}>
           You applied successfully!
        </div>
      ) : (
        <>
          {/* BODY */}
          <div className={styles.formColumns}>
            <div className={styles.leftCol}>
              <PersonalInfoSection />
            </div>

            <div className={styles.rightCol}>
              <DocumentInfoSection />
            </div>
          </div>

          <div className={styles.separator} />

          <ProfessionalInfoSection jobTitle={job.title} />

          {/* FOOTER */}
          <div className={styles.footerRow}>
            <label className={styles.agreementLabel}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.agreementText}>
                I agree to the Terms & Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || success}
            >
              {loading
                ? "Submitting..."
                : success
                ? "Applied"
                : "Submit"}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default ApplyJobForm;