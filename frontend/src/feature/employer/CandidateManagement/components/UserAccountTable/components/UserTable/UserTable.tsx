import { useEffect, useState } from "react";

import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import styles from "./UserTable.module.css";

import type { User } from "../../../../../../../../types/user";

import { getAllUsers } from "../../../../../../../service/userApi";

import UserModal from "../UserModal/UserModal";

type ModalMode = "view" | "edit";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [modalMode, setModalMode] =
    useState<ModalMode>("view");

  // FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();

        const candidateUsers =
          allUsers.filter(
            (user) =>
              user.role === "candidate"
          );

        setUsers(candidateUsers);
      } catch (error) {
        console.error(
          "Failed to fetch users:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // FORMAT DATE
  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "vi-VN"
    );
  };

  // OPEN MODAL
  const openModal = (
    user: User,
    mode: ModalMode
  ) => {
    setSelectedUser(user);
    setModalMode(mode);
  };

  // DELETE USER
  const handleDelete = (
    id: number | string
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    setUsers((prevUsers) =>
      prevUsers.filter(
        (user) => user.id !== id
      )
    );
  };

  // STATUS STYLE
  const getStatusClass = (
    status?: string
  ) => {
    return status?.toLowerCase() ===
      "active"
      ? styles.active
      : styles.inactive;
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading users...
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                />
              </th>

              <th>#</th>
              <th>ID</th>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      className={
                        styles.checkbox
                      }
                    />
                  </td>

                  <td>{index + 1}</td>

                  <td>{user.id}</td>

                  <td>
                    {user.fullName ||
                      "N/A"}
                  </td>

                  <td>
                    {formatDate(
                      user.dob
                    )}
                  </td>

                  <td>
                    {user.gender || "N/A"}
                  </td>

                  <td>
                    {user.phone || "N/A"}
                  </td>

                  <td>
                    {user.email || "N/A"}
                  </td>

                  <td>
                    <span
                      className={`${styles.status} ${getStatusClass(
                        user.status
                      )}`}
                    >
                      {user.status ||
                        "Unknown"}
                    </span>
                  </td>

                  <td>
                    <div
                      className={
                        styles.actionIcons
                      }
                    >
                      {/* VIEW */}
                      <button
                        className={
                          styles.actionBtn
                        }
                        onClick={() =>
                          openModal(
                            user,
                            "view"
                          )
                        }
                      >
                        <FiEye />
                      </button>

                      {/* EDIT */}
                      <button
                        className={
                          styles.actionBtn
                        }
                        onClick={() =>
                          openModal(
                            user,
                            "edit"
                          )
                        }
                      >
                        <FiEdit2 />
                      </button>

                      {/* DELETE */}
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() =>
                          handleDelete(
                            user.id
                          )
                        }
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
                  colSpan={10}
                  className={styles.empty}
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          mode={modalMode}
          onClose={() =>
            setSelectedUser(null)
          }
        />
      )}
    </>
  );
}