import { useState } from "react";

import StepIndicator from "./StepIndicator";
import PersonalStep from "../steps/PersonalStep";
import DocumentStep from "../steps/DocumentStep";
import ProfessionalStep from "../steps/ProfessionalStep";

import { useApplyJob } from "../../hooks/useApplyJob";

import styles from "./ApplyJobWizard.module.css";

export default function ApplyJobWizard({
  job,
  cv,
  onSubmitSuccess,
}: any) {
  const [step, setStep] = useState(0);

  const cvId = cv?.id;

  const { submit, loading, applied } =
    useApplyJob(job?.id, cvId);

  const [form, setForm] = useState({
    intro: "",
    salary: "",
    startDate: "",
  });

  if (applied) {
    return (
      <div className={styles.applied}>
        You already applied this job
      </div>
    );
  }

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      await submit();

      onSubmitSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <StepIndicator step={step} />

      <div className={styles.stepContent}>
        {step === 0 && <PersonalStep />}

        {step === 1 && (
          <DocumentStep cv={cv} />
        )}

        {step === 2 && (
          <ProfessionalStep
            job={job}
            form={form}
            setForm={setForm}
          />
        )}
      </div>

      <div className={styles.buttons}>
        {step > 0 && (
          <button
            className={styles.back}
            onClick={prevStep}
          >
            Back
          </button>
        )}

        {step < 2 && (
          <button
            className={styles.next}
            onClick={nextStep}
          >
            Next
          </button>
        )}

        {step === 2 && (
          <button
            className={styles.submit}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading
              ? "Submitting..."
              : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}