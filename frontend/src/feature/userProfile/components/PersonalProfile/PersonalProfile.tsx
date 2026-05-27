import React, { useEffect, useState } from "react";

import { useAuth } from "../../../auth/context/AuthContext";

import {
  getMyCandidateProfile,
  updateCandidateProfile,
  updateCandidateAvatar,
} from "../../../../service/userApi";

import PersonalSection from "./PersonalSection";
import RecruitmentSection from "./RecruitmentSection";

import styles from "./PersonalProfile.module.css";

export default function PersonalProfile() {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PROFILE
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const profile =
          await getMyCandidateProfile();

        console.log(
          "PROFILE:",
          profile
        );

        setUser(profile);
      } catch (err) {
        console.error(
          "Failed to load profile:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  const handleUpdateProfile = async (
    updatedData: any
  ) => {
    try {
      const updatedUser =
        await updateCandidateProfile(
          updatedData
        );

      setUser(updatedUser);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleUpdateAvatar = async (file: File) => {
    await updateCandidateAvatar(file);

    const profile = await getMyCandidateProfile();

    setUser(profile);
  };

  if (loading) {
    return (
      <div className={styles.loadingState}>
        Loading profile data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.loadingState}>
        No profile found.
      </div>
    );
  }

console.log("PROFILE USER:", user);
  return (
    <div className={styles.container}>
      <main className={styles.profileWrapper}>
        <PersonalSection
          user={user}
          onSave={handleUpdateProfile}
          onAvatarSave={handleUpdateAvatar}
        />

        <hr className={styles.sectionDivider} />

        <RecruitmentSection
          user={user}
          onSave={handleUpdateProfile}
        />
      </main>
    </div>
  );
}