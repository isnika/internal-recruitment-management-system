import { useEffect, useState } from "react";

import {
  fetchMetadataApi,
  type HomeMetadata,
} from "../service/jobApi";

export const useHomeMetadata = () => {
  const [metadata, setMetadata] =
    useState<HomeMetadata | null>(null);

  const [isMetaLoading, setIsMetaLoading] =
    useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const getMeta = async () => {
      try {
        setIsMetaLoading(true);

        const data = await fetchMetadataApi();

        setMetadata(data);
      } catch (err: any) {
        console.error("Lỗi metadata:", err);

        setError(
          err?.message || "Không thể tải metadata"
        );
      } finally {
        setIsMetaLoading(false);
      }
    };

    getMeta();
  }, []);

  return {
    metadata,
    isMetaLoading,
    error,
  };
};