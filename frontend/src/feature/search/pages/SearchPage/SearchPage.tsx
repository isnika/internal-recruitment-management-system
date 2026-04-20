import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Job } from "../../../../types/job";
import { searchApi } from "../../../../service/searchApi";

import JobCard from "../../../job/components/JobCard/JobCard";

import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const [results, setResults] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const locationHook = useLocation();
  const query = new URLSearchParams(locationHook.search);

  const keyword = decodeURIComponent(query.get("q") || "")
    .trim()
    .toLowerCase();

  const locationFilter = decodeURIComponent(query.get("location") || "")
    .trim()
    .toLowerCase();

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await searchApi.searchJobs(keyword);

        const filtered = res.filter((job) => {
          const matchLocation = locationFilter
            ? job.location?.toLowerCase().includes(locationFilter)
            : true;

          return matchLocation;
        });

        setResults(filtered);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, locationFilter]);

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
          Kết quả cho: <span>"{keyword}"</span>
        </h2>

        {loading && <p className={styles.loading}>Loading...</p>}

        {!loading && results.length === 0 && (
          <p className={styles.empty}>Không tìm thấy job</p>
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