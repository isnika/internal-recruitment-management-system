import { NavLink } from "react-router-dom";
import styles from "./Profile.Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>My Account</h3>

      <ul>
        <li>
          <NavLink to="/profile" end>
            Personal Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile/cv">Manage CV</NavLink>
        </li>

        <li>
          <NavLink to="/profile/saved">Saved Jobs</NavLink>
        </li>

        <li>
          <NavLink to="/profile/applied">Applied Jobs</NavLink>
        </li>

        <li>
          <NavLink to="/profile/settings">Settings</NavLink>
        </li>
      </ul>
    </div>
  );
}
