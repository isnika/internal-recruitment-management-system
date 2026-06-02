import { useState } from "react";
import applicationApi from "../../../service/applicationApi";

export const useApplyJob = (jobId: number, cvId: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Gọi đúng hàm .create() theo định nghĩa trong file applicationApi
      await applicationApi.create({
        jobId,
        cvId,
      });

      setApplied(true);
    } catch (err: any) {
      console.error("Lỗi khi ứng tuyển:", err);
      setError(err?.response?.data?.message || "Nộp đơn ứng tuyển thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    applied,
    error,
  };
};