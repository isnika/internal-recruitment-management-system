import { useEffect, useState } from "react";
import jobApi from "../service/jobApi";
import type { HomeMetadata, Job } from "../types/job";

export const useHomeMetadata = () => {
  const [metadata, setMetadata] = useState<HomeMetadata | null>(null);
  const [isMetaLoading, setIsMetaLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsMetaLoading(true);

        // 🔥 LẤY TOÀN BỘ JOB ACTIVE TỪ API FILTER
        const jobs: Job[] = await jobApi.filter({
          status: "ACTIVE",
        });

    console.log(jobs);

        // CATEGORY
        const categories = Array.from(
          new Map(
            jobs
              .filter((job) => job.category)
              .map((job) => [job.category.id, job.category])
          ).values()
        );

        // SKILLS
        const allSkills = jobs.flatMap((job) => job.skills || []);

        const skills = Array.from(
          new Map(allSkills.map((skill) => [skill.id, skill])).values()
        );

        // EXPERIENCE LEVEL
        const experienceLevels = Array.from(
          new Map(
            jobs
              .filter((job) => job.experienceLevel)
              .map((job) => [
                job.experienceLevel.id,
                job.experienceLevel,
              ])
          ).values()
        );

        setMetadata({
          categories,
          skills,
          experienceLevels,
        });
      } catch (err: any) {
        console.error("❌ METADATA ERROR:", err);
        setError(err?.message || "Lỗi tải metadata");
      } finally {
        setIsMetaLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  return {
    metadata,
    isMetaLoading,
    error,
  };
};