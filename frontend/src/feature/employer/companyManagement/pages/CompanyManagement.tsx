import React, { useEffect, useState, useRef } from "react";
import styles from "./CompanyManagement.module.css";
import companyApi from "../../../../service/companyApi";
import type { Company } from "../../../../types/company";

// Import các sub-components mới tách
import { CompanyFilter } from "../components/CompanyFilter";
import { CompanyForm } from "../components/CompanyForm";
import { CompanyCard } from "../components/CompanyCard";

type FormState = {
  name: string;
  description: string;
  address: string;
  website: string;
  status: "ACTIVE" | "INACTIVE";
};

const INITIAL_FORM: FormState = {
  name: "",
  description: "",
  address: "",
  website: "",
  status: "ACTIVE",
};

const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Filter states
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // =========================
  // DEBOUNCE KEYWORD SEARCH
  // =========================
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 400);

    return () => clearTimeout(handler);
  }, [keyword]);

  // =========================
  // FETCH DATA
  // =========================
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyApi.getAll({
        keyword: debouncedKeyword.trim(),
        status: statusFilter || undefined,
      });
      setCompanies(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [debouncedKeyword, statusFilter]);

  // =========================
  // HANDLE FORM INPUTS
  // =========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await companyApi.update(editingId, form);
      } else {
        await companyApi.create(form);
      }
      resetForm();
      fetchCompanies();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // =========================
  // ACTIONS
  // =========================
  const handleEdit = (c: Company) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      description: c.description || "",
      address: c.address || "",
      website: c.website || "",
      status: c.status as "ACTIVE" | "INACTIVE",
    });

    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa công ty này không?")) return;
    try {
      await companyApi.delete(id);
      fetchCompanies();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUploadLogo = async (id: number, fileToUpload: File) => {
    try {
      await companyApi.updateLogo(id, fileToUpload);
      alert("Cập nhật logo thành công!");
      fetchCompanies();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Đã xảy ra lỗi khi upload logo");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Company Management</h2>

      {/* BỘ LỌC TÌM KIẾM */}
      <CompanyFilter
        keyword={keyword}
        setKeyword={setKeyword}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* FORM THÊM / SỬA */}
      <CompanyForm
        form={form}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={resetForm}
        formRef={formRef}
      />

      {/* DANH SÁCH HIỂN THỊ */}
      {loading ? (
        <div className={styles.loading}>Đang tải dữ liệu...</div>
      ) : (
        <div className={styles.grid}>
          {companies.length === 0 ? (
            <div className={styles.noData}>Không tìm thấy dữ liệu phù hợp.</div>
          ) : (
            companies.map((c) => (
              <CompanyCard
                key={c.id}
                company={c}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onUploadLogo={handleUploadLogo}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;