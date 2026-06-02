import { Outlet } from "react-router-dom";
import styles from "./Profile.Sidebar.module.css";
import Sidebar from "./Sidebar";

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
