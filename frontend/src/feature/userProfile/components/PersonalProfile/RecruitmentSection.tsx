import React, { useEffect, useState } from "react";
import styles from "./PersonalProfile.module.css";

interface Props {
  user: any;
  onSave: (data: any) => Promise<void>;
}

export default function RecruitmentSection({ user, onSave }: Props) {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", gender: "", phone: "", email: "",
    taxCode: "", citizenId: "", bankAccountName: "", socialLink: "",
    dob: { year: "", month: "", day: "" }
  });

  useEffect(() => {
    if (!user) return;
    const [y, m, d] = user.dateOfBirth?.split("-") || ["", "", ""];
    setFormData({
      firstName: user.firstName || "", lastName: user.lastName || "",
      email: user.email || "", phone: user.phone || "", gender: user.gender || "",
      taxCode: user.taxCode || "", citizenId: user.citizenId || "",
      bankAccountName: user.bankAccountName || "", socialLink: user.socialLink || "",
      dob: { year: y, month: m, day: d }
    });
  }, [user]);

  const handleSave = async () => {
    if (!edit) { setEdit(true); return; }
    await onSave({
      ...formData,
      dateOfBirth: `${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`
    });
    setEdit(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>RECRUITMENT INFORMATION</h2>
      <div className={styles.gridTwo}>
        {/* CỘT TRÁI: Personal */}
        <div className={styles.column}>
          <div className={styles.rowTwo}>
            <div className={styles.formGroup}><label>First Name</label><input value={formData.firstName} readOnly /></div>
            <div className={styles.formGroup}><label>Last Name</label><input value={formData.lastName} readOnly /></div>
          </div>
          <div className={styles.rowTwo}>
            <div className={styles.formGroup}>
              <label>Gender</label>
              <select disabled={!edit} value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                <option value="">Select</option><option value="male">Male</option><option value="female">Female</option>
              </select>
            </div>
            <div className={styles.formGroup}><label>Phone</label><input disabled={!edit} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
          </div>
          <div className={styles.formGroup}><label>Email</label><input value={formData.email} readOnly /></div>

          <div className={styles.formGroup}>
            <label>Date of Birth</label>
            <div className={styles.dob}>
              <select disabled={!edit} value={formData.dob.day} onChange={(e) => setFormData({...formData, dob: {...formData.dob, day: e.target.value}})}>
                <option value="">Day</option>
                {Array.from({length: 31}, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select disabled={!edit} value={formData.dob.month} onChange={(e) => setFormData({...formData, dob: {...formData.dob, month: e.target.value}})}>
                <option value="">Month</option>
                {Array.from({length: 12}, (_, i) => i + 1).map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select disabled={!edit} value={formData.dob.year} onChange={(e) => setFormData({...formData, dob: {...formData.dob, year: e.target.value}})}>
                <option value="">Year</option>
                {Array.from({length: 70}, (_, i) => 1960 + i).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: Recruitment */}
        <div className={styles.column}>
          <div className={styles.formGroup}><label>Tax Code</label><input disabled={!edit} value={formData.taxCode} onChange={(e) => setFormData({...formData, taxCode: e.target.value})} /></div>
          <div className={styles.formGroup}><label>Citizen ID</label><input disabled={!edit} value={formData.citizenId} onChange={(e) => setFormData({...formData, citizenId: e.target.value})} /></div>
          <div className={styles.formGroup}><label>Bank Account</label><input disabled={!edit} value={formData.bankAccountName} onChange={(e) => setFormData({...formData, bankAccountName: e.target.value})} /></div>
          <div className={styles.formGroup}><label>Social Link</label><input disabled={!edit} value={formData.socialLink} onChange={(e) => setFormData({...formData, socialLink: e.target.value})} /></div>
        </div>
      </div>
      <div className={styles.headerActions}>
        <button onClick={handleSave} className={styles.actionBtn}>{edit ? "Save Recruitment" : "Edit Recruitment"}</button>
      </div>
    </div>
  );
}