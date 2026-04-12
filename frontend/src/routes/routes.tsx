import { Routes, Route } from "react-router-dom";

import MainLayoutUser from "../layout/layoutUser/MainLayoutUser/MainLayoutUser";
import AuthLayout from "../layout/layoutAuth/layoutAuth";

import Home from "../feature/home/pages/Home/Home";
import Login from "../feature/auth/pages/Login/Login";
import Register from "../feature/auth/pages/Register/Register";

export default function AppRoutes() {
  return (
    <Routes>

      {/* auth layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* layout User home normal */}
      <Route path="/" element={<MainLayoutUser />}>
        <Route index element={<Home />} />
      </Route>

    </Routes>
  );
}