import React, { useState, useMemo, useEffect } from "react";
import styles from "./ExperienceLevelManagement.module.css";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiAward,
} from "react-icons/fi";

import { experienceLevelApi } from "../../../../service/experienceLevelApi";
import type { ExperienceLevel } from "../../../../service/types/experienceLevel";

const LIMIT = 10;

const ExperienceLevelManagement = () => {
  const [levels, setLevels] = useState<ExperienceLevel[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<ExperienceLevel | null>(null);

  const [formData, setFormData] = useState({
    name: "",
  });

  // =========================
  // FETCH
  // =========================
  const fetchLevels = async () => {
    setLoading(true);
    try {
      const data = await experienceLevelApi.getAll();
      setLevels(data);
    } catch (err) {
      console.error("Load experience levels failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  // =========================
  // FILTER
  // =========================
  const filteredLevels = useMemo(() => {
    return levels.filter((l) =>
      l.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [levels, search]);

  const totalPages = Math.ceil(filteredLevels.length / LIMIT) || 1;

  const displayedLevels = useMemo(() => {
    return filteredLevels.slice((page - 1) * LIMIT, page * LIMIT);
  }, [filteredLevels, page]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [levels]);

  // =========================
  // MODAL
  // =========================
  const openModal = (level: ExperienceLevel | null = null) => {
    if (level) {
      setEditingLevel(level);
      setFormData({
        name: level.name,
      });
    } else {
      setEditingLevel(null);
      setFormData({
        name: "",
      });
    }
    setIsModalOpen(true);
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      name: formData.name.trim(),
    };

    try {
      if (editingLevel) {
        const updated = await experienceLevelApi.update(editingLevel.id, payload);

        setLevels((prev) =>
          prev.map((l) => (l.id === editingLevel.id ? updated : l))
        );
      } else {
        const created = await experienceLevelApi.create(payload);

        setLevels((prev) => [created, ...prev]);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this experience level?")) return;

    try {
      await experienceLevelApi.delete(id);
      setLevels((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Experience Levels</h1>
          <p className={styles.subtitle}>
            Define candidate seniority structure
          </p>
        </div>

        <button className={styles.createBtn} onClick={() => openModal()}>
          <FiPlus /> Add Level
        </button>
      </header>

      {/* SEARCH */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search levels..."
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        {loading ? (
          <p style={{ padding: 20 }}>Loading...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Experience Level</th>
                <th align="right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {displayedLevels.length > 0 ? (
                displayedLevels.map((lvl) => (
                  <tr key={lvl.id}>
                    <td>
                      <FiAward /> {lvl.name}
                    </td>

                    <td align="right">
                      <button onClick={() => openModal(lvl)}>
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(lvl.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} align="center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <span>Total <b>{levels.length}</b></span>

        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            <FiChevronLeft /> Prev
          </button>

          <span>{page} / {totalPages}</span>

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next <FiChevronRight />
          </button>
        </div>
      </div>

      {/* MODAL */}
      {/* MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              {editingLevel ? "Edit Experience Level" : "Create Experience Level"}
            </h3>

            <form onSubmit={handleSave}>
              <input
                placeholder="Experience level name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    name: e.target.value,
                  })
                }
              />

              <div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceLevelManagement;