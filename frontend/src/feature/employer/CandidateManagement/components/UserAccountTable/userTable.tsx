import styles from "./userTable.module.css";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";

import type { User } from "../../../../../types/user";

import { getAllUsers } from "../../../../../service/userApi";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // lấy tất cả users
        const allUsers = await getAllUsers();

        // filter candidate
        const candidateUsers = allUsers.filter(
          (user) => user.role === "candidate"
        );

        setUsers(candidateUsers);

      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
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
            <th>Full name</th>
            <th>Birth of date</th>
            <th>Gender</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              {/* Checkbox */}
              <td>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                />
              </td>

              {/* STT */}
              <td>{index + 1}</td>

              {/* ID */}
              <td>{user.id}</td>

              {/* Full Name */}
              <td>{user.fullName}</td>

              {/* DOB */}
              <td>{user.dob}</td>

              {/* Gender */}
              <td>{user.gender}</td>

              {/* Phone */}
              <td>{user.phone}</td>

              {/* Email */}
              <td>{user.email}</td>

              {/* Status */}
              <td>
                <span className={styles.statusPosted}>
                  Active
                </span>
              </td>

              {/* Actions */}
              <td>
                <div className={styles.actionIcons}>
                  <FiEye className={styles.icon} />
                  <FiEdit2 className={styles.icon} />
                  <FiTrash2 className={styles.icon} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}