import React, { useState, useMemo, useEffect } from "react";
import styles from "./DepartmentManagement.module.css";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { departmentApi } from "../../../../service/departmentApi";

interface Department {
  id: number;
  name: string;
}

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
  });

   
  // FETCH DATA
   
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await departmentApi.getAll();

      setDepartments(res);
    } catch (error) {
      console.log(error);
    }
  };

   
  // FILTER
   
  const filteredDepts = useMemo(() => {
    return departments.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [departments, search]);

   
  // PAGINATION
   
  const totalPages = Math.ceil(filteredDepts.length / limit) || 1;

  const displayedDepts = useMemo(() => {
    const start = (page - 1) * limit;

    return filteredDepts.slice(start, start + limit);
  }, [filteredDepts, page]);

   
  // OPEN MODAL
   
  const openModal = (dept: Department | null = null) => {
    if (dept) {
      setEditingDept(dept);

      setFormData({
        name: dept.name,
      });
    } else {
      setEditingDept(null);

      setFormData({
        name: "",
      });
    }

    setIsModalOpen(true);
  };

   
  // SAVE
   
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingDept) {
        await departmentApi.update(editingDept.id, {
          name: formData.name,
        });
      } else {
        await departmentApi.create({
          name: formData.name,
        });
      }

      await fetchDepartments();

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

   
  // DELETE
   
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await departmentApi.delete(id);

        await fetchDepartments();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Department Management</h1>

          <p className={styles.subtitle}>
            Organize company departments
          </p>
        </div>

        <button
          className={styles.createBtn}
          onClick={() => openModal()}
        >
          <FiPlus />
          Add Department
        </button>
      </header>

      {/* SEARCH */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />

          <input
            type="text"
            placeholder="Search by department name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Department Name</th>
              <th align="right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {displayedDepts.length > 0 ? (
              displayedDepts.map((dept) => (
                <tr key={dept.id}>
                  <td className={styles.boldText}>
                    {dept.name}
                  </td>

                  <td align="right">
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => openModal(dept)}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(dept.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  align="center"
                  className={styles.emptyState}
                >
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <span className={styles.pageInfo}>
          Showing <strong>{displayedDepts.length}</strong> of{" "}
          <strong>{filteredDepts.length}</strong> entries
        </span>

        <div className={styles.pageActions}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={styles.pageBtn}
          >
            <FiChevronLeft />
            Prev
          </button>

          <span className={styles.pageIndicator}>
            Page <strong>{page}</strong> of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={styles.pageBtn}
          >
            Next
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              {editingDept
                ? "Edit Department"
                : "Add New Department"}
            </h3>

            <form
              onSubmit={handleSave}
              className={styles.form}
            >
              <div className={styles.formGroup}>
                <label>Department Name *</label>

                <input
                  type="text"
                  required
                  placeholder="e.g. Engineering"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.submitBtn}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;