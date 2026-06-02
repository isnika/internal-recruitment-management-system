import React, { useState, useMemo, useEffect } from "react";
import styles from "./SkillManagement.module.css";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
} from "react-icons/fi";

import { skillApi } from "../../../../service/skillApi";
import type { Skill } from "../../../../types/skill";

const LIMIT = 10;

const SkillManagement = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillName, setSkillName] = useState("");

  // =========================
  // FETCH DATA (BACKEND)
  // =========================
  const fetchSkills = async (keyword?: string) => {
    setLoading(true);
    try {
      const data = await skillApi.getAll(keyword);
      setSkills(data);
    } catch (err) {
      console.error("Load skills failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSkills(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    fetchSkills();
  }, []);

  // =========================
  // PAGINATION (FRONTEND)
  // =========================
  const filteredSkills = skills;

  const totalPages = Math.ceil(filteredSkills.length / LIMIT) || 1;

  const displayedSkills = useMemo(() => {
    return filteredSkills.slice((page - 1) * LIMIT, page * LIMIT);
  }, [filteredSkills, page]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [skills]);

  // =========================
  // MODAL
  // =========================
  const openModal = (skill: Skill | null = null) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillName(skill.name);
    } else {
      setEditingSkill(null);
      setSkillName("");
    }
    setIsModalOpen(true);
  };

  // =========================
  // SAVE (CREATE / UPDATE)
  // =========================
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    try {
      if (editingSkill) {
        const updated = await skillApi.update(editingSkill.id, {
          name: skillName.trim(),
        });

        setSkills((prev) =>
          prev.map((s) => (s.id === editingSkill.id ? updated : s))
        );
      } else {
        const created = await skillApi.create({
          name: skillName.trim(),
        });

        setSkills((prev) => [created, ...prev]);
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
    if (!window.confirm("Delete this skill?")) return;

    try {
      await skillApi.delete(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
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
          <h1 className={styles.title}>Skill Repository</h1>
          <p className={styles.subtitle}>
            Manage developer skills & tags
          </p>
        </div>

        <button className={styles.createBtn} onClick={() => openModal()}>
          <FiPlus /> Add Skill
        </button>
      </header>

      {/* SEARCH */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                <th>ID</th>
                <th>Skill</th>
                <th align="right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {displayedSkills.length > 0 ? (
                displayedSkills.map((skill) => (
                  <tr key={skill.id}>
                    <td>#SKL-{skill.id}</td>
                    <td>
                      <span className={styles.tagBadge}>
                        <FiCpu />
                        {skill.name}
                      </span>
                    </td>
                    <td align="right">
                      <button onClick={() => openModal(skill)}>
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(skill.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} align="center">
                    No skills found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <span>
          Total <b>{skills.length}</b> skills
        </span>

        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            <FiChevronLeft /> Prev
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next <FiChevronRight />
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{editingSkill ? "Edit Skill" : "Create Skill"}</h3>

            <form onSubmit={handleSave}>
              <input
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="Skill name..."
                required
              />

              <div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillManagement;