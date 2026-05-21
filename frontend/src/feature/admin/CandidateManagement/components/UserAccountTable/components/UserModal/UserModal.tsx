import { useEffect, useState } from "react";
import styles from "./UserModal.module.css";
import { FiX } from "react-icons/fi";

import type { User } from "../../../../../types/user";

interface UserModalProps {
  user: User;
  onClose: () => void;
}

export default function UserModal({
  user,
  onClose,
}: UserModalProps) {
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] =
    useState<User>(user);

  // IMPORTANT: sync when user changes
  useEffect(() => {
    setFormData(user);
    setIsEdit(false);
  }, [user]);

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SAVE
  const handleSave = () => {
    console.log("Updated user:", formData);

    // TODO: call API update here

    setIsEdit(false);
  };

  // CANCEL
  const handleCancel = () => {
    setFormData(user);
    setIsEdit(false);
  };

  const isActive =
    user.status?.toLowerCase() ===
    "active";

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <h2>User Information</h2>

          <button
            className={styles.closeBtn}
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        {/* BODY */}
        <div className={styles.modalBody}>
          <div className={styles.infoRow}>
            <span>ID:</span>
            <p>{formData.id}</p>
          </div>

          <div className={styles.infoRow}>
            <span>Full Name:</span>

            {isEdit ? (
              <input
                name="fullName"
                value={
                  formData.fullName || ""
                }
                onChange={handleChange}
              />
            ) : (
              <p>{formData.fullName}</p>
            )}
          </div>

          <div className={styles.infoRow}>
            <span>Date of Birth:</span>

            {isEdit ? (
              <input
                name="dob"
                value={formData.dob || ""}
                onChange={handleChange}
              />
            ) : (
              <p>{formData.dob}</p>
            )}
          </div>

          <div className={styles.infoRow}>
            <span>Gender:</span>

            {isEdit ? (
              <input
                name="gender"
                value={
                  formData.gender || ""
                }
                onChange={handleChange}
              />
            ) : (
              <p>{formData.gender}</p>
            )}
          </div>

          <div className={styles.infoRow}>
            <span>Phone:</span>

            {isEdit ? (
              <input
                name="phone"
                value={
                  formData.phone || ""
                }
                onChange={handleChange}
              />
            ) : (
              <p>{formData.phone}</p>
            )}
          </div>

          <div className={styles.infoRow}>
            <span>Email:</span>

            {isEdit ? (
              <input
                name="email"
                value={
                  formData.email || ""
                }
                onChange={handleChange}
              />
            ) : (
              <p>{formData.email}</p>
            )}
          </div>

          <div className={styles.infoRow}>
            <span>Address:</span>

            {isEdit ? (
              <input
                name="address"
                value={
                  formData.address || ""
                }
                onChange={handleChange}
              />
            ) : (
              <p>{formData.address}</p>
            )}
          </div>

          <div className={styles.infoRow}>
            <span>Status:</span>

            <p
              className={
                isActive
                  ? styles.activeStatus
                  : styles.inactiveStatus
              }
            >
              {formData.status}
            </p>
          </div>

          <h2 className={styles.sectionTitle}>
            RECRUITMENT INFORMATION
          </h2>

          <div className={styles.grid}>

            {/* LEFT COLUMN */}
            <div className={styles.column}>

              {/* FULL NAME */}
              <div className={styles.formGroup}>
                <label>Full Name</label>

                {isEdit ? (
                  <input
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    value={formData.fullName || ""}
                    readOnly
                  />
                )}
              </div>

              {/* EMAIL */}
              <div className={styles.formGroup}>
                <label>Email</label>

                {isEdit ? (
                  <input
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    value={formData.email || ""}
                    readOnly
                  />
                )}
              </div>

              {/* PHONE */}
              <div className={styles.formGroup}>
                <label>Phone</label>

                {isEdit ? (
                  <input
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    value={formData.phone || ""}
                    readOnly
                  />
                )}
              </div>

              {/* ADDRESS */}
              <div className={styles.formGroup}>
                <label>Address</label>

                {isEdit ? (
                  <input
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    value={formData.address || ""}
                    readOnly
                  />
                )}
              </div>

              {/* DATE OF BIRTH */}
              <div className={styles.formGroup}>
                <label>Date of Birth</label>

                {isEdit ? (
                  <input
                    name="dob"
                    value={formData.dob || ""}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                  />
                ) : (
                  <input
                    value={formData.dob || ""}
                    readOnly
                  />
                )}
              </div>

              {/* GENDER */}
              <div className={styles.formGroup}>
                <label>Gender</label>

                {isEdit ? (
                  <input
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    value={formData.gender || ""}
                    readOnly
                  />
                )}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className={styles.column}>

              {/* TAX ID */}
              <div className={styles.formGroup}>
                <label>Tax ID</label>

                {isEdit ? (
                  <input
                    name="taxId"
                    value={formData.recruitment?.taxId || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recruitment: {
                          ...prev.recruitment,
                          taxId: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  <input
                    value={formData.recruitment?.taxId || ""}
                    readOnly
                  />
                )}
              </div>

              {/* CITIZEN ID */}
              <div className={styles.formGroup}>
                <label>Citizen ID</label>

                {isEdit ? (
                  <input
                    name="citizenId"
                    value={formData.recruitment?.citizenId || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recruitment: {
                          ...prev.recruitment,
                          citizenId: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  <input
                    value={formData.recruitment?.citizenId || ""}
                    readOnly
                  />
                )}
              </div>

              {/* BANK */}
              <div className={styles.formGroup}>
                <label>Bank Account</label>

                {isEdit ? (
                  <input
                    name="bank"
                    value={formData.recruitment?.bank || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recruitment: {
                          ...prev.recruitment,
                          bank: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  <input
                    value={formData.recruitment?.bank || ""}
                    readOnly
                  />
                )}
              </div>

              {/* SOCIAL */}
              <div className={styles.formGroup}>
                <label>Social Network</label>

                {isEdit ? (
                  <input
                    name="social"
                    value={formData.recruitment?.social || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recruitment: {
                          ...prev.recruitment,
                          social: e.target.value,
                        },
                      }))
                    }
                  />
                ) : (
                  <input
                    value={formData.recruitment?.social || ""}
                    readOnly
                  />
                )}
              </div>

              {/* RELEASE DATE */}
              <div className={styles.formGroup}>
                <label>Release Date</label>

                {isEdit ? (
                  <input
                    name="releaseDate"
                    value={formData.recruitment?.releaseDate || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recruitment: {
                          ...prev.recruitment,
                          releaseDate: e.target.value,
                        },
                      }))
                    }
                    placeholder="YYYY-MM-DD"
                  />
                ) : (
                  <input
                    value={formData.recruitment?.releaseDate || ""}
                    readOnly
                  />
                )}
              </div>
            </div>
          </div>

          {/* ACTION BAR */}
          <div className={styles.actionBar}>
            {!isEdit ? (
              <>
                <button
                  className={styles.editBtn}
                  onClick={() =>
                    setIsEdit(true)
                  }
                >
                  Chỉnh sửa
                </button>

                <button
                  className={styles.deleteBtn}
                >
                  Xóa
                </button>

                <button
                  className={styles.exportBtn}
                >
                  Xuất dữ liệu
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.saveBtn}
                  onClick={handleSave}
                >
                  Lưu
                </button>

                <button
                  className={styles.cancelBtn}
                  onClick={handleCancel}
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}