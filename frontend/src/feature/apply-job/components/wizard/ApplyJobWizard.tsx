import { useState } from "react";

import StepIndicator from "./StepIndicator";
import PersonalStep from "../steps/PersonalStep";
import DocumentStep from "../steps/DocumentStep";
import ProfessionalStep from "../steps/ProfessionalStep";

import { useApplyJob } from "../../hooks/useApplyJob";
import { useCV } from "../../hooks/useCV";

import styles from "./ApplyJobWizard.module.css";

export default function ApplyJobWizard({ job, cvId }: any) {
  const [step, setStep] = useState(0);

  const { cv, loading: cvLoading } = useCV(cvId);
  const { submit, loading, applied } = useApplyJob(job?.id, cvId);

  const [form, setForm] = useState({
    intro: "",
    salary: "",
    startDate: "",
  });

  // ❌ already applied
  if (applied) {
    return <div className={styles.applied}>You already applied this job</div>;
  }

  // 🚀 step control safe
  const nextStep = () => {
    setStep((prev) => (prev < 2 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // 🚀 submit validation
  const handleSubmit = async () => {
    if (!form.intro || !form.salary || !form.startDate) {
      alert("Please fill all fields");
      return;
    }

    await submit(form);
  };

  return (
    <div className={styles.container}>
      <StepIndicator step={step} />

      <div className={styles.stepContent}>
        {step === 0 && <PersonalStep />}

        {step === 1 ? (
          cvLoading ? (
            <div>Loading CV...</div>
          ) : (
            <DocumentStep cv={cv} />
          )
        ) : null}

        {step === 2 && (
          <ProfessionalStep job={job} form={form} setForm={setForm} />
        )}
      </div>

      <div className={styles.buttons}>
        {step > 0 && (
          <button className={styles.back} onClick={prevStep}>
            Back
          </button>
        )}

        {step < 2 && (
          <button className={styles.next} onClick={nextStep}>
            Next
          </button>
        )}

        {step === 2 && (
          <button
            className={styles.submit}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}