import React, { useEffect, useState } from "react";

import styles from "./PersonalProfile.module.css";

interface Props {
  user: any;
  onSave: (data: any) => Promise<void>;
}

export default function RecruitmentSection({
  user,
  onSave,
}: Props) {
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    taxCode: "",
    citizenId: "",
    bankAccountName: "",
    socialLink: "",
    dob: {
      year: "",
      month: "",
      day: "",
    },
  });

  // =========================
  // SYNC USER
  // =========================
  useEffect(() => {
    if (!user) return;

    const [y, m, d] =
      user.dateOfBirth?.split("-") || [
        "",
        "",
        "",
      ];

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      gender: user.gender || "",
      address: user.address || "",
      taxCode: user.taxCode || "",
      citizenId: user.citizenId || "",
      bankAccountName:
        user.bankAccountName || "",
      socialLink: user.socialLink || "",

      dob: {
        year: y || "",
        month: m || "",
        day: d || "",
      },
    });
  }, [user]);

  // =========================
  // OPTIONS
  // =========================
  const days = Array.from(
    { length: 31 },
    (_, i) =>
      String(i + 1).padStart(2, "0")
  );

  const months = Array.from(
    { length: 12 },
    (_, i) =>
      String(i + 1).padStart(2, "0")
  );

  const years = Array.from(
    { length: 70 },
    (_, i) =>
      String(new Date().getFullYear() - i)
  );

  // =========================
  // HELPERS
  // =========================
  const updateField = (
    key: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateDob = (
    key: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      dob: {
        ...prev.dob,
        [key]: value,
      },
    }));
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    if (!edit) {
      setEdit(true);
      return;
    }

    try {
      setSaving(true);

      const formattedDob =
        formData.dob.year &&
        formData.dob.month &&
        formData.dob.day
          ? `${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`
          : null;

      // backend DTO only
      await onSave({
        gender: formData.gender,
        phone: formData.phone,
        taxCode: formData.taxCode,
        citizenId: formData.citizenId,
        bankAccountName: formData.bankAccountName,
        socialLink: formData.socialLink,
        dateOfBirth: formattedDob,
        address: formData.address,
      });

      setEdit(false);
    } catch (error) {
      console.error(
        "Failed to update recruitment info:",
        error
      );
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }



  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>
        RECRUITMENT INFORMATION
      </h2>

      <div className={styles.gridTwo}>
        {/* LEFT */}
        <div className={styles.column}>
          <div className={styles.rowTwo}>
            <div className={styles.formGroup}>
              <label>First Name</label>

              <input
                value={formData.firstName}
                readOnly
              />
            </div>

            <div className={styles.formGroup}>
              <label>Last Name</label>

              <input
                value={formData.lastName}
                readOnly
              />
            </div>
          </div>

          <div className={styles.rowTwo}>
            <div className={styles.formGroup}>
              <label>Gender</label>

              <select
                disabled={!edit}
                value={formData.gender}
                onChange={(e) =>
                  updateField(
                    "gender",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select gender
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Phone</label>

              <input
                disabled={!edit}
                value={formData.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>

            <input
              value={formData.email}
              readOnly
            />
          </div>

          {/* DOB */}
          <div className={styles.formGroup}>
            <label>Date of Birth</label>

            <div className={styles.dob}>
              <select
                disabled={!edit}
                value={formData.dob.day}
                onChange={(e) =>
                  updateDob(
                    "day",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Day
                </option>

                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                disabled={!edit}
                value={formData.dob.month}
                onChange={(e) =>
                  updateDob(
                    "month",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Month
                </option>

                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                disabled={!edit}
                value={formData.dob.year}
                onChange={(e) =>
                  updateDob(
                    "year",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Year
                </option>

                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>

            <input
              disabled={!edit}
              value={formData.address}
              onChange={(e) =>
                updateField("address", e.target.value)
              }
            />
          </div>

        </div>

        {/* RIGHT */}
        <div className={styles.column}>
          <div className={styles.formGroup}>
            <label>Tax Code</label>

            <input
              disabled={!edit}
              value={formData.taxCode}
              onChange={(e) =>
                updateField(
                  "taxCode",
                  e.target.value
                )
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label>Citizen ID</label>

            <input
              disabled={!edit}
              value={formData.citizenId}
              onChange={(e) =>
                updateField(
                  "citizenId",
                  e.target.value
                )
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label>Bank Account</label>

            <input
              disabled={!edit}
              value={
                formData.bankAccountName
              }
              onChange={(e) =>
                updateField(
                  "bankAccountName",
                  e.target.value
                )
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label>LinkedIn / Portfolio / GitHub</label>

            <input
              disabled={!edit}
              value={formData.socialLink}
              onChange={(e) =>
                updateField(
                  "socialLink",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.headerActions}>
        <button
          onClick={handleSave}
          className={styles.actionBtn}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : edit
            ? "Save Recruitment"
            : "Edit Recruitment"}
        </button>
      </div>
    </div>
  );
}