import React, { useState, ChangeEvent, useRef } from "react";
import styles from "./PersonalProfile.module.css";

interface PersonalSectionProps {
  user: any;
  onSave: (updatedData: any) => Promise<void>;
  onAvatarSave: (file: File) => Promise<void>; // Prop mới để lưu ảnh đại diện
}

export default function PersonalSection({ user, onSave, onAvatarSave }: PersonalSectionProps) {
  const [editPersonal, setEditPersonal] = useState(false);
  const [address, setAddress] = useState(user.address || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [gender, setGender] = useState(user.gender || "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // State cho ảnh preview
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref tới input file bị ẩn

  const dobParts = user?.dob ? user.dob.split("-") : ["", "", ""];
  const [dob, setDob] = useState({
    year: dobParts[0] || "",
    month: dobParts[1] || "",
    day: dobParts[2] || "",
  });

  const genders = ["male", "female", "other"];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const years = Array.from({ length: 50 }, (_, i) => String(2026 - i));

  const nameParts = user.fullName?.split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  // Xử lý khi chọn ảnh đại diện mới
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file)); // Tạo link preview ảnh

      // Gọi hàm onAvatarSave được truyền từ component cha
      if (onAvatarSave) {
        onAvatarSave(file);
      }
    }
  };

  const handleSave = async () => {
    if (editPersonal) {
      const formattedDob = dob.year && dob.month && dob.day
        ? `${dob.year}-${dob.month}-${dob.day}`
        : "";

      await onSave({
        address,
        phone,
        gender,
        dob: formattedDob,
      });
    }
    setEditPersonal(!editPersonal);
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>PERSONAL PROFILE</h2>

      {/* TOP */}
      <div className={styles.gridTwo}>
        <div className={styles.avatarBox}>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            ref={fileInputRef}
            className={styles.avatarInput} // Ẩn input đi
          />
          <div className={styles.avatarCircle} onClick={() => fileInputRef.current?.click()}>
            <img
              src={avatarPreview || user.avatarUrl || "/path-to-default-avatar.png"}
              alt="User Avatar"
              className={styles.avatarImage}
            />
          </div>
          <p className={styles.changeAvatarText}>Change Avatar</p>
        </div>
        <div className={styles.formBox}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input value={user.email} readOnly />
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

      {/* PERSONAL INFO */}
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
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              ) : (
                <input value={user.gender || ""} readOnly />
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly={!editPersonal}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Date of Birth</label>
            <div className={styles.dob}>
              <select
                value={dob.day}
                disabled={!editPersonal}
                onChange={(e) => setDob({ ...dob, day: e.target.value })}
              >
                <option value="">Day</option>
                {days.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>

              <select
                value={dob.month}
                disabled={!editPersonal}
                onChange={(e) => setDob({ ...dob, month: e.target.value })}
              >
                <option value="">Month</option>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>

              <select
                value={dob.year}
                disabled={!editPersonal}
                onChange={(e) => setDob({ ...dob, year: e.target.value })}
              >
                <option value="">Year</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.column}></div>
      </div>

      <div className={styles.headerActions}>
        <button onClick={handleSave}>
          {editPersonal ? "Save Personal" : "Edit Personal"}
        </button>
      </div>
    </div>
  );
}