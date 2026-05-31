import { useState, useEffect, useMemo } from "react";
import applicationApi, { Application } from "../../../../service/applicationApi";

export const useApplications = (jobId?: number) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let response;
      if (jobId) {
        response = await applicationApi.getApplicationsByJob(jobId);
      } else {
        // Nếu không truyền jobId, mặc định lấy của tôi hoặc xử lý tùy backend
        response = await applicationApi.getMyApplications();
      }
      setApplications(response.data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách ứng viên. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  // Xử lý lọc ứng viên ở Client
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
      const fullName = `${app.user.firstName} ${app.user.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchTerm.toLowerCase()) ||
        app.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [applications, searchTerm, statusFilter]);

  return {
    applications: filteredApplications,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedApplication,
    setSelectedApplication,
    refresh: fetchApplications,
    setApplications
  };
};