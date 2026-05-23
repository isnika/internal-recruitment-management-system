import React, { useEffect } from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import { getMyProfile, updateProfile, uploadAvatar } from "../../../../service/candidateApi";
import PersonalSection from "./PersonalSection";
import RecruitmentSection from "./RecruitmentSection";
import styles from "./PersonalProfile.module.css";

export default function PersonalProfile() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setUser(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, [setUser]);

  if (!user) {
    return <div className={styles.loadingState}>Loading profile data...</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.profileWrapper}>
        <PersonalSection
          user={user}
          onSave={updateProfile}
          onAvatarSave={uploadAvatar}
        />

        <hr className={styles.sectionDivider} />

        <RecruitmentSection
          user={user}
          onSave={updateProfile}
        />
      </main>
    </div>
  );
}