import { useEffect, useState } from "react";
import { fetchMetadataApi, type HomeMetadata } from "../service/jobApi";

export const useHomeMetadata = () => {
  const [metadata, setMetadata] = useState<HomeMetadata | null>(null);
  const [isMetaLoading, setIsMetaLoading] = useState(true);

  useEffect(() => {
    const getMeta = async () => {
      try {
        const data = await fetchMetadataApi();
        setMetadata(data);
      } catch (err) {
        console.error("Lỗi metadata:", err);
      } finally {
        setIsMetaLoading(false);
      }
    };

    getMeta();
  }, []);

  return { metadata, isMetaLoading };
};