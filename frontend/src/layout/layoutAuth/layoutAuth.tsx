import { Outlet } from "react-router-dom";

import HeaderAuth from "./HeaderAuth/HeaderAuth";
import FooterUser from "../layoutUser/FooterUser/FooterUser";

const AuthLayout = () => {
  return (
    <>
      <HeaderAuth />
      <Outlet />
      <FooterUser />
    </>
  );
};

export default AuthLayout;