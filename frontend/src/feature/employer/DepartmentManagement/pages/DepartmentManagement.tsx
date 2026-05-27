import React, { useState, useMemo } from "react";
import styles from "./DepartmentManagement.module.css";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiGrid } from "react-icons/fi";

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
}

// Mock Data ban đầu
const MOCK_DEPARTMENTS: Department[] = [
  { id: 1, name: "Engineering", code: "ENG", description: "Software development and technical operations" },
  { id: 2, name: "Human Resources", code: "HR", description: "Talent acquisition and employee relations" },
  { id: 3, name: "Marketing", code: "MKT", description: "Brand awareness and growth marketing" },
  { id: 4, name: "Design", code: "DSN", description: "UI/UX Product Design and creative assets" },
  { id: 5, name: "Sales", code: "SAL", description: "Enterprise and commercial business sales" },
];

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  // Form State cho Tạo/Sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: "", code: "", description: "" });

  // Filter & Phân trang
  const filteredDepts = useMemo(() => {
    return departments.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [departments, search]);

  const totalPages = Math.ceil(filteredDepts.length / limit) || 1;

  const displayedDepts = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredDepts.slice(start, start + limit);
  }, [filteredDepts, page]);

  // Hành động Open Modal
  const openModal = (dept: Department | null = null) => {
    if (dept) {
      setEditingDept(dept);
      setFormData({ name: dept.name, code: dept.code, description: dept.description });
    } else {
      setEditingDept(null);
      setFormData({ name: "", code: "", description: "" });
    }
    setIsModalOpen(true);
  };

  // Submit Save/Update
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) return;

    if (editingDept) {
      setDepartments(prev => prev.map(d => d.id === editingDept.id ? { ...d, ...formData } : d));
    } else {
      const newDept: Department = {
        id: Date.now(),
        ...formData
      };
      setDepartments(prev => [newDept, ...prev]);
    }
    setIsModalOpen(false);
  };

  // Delete
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Department Management</h1>
          <p className={styles.subtitle}>Organize and structure company structural divisions</p>
        </div>
        <button className={styles.createBtn} onClick={() => openModal()}>
          <FiPlus /> Add Department
        </button>
      </header>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Department Name</th>
              <th>Description</th>
              <th align="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedDepts.length > 0 ? (
              displayedDepts.map(dept => (
                <tr key={dept.id}>
                  <td><span className={styles.codeBadge}>{dept.code}</span></td>
                  <td className={styles.boldText}>{dept.name}</td>
                  <td className={styles.descText}>{dept.description || "—"}</td>
                  <td align="right">
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => openModal(dept)}><FiEdit2 /></button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(dept.id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} align="center" className={styles.emptyState}>No departments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <span className={styles.pageInfo}>Showing <strong>{displayedDepts.length}</strong> of <strong>{filteredDepts.length}</strong> entries</span>
        <div className={styles.pageActions}>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={styles.pageBtn}><FiChevronLeft /> Prev</button>
          <span className={styles.pageIndicator}>Page <strong>{page}</strong> of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className={styles.pageBtn}>Next <FiChevronRight /></button>
        </div>
      </div>

      {/* COMPACT MODAL CƠ BẢN */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{editingDept ? "Edit Department" : "Add New Department"}</h3>
            <form onSubmit={handleSave} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Department Code *</label>
                <input type="text" required placeholder="e.g. ENG" value={formData.code} onChange={e => setFormData(p => ({ ...p, code: e.target.value.toUpperCase() }))} />
              </div>
              <div className={styles.formGroup}>
                <label>Department Name *</label>
                <input type="text" required placeholder="e.g. Engineering" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea rows={3} placeholder="Briefly describe the functions..." value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Save changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;