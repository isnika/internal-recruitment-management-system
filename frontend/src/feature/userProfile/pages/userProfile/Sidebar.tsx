import { NavLink } from "react-router-dom";
import styles from "./Profile.Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>My Account</h3>

      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navActive : ""}`
            }
          >
            Personal Profile
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile/cv"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navActive : ""}`
            }
          >
            Manage CV
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile/saved"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navActive : ""}`
            }
          >
            Saved Jobs
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile/applied"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navActive : ""}`
            }
          >
            Applied Jobs
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile/settings"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navActive : ""}`
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}