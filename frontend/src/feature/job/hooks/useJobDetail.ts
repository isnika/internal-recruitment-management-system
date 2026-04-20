import { useEffect, useState } from "react";
import { fetchJobByIdApi } from "@/service/jobApi";
import type { Job } from "@/types/job";

export const useJobDetail = (id?: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await fetchJobByIdApi(id);
        setJob(data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  return { job, loading };
};