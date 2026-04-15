import { useEffect, useState } from "react";
import { getCurrentUser, login } from "../../../../service/authApi";
import type { User } from "../../../../dataMock/User";
import styles from "./PersonalProfile.module.css";

export default function PersonalProfile() {
  const [user, setUser] = useState<User | null>(null);

  const [dob, setDob] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [gender, setGender] = useState("");
  const [releaseDate, setReleaseDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 50 }, (_, i) => 2026 - i);
  const genders = ["Male", "Female", "Other"];

  useEffect(() => {
    const current = getCurrentUser();

    if (current) {
      setUser(current);
    } else {
      login("user@gmail.com", "123456")
        .then(setUser)
        .catch(console.error);
    }
  }, []);


  if (!user) return <div>Loading...</div>;

  const firstName = user.fullName.split(" ")[0];
  const lastName = user.fullName.split(" ").slice(1).join(" ");

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>PERSONAL PROFILE</h2>

      {/* top 50 50*/}
      <div className={styles.gridTwo}>
        {/* left avata*/}
        <div className={styles.avatarBox}>
          <div className={styles.avatarCircle}></div>
        </div>

        {/* right form*/}
        <div className={styles.formBox}>
          <div className={styles.formGroup}>
            <label>Address</label>
            <input placeholder="Address" />
          </div>

            <div className={styles.formGroup}>
              <label>Date of Birth</label>
              <div className={styles.dob}>
                <select
                  value={dob.day}
                  onChange={(e) => setDob({ ...dob, day: e.target.value })}
                >
                  <option>Day</option>
                  {days.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>

                <select
                  value={dob.month}
                  onChange={(e) => setDob({ ...dob, month: e.target.value })}
                >
                  <option>Month</option>
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={dob.year}
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
      </div>

      {/* basic info 50 50 */}
      <div className={styles.gridTwo}>
        {/* left */}
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
               <select value={gender} onChange={(e) => setGender(e.target.value)}>
                 <option value="">Select Gender</option>
                 {genders.map((g) => (
                   <option key={g} value={g}>
                     {g}
                   </option>
                 ))}
               </select>
             </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input placeholder ="Phone Number" />
              </div>
          </div>


          <div className={styles.formGroup}>
            <label>Email</label>
            <input value={user.email} readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input value={user.password} readOnly />
          </div>


        </div>

        {/* RIGHT (trống hoặc bổ sung sau) */}
        <div className={styles.column}></div>
      </div>

      <h2 className={styles.sectionTitle}>RECRUITMENT INFORMATION</h2>

      {/* RECRUITMENT 50/50 */}
      <div className={styles.gridTwo}>
        {/* LEFT */}
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
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input placeholder ="Phone Number" />
              </div>
          </div>

          <div className={styles.formGroup}>
            <label>Date of Birth</label>
            <div className={styles.dob}>
              <select
                value={dob.day}
                onChange={(e) => setDob({ ...dob, day: e.target.value })}
              >
                <option>Day</option>
                {days.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <select
                value={dob.month}
                onChange={(e) => setDob({ ...dob, month: e.target.value })}
              >
                <option>Month</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

              <select
                value={dob.year}
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
            <input placeholder="Address" />
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.column}>
          <div className={styles.formGroup}>
            <label>Personal Tax ID</label>
            <input placeholder="Tax Number" />
          </div>

          <div className={styles.formGroup}>
            <label>Citizen ID</label>
            <input placeholder="Citizen ID" />
          </div>

          <div className={styles.formGroup}>
            <label>Release Date</label>
            <div className={styles.dob}>
              <select
                value={releaseDate.day}
                onChange={(e) =>
                  setReleaseDate({ ...releaseDate, day: e.target.value })
                }
              >
                <option>Day</option>
                {days.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <select
                value={releaseDate.month}
                onChange={(e) =>
                  setReleaseDate({ ...releaseDate, month: e.target.value })
                }
              >
                <option>Month</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

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
          </div>

          <div className={styles.formGroup}>
            <label>Social Network</label>
            <div className={styles.socialRow}>
              <input placeholder="Name" />
              <input placeholder="Link" />
              <span className={styles.add}>Add</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Bank Account</label>
            <div className={styles.socialRow}>
              <input placeholder="Bank Account Name" />
              <span className={styles.add}>Add</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}