import { useState, useEffect } from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import styles from "./PersonalProfile.module.css";
import { updateProfile } from "../../../../service/userApi";

export default function PersonalProfile() {
  const { user,setUser } = useAuth();
  const [editPersonal, setEditPersonal] = useState(false);
  const [editRecruitment, setEditRecruitment] = useState(false);

  const [gender, setGender] = useState("");

  const [releaseDate, setReleaseDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const genders = ["male", "female", "other"];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 50 }, (_, i) => 2026 - i)


  const dobParts = user?.dob ? user.dob.split("-") : ["", "", ""];

  const [dob, setDob] = useState({
    year: dobParts[0],
    month: dobParts[1],
    day: dobParts[2],
  });

    const [taxId, setTaxId] = useState(user.recruitment?.taxId || "");
    const [citizenId, setCitizenId] = useState(user.recruitment?.citizenId || "");
    const [bank, setBank] = useState(user.recruitment?.bank || "");
    const [social, setSocial] = useState(user.recruitment?.social || "");

    useEffect(() => {
      setTaxId(user.recruitment?.taxId || "");
      setCitizenId(user.recruitment?.citizenId || "");
      setBank(user.recruitment?.bank || "");
      setSocial(user.recruitment?.social || "");
    }, [user]);

    useEffect(() => {
      const rd = user.recruitment?.releaseDate?.split("-") || ["", "", ""];

      setReleaseDate({
        year: rd[0] || "",
        month: rd[1] || "",
        day: rd[2] || "",
      });
    }, [user]);


    if (!user) return <div>Loading...</div>;

    const nameParts = user.fullName?.split(" ") || [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ");

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>PERSONAL PROFILE</h2>

      {/* TOP */}
      <div className={styles.gridTwo}>
        <div className={styles.avatarBox}>
          <div className={styles.avatarCircle}></div>
        </div>

        <div className={styles.formBox}>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input value={user.email} readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input
              value={user.address || ""}
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
                <select
                  value={gender || user.gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              ) : (
                <input value={user.gender} readOnly />
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                value={user.phone || ""}
                readOnly={!editPersonal}
              />
            </div>

          </div>

          <div className={styles.formGroup}>
            <label>Date of Birth</label>

            <div className={styles.dob}>
              <select
                value={dob.day}
                disabled={!editPersonal && !editRecruitment}
                onChange={(e) => setDob({ ...dob, day: e.target.value })}
              >
                <option>Day</option>
                {days.map((d) => (
                  <option key={d} value={String(d).padStart(2, "0")}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={dob.month}
                disabled={!editPersonal && !editRecruitment}
                onChange={(e) => setDob({ ...dob, month: e.target.value })}
              >
                <option>Month</option>
                {months.map((m) => (
                  <option key={m} value={String(m).padStart(2, "0")}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={dob.year}
                disabled={!editPersonal && !editRecruitment}
                onChange={(e) => setDob({ ...dob, year: e.target.value })}
              >
                <option>Year</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.column}></div>
      </div>

      {/* BUTTON PERSONAL */}
      <div className={styles.headerActions}>
        {!editPersonal ? (
          <button onClick={() => setEditPersonal(true)}>
            Edit Personal
          </button>
        ) : (
          <button onClick={() => setEditPersonal(false)}>
            Save Personal
          </button>
        )}
      </div>

      {/* RECRUITMENT */}
      <h2 className={styles.sectionTitle}>RECRUITMENT INFORMATION</h2>

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
                  value={gender || user.gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              ) : (
                <input value={user.gender} readOnly />
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                value={user.phone || ""}
                readOnly={!editPersonal}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Date of Birth</label>

            <div className={styles.dob}>
              <select
                value={dob.day}
                disabled={!editPersonal && !editRecruitment}
                onChange={(e) => setDob({ ...dob, day: e.target.value })}
              >
                <option>Day</option>
                {days.map((d) => (
                  <option key={d} value={String(d).padStart(2, "0")}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={dob.month}
                disabled={!editPersonal && !editRecruitment}
                onChange={(e) => setDob({ ...dob, month: e.target.value })}
              >
                <option>Month</option>
                {months.map((m) => (
                  <option key={m} value={String(m).padStart(2, "0")}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={dob.year}
                disabled={!editPersonal && !editRecruitment}
                onChange={(e) => setDob({ ...dob, year: e.target.value })}
              >
                <option>Year</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
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
              value={
                user.recruitment?.releaseDate
                  ? user.recruitment.releaseDate.split("-").reverse().join("/")
                  : ""
              }
              readOnly
            />
          ) : (
            <div className={styles.dob}>
              {/* DAY */}
              <select
                value={releaseDate.day}
                onChange={(e) =>
                  setReleaseDate({ ...releaseDate, day: e.target.value })
                }
              >
                <option>Day</option>
                {days.map((d) => (
                  <option key={d} value={String(d).padStart(2, "0")}>
                    {d}
                  </option>
                ))}
              </select>

              {/* MONTH */}
              <select
                value={releaseDate.month}
                onChange={(e) =>
                  setReleaseDate({ ...releaseDate, month: e.target.value })
                }
              >
                <option>Month</option>
                {months.map((m) => (
                  <option key={m} value={String(m).padStart(2, "0")}>
                    {m}
                  </option>
                ))}
              </select>

              {/* YEAR */}
              <select
                value={releaseDate.year}
                onChange={(e) =>
                  setReleaseDate({ ...releaseDate, year: e.target.value })
                }
              >
                <option>Year</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
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

      {/* BUTTON RECRUITMENT */}
      <div className={styles.headerActions}>
        {!editRecruitment ? (
          <button onClick={() => setEditRecruitment(true)}>
            Edit Recruitment
          </button>
        ) : (
          <button
            onClick={async () => {
              try {
                const formattedReleaseDate =
                  releaseDate.year && releaseDate.month && releaseDate.day
                    ? `${releaseDate.year}-${releaseDate.month.padStart(2, "0")}-${releaseDate.day.padStart(2, "0")}`
                    : "";

                const updated = await updateProfile({
                  recruitment: {
                    taxId,
                    citizenId,
                    releaseDate: formattedReleaseDate,
                    bank,
                    social,
                  },
                });

                setUser({ ...updated });

                // QUAN TRỌNG: reset state trước khi tắt edit
                setReleaseDate({
                  year: updated.recruitment?.releaseDate?.split("-")[0] || "",
                  month: updated.recruitment?.releaseDate?.split("-")[1] || "",
                  day: updated.recruitment?.releaseDate?.split("-")[2] || "",
                });

              } catch (err) {
                console.error(err);
              } finally {
                // LUÔN CHẠY
                setEditRecruitment(false);
              }
            }}
          >
            Save Recruitment
          </button>
        )}
      </div>
    </div>
  );
}
