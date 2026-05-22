import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import styles from "./PersonalProfile.module.css";

interface PersonalSectionProps {
  user: any;
  onSave: (updatedData: any) => Promise<void>;
  onAvatarSave: (file: File) => Promise<void>;
}

export default function PersonalSection({
  user,
  onSave,
  onAvatarSave,
}: PersonalSectionProps) {
  const [editPersonal, setEditPersonal] = useState(false);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [dob, setDob] = useState({
    year: "",
    month: "",
    day: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // =========================
  // SYNC USER (FIX BACKEND SHAPE)
  // =========================
  useEffect(() => {
    if (!user) return;

    setAddress(user.address || "");
    setPhone(user.phone || "");
    setGender(user.gender || "");

    const parts = user.dateOfBirth?.split("-") || ["", "", ""];
    setDob({
      year: parts[0] || "",
      month: parts[1] || "",
      day: parts[2] || "",
    });
  }, [user]);

  const genders = ["male", "female", "other"];

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const years = Array.from({ length: 50 }, (_, i) =>
    String(2026 - i)
  );

  // FIX backend: firstName / lastName
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  // =========================
  // AVATAR
  // =========================
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));
    onAvatarSave(file);
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    if (!editPersonal) {
      setEditPersonal(true);
      return;
    }

    const formattedDob =
      dob.year && dob.month && dob.day
        ? `${dob.year}-${dob.month}-${dob.day}`
        : "";

    await onSave({
      address,
      phone,
      gender,
      dateOfBirth: formattedDob,
    });

    setEditPersonal(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>PERSONAL PROFILE</h2>

      {/* TOP */}
      <div className={styles.gridTwo}>
        <div className={styles.avatarBox}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            className={styles.avatarInput}
          />

          <div
            className={styles.avatarCircle}
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={
                avatarPreview ||
                user?.avatarUrl ||
                "/default-avatar.png"
              }
              className={styles.avatarImage}
            />
          </div>

          <p className={styles.changeAvatarText}>
            Change Avatar
          </p>
        </div>

        <div className={styles.formBox}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input value={user?.email || ""} readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly={!editPersonal}
            />
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className={styles.gridTwo}>
        <div className={styles.column}>
          <div className={styles.rowTwo}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input value={firstName} readOnly />
            </div>

            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input value={lastName} readOnly />
            </div>
          </div>

          <div className={styles.rowTwo}>
            <div className={styles.formGroup}>
              <label>Gender</label>

              {editPersonal ? (
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              ) : (
                <input value={gender} readOnly />
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly={!editPersonal}
              />
            </div>
          </div>

          {/* DOB */}
          <div className={styles.formGroup}>
            <label>Date of Birth</label>

            <div className={styles.dob}>
              <select
                disabled={!editPersonal}
                value={dob.day}
                onChange={(e) =>
                  setDob({ ...dob, day: e.target.value })
                }
              >
                <option>Day</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                disabled={!editPersonal}
                value={dob.month}
                onChange={(e) =>
                  setDob({ ...dob, month: e.target.value })
                }
              >
                <option>Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                disabled={!editPersonal}
                value={dob.year}
                onChange={(e) =>
                  setDob({ ...dob, year: e.target.value })
                }
              >
                <option>Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.headerActions}>
      <button onClick={handleSave}> {editPersonal ?
          "Save Personal" : "Edit Personal"}
      </button> </div>
    </div>
  );
}