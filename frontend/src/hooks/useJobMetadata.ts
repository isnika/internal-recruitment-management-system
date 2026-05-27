import { useEffect, useState } from "react";
import { skillApi } from "../service/skillApi";
{/*}import { departmentApi } from "../service/departmentApi";*/}
import { experienceLevelApi } from "../service/experienceLevelApi";

export const useJobMetadata = () => {
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const [skills, categories, experienceLevels] =
          await Promise.all([
            skillApi.getAll(),
            departmentApi.getAll(),
            experienceLevelApi.getAll(),
          ]);

        setMetadata({
          skills,
          categories,
          experienceLevels,
        });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { metadata, loading, error };
};