import { Outlet } from "react-router-dom";
import styles from "./ManagementProfile.Sidebar.module.css";
import Sidebar from "./ManagementSidebar";

export default function Profile() {
  return (
    <div className={styles.accountPage}>
      <Sidebar />

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
