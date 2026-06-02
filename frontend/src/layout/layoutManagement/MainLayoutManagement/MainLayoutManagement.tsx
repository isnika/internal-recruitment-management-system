import { Outlet } from "react-router-dom";
import HeaderManagement from "../HeaderManagement/HeaderManagement";
import FooterUser from "../../layoutUser/FooterUser/FooterUser";
import styles from "./MainLayoutManagement.module.css";

const MainLayoutManagement = () => {
  return (
    <>
      <HeaderManagement />
      <main className={styles.main}>
        <Outlet />
      </main>
      <FooterUser />
    </>
  );
};

export default MainLayoutManagement;