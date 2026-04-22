import { Outlet } from "react-router-dom";
import HeaderManagement from "../HeaderManagement/HeaderManagement";

const MainLayoutManagement = () => {
  return (
    <>
      <HeaderManagement />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayoutManagement;