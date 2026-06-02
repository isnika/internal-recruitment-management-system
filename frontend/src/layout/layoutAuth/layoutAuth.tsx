import { Outlet } from "react-router-dom";
import HeaderAuth from "./HeaderAuth/HeaderAuth";
import FooterUser from "../layoutUser/FooterUser/FooterUser";

import styles from "./layoutAuth.module.css";

const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <HeaderAuth />

      <main className={styles.authMain}>
        <Outlet />
      </main>

      <FooterUser />
    </div>
  );
};

export default AuthLayout;