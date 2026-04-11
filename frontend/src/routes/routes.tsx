import { Routes, Route } from "react-router-dom";

import MainLayoutUser from "../layout/layoutUser/MainLayoutUser/MainLayoutUser";
import Home from "../feature/home/pages/Home/Home";

export default function AppRoutes() {
  return (
    <Routes>

      {/* USER LAYOUT */}
      <Route path="/" element={<MainLayoutUser />}>
        <Route index element={<Home />} />
      </Route>

    </Routes>
  );
}