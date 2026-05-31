import { useState } from "react";
import applicationApi from "../../../service/applicationApi";

export const useApplyJob = (
  jobId: number,
  cvId: number
) => {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const submit = async () => {
    setLoading(true);

    try {
      await applicationApi.applyJob({
        jobId,
        cvId,
      });

      setApplied(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    applied,
  };
};