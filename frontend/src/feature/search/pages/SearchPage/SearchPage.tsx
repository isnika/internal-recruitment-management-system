import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Job } from "../../../../types/job";
import { filterJobsApi } from "../../../../service/jobApi";

import JobCard from "../../../job/components/JobCard/JobCard";

import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const [results, setResults] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const locationHook = useLocation();

  const query = new URLSearchParams(locationHook.search);

  const keyword = (query.get("q") || "").trim();

  const locationFilter = (query.get("location") || "").trim();

  useEffect(() => {
    const fetchData = async () => {
      // không có gì để search
      if (!keyword && !locationFilter) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const res = await filterJobsApi({
          keywords: keyword || undefined,
          location: locationFilter || undefined,
        });

        setResults(res);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locationHook.search]); //  FIX: quan trọng nhất

  const handleBookmark = (id: string) => {
    setResults((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...job, isBookmarked: !job.isBookmarked }
          : job
      )
    );
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Kết quả tìm kiếm:{" "}
          <span>
            "{keyword || locationFilter}"
          </span>
        </h2>

        {loading && (
          <p className={styles.loading}>
            Loading...
          </p>
        )}

        {!loading && results.length === 0 && (
          <p className={styles.empty}>
            Không tìm thấy job
          </p>
        )}

        {!loading && results.length > 0 && (
          <div className={styles.list}>
            {results.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}