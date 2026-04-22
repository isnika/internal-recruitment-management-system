import { NavLink } from "react-router-dom";
import styles from "./ManagementProfile.Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>My Account</h3>

      <ul>
        <li>
          <NavLink to="managementProfile" end>
            Personal Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="....">
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}