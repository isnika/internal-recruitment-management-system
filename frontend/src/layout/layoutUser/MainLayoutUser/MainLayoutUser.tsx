import { Outlet } from "react-router-dom";
import HeaderUser from "../HeaderUser/HeaderUser";
import FooterUser from "../FooterUser/FooterUser"

const MainLayoutUser = () => {
  return (
    <>
      <HeaderUser />
      {/* Nội dung page sẽ render ở đây */}
      <main>
        <Outlet />
      </main>

      <FooterUser/>
    </>
  );
};

export default MainLayoutUser;