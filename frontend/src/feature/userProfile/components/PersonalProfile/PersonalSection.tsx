import React, {
  useEffect,
  useState,
  ChangeEvent,
  useRef,
} from "react";

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
  const [saving, setSaving] = useState(false);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const [avatarUploading, setAvatarUploading] =
    useState(false);

  const [avatarMessage, setAvatarMessage] =
    useState("");

  const [avatarPreview, setAvatarPreview] =
    useState<string | null>(null);

  const [dob, setDob] = useState({
    year: "",
    month: "",
    day: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // =========================
  // SYNC USER
  // =========================
  useEffect(() => {
    if (!user) return;

    setAddress(user.address || "");
    setPhone(user.phone || "");
    setGender(user.gender || "");

    const parts = user.dateOfBirth?.split("-") || [
      "",
      "",
      "",
    ];

    setDob({
      year: parts[0] || "",
      month: parts[1] || "",
      day: parts[2] || "",
    });
  }, [user]);

  // cleanup avatar preview
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const genders = ["male", "female", "other"];

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  const years = Array.from({ length: 50 }, (_, i) =>
    String(new Date().getFullYear() - i)
  );

  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  // =========================
  // AVATAR
  // =========================
  const handleAvatarChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);

    try {
      setAvatarUploading(true);

      setAvatarMessage("Uploading avatar...");

      await onAvatarSave(file);

      // clear preview để dùng avatar từ backend
      setAvatarPreview(null);

      setAvatarMessage(
        "Avatar uploaded successfully!"
      );
    } catch (error) {
      console.error(
        "Upload avatar failed:",
        error
      );

      setAvatarMessage(
        "Upload avatar failed!"
      );
    } finally {
      setAvatarUploading(false);

      setTimeout(() => {
        setAvatarMessage("");
      }, 3000);
    }
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    if (!editPersonal) {
      setEditPersonal(true);
      return;
    }

    try {
      setSaving(true);

      const formattedDob =
        dob.year && dob.month && dob.day
          ? `${dob.year}-${dob.month}-${dob.day}`
          : null;

      await onSave({
        address,
        phone,
        gender,
        dateOfBirth: formattedDob,
      });

      setEditPersonal(false);
    } catch (error) {
      console.error("Update profile failed:", error);
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
        PERSONAL PROFILE
      </h2>

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
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            <img
              src={
                avatarPreview ||
                (user?.avatarUrl
                  ? `${user.avatarUrl}?t=${Date.now()}`
                  : "/default-avatar.png")
              }
              alt="avatar"
              className={styles.avatarImage}
            />
          </div>

          <p className={styles.changeAvatarText}
             onClick={() =>
             fileInputRef.current?.click()
           }>
            Change Avatar
          </p>
          {avatarMessage && (
            <p className={styles.uploadMessage}>
              {avatarMessage}
            </p>
          )}
        </div>

        <div className={styles.formBox}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              value={user?.email || ""}
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>

            <input
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
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

              <input
                value={firstName}
                readOnly
              />
            </div>

            <div className={styles.formGroup}>
              <label>Last Name</label>

              <input
                value={lastName}
                readOnly
              />
            </div>
          </div>

          <div className={styles.rowTwo}>
            <div className={styles.formGroup}>
              <label>Gender</label>

              {editPersonal ? (
                <select
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                >
                  <option value="">
                    Select gender
                  </option>

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
                onChange={(e) =>
                  setPhone(e.target.value)
                }
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
                  setDob({
                    ...dob,
                    day: e.target.value,
                  })
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
                disabled={!editPersonal}
                value={dob.month}
                onChange={(e) =>
                  setDob({
                    ...dob,
                    month: e.target.value,
                  })
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
                disabled={!editPersonal}
                value={dob.year}
                onChange={(e) =>
                  setDob({
                    ...dob,
                    year: e.target.value,
                  })
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
        </div>
      </div>

      <div className={styles.headerActions}>
        <button
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : editPersonal
            ? "Save Personal"
            : "Edit Personal"}
        </button>
      </div>
    </div>
  );
}