import styles from "./menuEmployer.module.css";
import { FiHome, FiBriefcase, FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const MenuEmployer = () => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Management</h2>

      <nav className={styles.nav}>

        <NavLink
          to="recruitmentManagement"
          className={({ isActive }) =>
            isActive ? styles.activeItem : styles.item
          }
        >
          <FiHome />
          <span>Recruitment Information</span>
        </NavLink>

        <NavLink
          to="candidatesManagement"
          className={({ isActive }) =>
            isActive ? styles.activeItem : styles.item
          }
        >
          <FiUsers />
          <span>Candidates</span>
        </NavLink>

        <NavLink
          to="interviewManagement"
          className={({ isActive }) =>
            isActive ? styles.activeItem : styles.item
          }
        >
          <FiBriefcase />
          <span>Interview</span>
        </NavLink>

      </nav>
    </aside>
  );
};

export default MenuEmployer;