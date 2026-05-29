// hooks/useApplyJob.ts
import { useState } from "react";
import applicationApi from "../../../service/applicationApi";

export const useApplyJob = (jobId: number, cvId: number) => {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const submit = async (form: any) => {
    try {
      setLoading(true);

      const res = await applicationApi.create({
        jobId,
        cvId,
        ...form,
      });

      setApplied(true);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, applied };
};