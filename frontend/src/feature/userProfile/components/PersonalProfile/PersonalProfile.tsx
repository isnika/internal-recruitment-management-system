import React from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import styles from "./PersonalProfile.module.css";
import { updateProfile } from "../../../../service/userApi";
import PersonalSection from "./PersonalSection";
import RecruitmentSection from "./RecruitmentSection";

export default function PersonalProfile(): React.ReactElement {
  const { user, setUser } = useAuth();

  if (!user) return <div className={styles.loading}>Loading...</div>;

  // Hàm cập nhật dữ liệu chung cho cả 2 section con
  const handleUpdateProfile = async (payload: any) => {
    try {
      const updatedUser = await updateProfile(payload);
      setUser({ ...updatedUser });
    } catch (err) {
      console.error("Cập nhật hồ sơ thất bại:", err);
    }
  };

  return (
    <div className={styles.container}>
      {/* KHỐI 1: THÔNG TIN CÁ NHÂN */}
      <PersonalSection user={user} onSave={handleUpdateProfile} />

      <hr className={styles.sectionDivider} />

      {/* KHỐI 2: THÔNG TIN TUYỂN DỤNG */}
      <RecruitmentSection user={user} onSave={handleUpdateProfile} />
    </div>
  );
}