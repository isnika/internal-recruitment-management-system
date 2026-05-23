import { useEffect, useState } from "react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

import styles from "./UserTable.module.css";

import type { CandidateProfile } from "../../../../../../../../types/candidate";
import { getAllProfiles } from "../../../../../../../service/candidateApi";

import UserModal from "../UserModal/UserModal";

type ModalMode = "view" | "edit";

export default function UserTable() {
  const [users, setUsers] = useState<CandidateProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<CandidateProfile | null>(null);
  const [modalMode, setModalMode] =
    useState<ModalMode>("view");

  //  
  // FETCH USERS
  //  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: any = await getAllProfiles();
        const candidateUsers = response?.data || response;

        setUsers(Array.isArray(candidateUsers) ? candidateUsers : []);
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

  //  
  // FORMAT DATE
  //  
  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "vi-VN"
    );
  };

  //  
  // OPEN MODAL
  //  
  const openModal = (
    user: CandidateProfile,
    mode: ModalMode
  ) => {
    setSelectedUser(user);
    setModalMode(mode);
  };

  //  
  // DELETE UI ONLY
  //  
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    setUsers((prev) =>
      prev.filter((u) => u.id !== id)
    );

    if (selectedUser?.id === id) {
      setSelectedUser(null);
    }
  };

  //  
  // STATUS CLASS
  //  
  const getStatusClass = (status?: string) => {
    return status?.toLowerCase() === "active"
      ? styles.active
      : styles.inactive;
  };

  //  
  // LOADING
  //  
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
                <input type="checkbox" />
              </th>
              <th>#</th>
              <th>ID</th>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Phone</th>
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
                    <input type="checkbox" />
                  </td>

                  <td>{index + 1}</td>
                  <td>{user.id}</td>

                  {/* FIX: backend field */}
                  <td>
                    {user.firstName +
                      " " +
                      user.lastName}
                  </td>

                  <td>
                    {formatDate(
                      user.dateOfBirth
                    )}
                  </td>

                  <td>{user.gender || "N/A"}</td>

                  <td>{user.phone || "N/A"}</td>

                  <td>{user.email}</td>

                  <td>
                    <span
                      className={`${styles.status} ${getStatusClass(
                        user.status
                      )}`}
                    >
                      {user.status || "Unknown"}
                    </span>
                  </td>

                  <td>
                    <div
                      className={
                        styles.actionIcons
                      }
                    >
                      <button
                        onClick={() =>
                          openModal(
                            user,
                            "view"
                          )
                        }
                      >
                        <FiEye />
                      </button>

                      <button
                        onClick={() =>
                          openModal(
                            user,
                            "edit"
                          )
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
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