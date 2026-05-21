import React, { useState, useEffect, FormEvent } from "react";
import styles from "./PersonalProfile.module.css";

interface RecruitmentSectionProps {
  user: any;
  onSave: (updatedData: any) => Promise<void>;
}

export default function RecruitmentSection({ user, onSave }: RecruitmentSectionProps) {
  const [editRecruitment, setEditRecruitment] = useState(false);

  const [taxId, setTaxId] = useState(user.recruitment?.taxId || "");
  const [citizenId, setCitizenId] = useState(user.recruitment?.citizenId || "");
  const [bank, setBank] = useState(user.recruitment?.bank || "");
  const [social, setSocial] = useState(user.recruitment?.social || "");

  const rdParts = user.recruitment?.releaseDate?.split("-") || ["", "", ""];
  const [releaseDate, setReleaseDate] = useState({
    year: rdParts[0] || "",
    month: rdParts[1] || "",
    day: rdParts[2] || "",
  });

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const years = Array.from({ length: 50 }, (_, i) => String(2026 - i));

  // Đồng bộ lại dữ liệu khi user context thay đổi
  useEffect(() => {
    setTaxId(user.recruitment?.taxId || "");
    setCitizenId(user.recruitment?.citizenId || "");
    setBank(user.recruitment?.bank || "");
    setSocial(user.recruitment?.social || "");

    const rd = user.recruitment?.releaseDate?.split("-") || ["", "", ""];
    setReleaseDate({ year: rd[0] || "", month: rd[1] || "", day: rd[2] || "" });
  }, [user]);

  const nameParts = user.fullName?.split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const handleSave = async () => {
    if (editRecruitment) {
      const formattedReleaseDate = releaseDate.year && releaseDate.month && releaseDate.day
        ? `${releaseDate.year}-${releaseDate.month}-${releaseDate.day}`
        : "";

      await onSave({
        recruitment: {
          taxId,
          citizenId,
          releaseDate: formattedReleaseDate,
          bank,
          social,
        },
      });
    }
    setEditRecruitment(!editRecruitment);
  };

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>RECRUITMENT INFORMATION</h2>

      <div className={styles.gridTwo}>
        {/* Cột trái hiển thị lại dữ liệu Read-only từ trang cá nhân */}
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
              <input value={user.gender || ""} readOnly />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input value={user.phone || ""} readOnly />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Date of Birth</label>
            <input
              value={user.dob ? user.dob.split("-").reverse().join("/") : ""}
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input value={user.email} readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input value={user.address || ""} readOnly />
          </div>
        </div>

        {/* Cột phải xử lý thông tin tuyển dụng (Điền và Lưu) */}
        <div className={styles.column}>
          <div className={styles.formGroup}>
            <label>Personal Tax ID</label>
            <input
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              readOnly={!editRecruitment}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Citizen ID</label>
            <input
              value={citizenId}
              onChange={(e) => setCitizenId(e.target.value)}
              readOnly={!editRecruitment}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Release Date</label>
            {!editRecruitment ? (
              <input
                value={user.recruitment?.releaseDate ? user.recruitment.releaseDate.split("-").reverse().join("/") : ""}
                readOnly
              />
            ) : (
              <div className={styles.dob}>
                <select
                  value={releaseDate.day}
                  onChange={(e) => setReleaseDate({ ...releaseDate, day: e.target.value })}
                >
                  <option value="">Day</option>
                  {days.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>

                <select
                  value={releaseDate.month}
                  onChange={(e) => setReleaseDate({ ...releaseDate, month: e.target.value })}
                >
                  <option value="">Month</option>
                  {months.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>

                <select
                  value={releaseDate.year}
                  onChange={(e) => setReleaseDate({ ...releaseDate, year: e.target.value })}
                >
                  <option value="">Year</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Social Network</label>
            <div className={styles.socialRow}>
              <input
                value={social}
                onChange={(e) => setSocial(e.target.value)}
                readOnly={!editRecruitment}
              />
              <input placeholder="Link" readOnly={!editRecruitment} />
              <span className={styles.add}>Add</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Bank Account</label>
            <div className={styles.socialRow}>
              <input
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                readOnly={!editRecruitment}
              />
              <span className={styles.add}>Add</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.headerActions}>
        <button onClick={handleSave}>
          {editRecruitment ? "Save Recruitment" : "Edit Recruitment"}
        </button>
      </div>
    </div>
  );
}