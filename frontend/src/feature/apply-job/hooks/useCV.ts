// hooks/useCV.ts
import { useEffect, useState } from "react";
import cvApi from "../../../service/cvApi";

export const useCV = (cvId: number) => {
  const [cv, setCV] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await cvApi.getById(cvId);
      setCV(res.data);
      setLoading(false);
    };

    fetch();
  }, [cvId]);

  return { cv, loading };
};