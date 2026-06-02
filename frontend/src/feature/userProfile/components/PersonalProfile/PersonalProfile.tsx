import React, { useEffect, useState } from "react";

import {
  getMyCandidateProfile,
  updateCandidateProfile,
  updateCandidateAvatar,
} from "../../../../service/userApi";

import PersonalSection from "./PersonalSection";
import RecruitmentSection from "./RecruitmentSection";

import styles from "./PersonalProfile.module.css";

export default function PersonalProfile() {
  // ✅ PROFILE STATE (tách riêng auth)
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PROFILE
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const res = await getMyCandidateProfile();

        console.log("PROFILE:", res);

        setProfile(res); // ✅ đúng
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleUpdateProfile = async (updatedData: any) => {
    try {
      const updated = await updateCandidateProfile(updatedData);

      setProfile(updated); //  update UI luôn
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // =========================
  // UPDATE AVATAR
  // =========================
  const handleUpdateAvatar = async (file: File) => {
    try {
      await updateCandidateAvatar(file);

      const res = await getMyCandidateProfile();

      setProfile(res); //  refresh profile
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className={styles.loadingState}>
        Loading profile data...
      </div>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!profile) {
    return (
      <div className={styles.loadingState}>
        No profile found.
      </div>
    );
  }

  console.log("PROFILE USER:", profile);

  // =========================
  // UI
  // =========================
  return (
    <div className={styles.container}>
      <main className={styles.profileWrapper}>
        <PersonalSection
          user={profile}
          onSave={handleUpdateProfile}
          onAvatarSave={handleUpdateAvatar}
        />

        <hr className={styles.sectionDivider} />

        <RecruitmentSection
          user={profile}
          onSave={handleUpdateProfile}
        />
      </main>
    </div>
  );
}