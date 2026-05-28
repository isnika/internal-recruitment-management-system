import { useEffect, useState } from "react";
import { skillApi } from "../service/skillApi";
import { experienceLevelApi } from "../service/experienceLevelApi";
import { departmentApi } from "../service/departmentApi";
import { companyApi } from "../service/companyApi";

export const useJobMetadata = () => {
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    try {
      const [
        skills,
        experienceLevels,
        categories,
        companies,
      ] = await Promise.all([
        skillApi.getAll(),
        experienceLevelApi.getAll(),
        departmentApi.getAll(),
        companyApi.getAll(),
      ]);

      setMetadata({
        skills,
        experienceLevels,
        categories,
        companies,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    metadata,
    loading,
    refetchMetadata: fetchMetadata,
  };
};