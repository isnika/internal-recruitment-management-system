import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import MainLayoutUser from "../layout/layoutUser/MainLayoutUser/MainLayoutUser";
import AuthLayout from "../layout/layoutAuth/layoutAuth";
import MainLayoutManagement from "../layout/layoutManagement/MainLayoutManagement/MainLayoutManagement";

import Home from "../feature/home/pages/Home/Home";
import Login from "../feature/auth/pages/Login/Login";
import Register from "../feature/auth/pages/Register/Register";

import JobDetail from "../feature/job/pages/JobDetail/JobDetail";

import Profile from "../feature/userProfile/pages/userProfile/Profile";
import PersonalProfile from "../feature/userProfile/components/PersonalProfile/PersonalProfile";
import ManageCV from "../feature/userProfile/components/CVManagement/CVManagement";
import SavedJobs from "../feature/userProfile/components/SavedJob/SavedJob";
import AppliedJobs from "../feature/userProfile/components/AppliedJob/AppliedJob";
import Settings from "../feature/userProfile/components/Settings/Settings";

import SearchPage from "../feature/Search/pages/SearchPage/SearchPage";

/*admin */
import HomeEmployer from "../feature/employer/home/pages/HomeEmployer/homeEmployer";
import ManagementProfile from "../feature/managementProfile/pages/managementProfile/ManagementProfile";
import PersonalManagement from "../feature/employer/home/components/PersonalManagement/PersonalManagement";

import { useAuth } from "../feature/auth/context/AuthContext";

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
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="search" element={<SearchPage />} />

        <Route path="profile" element={<Profile />}>
          <Route index element={<PersonalProfile />} />
          <Route path="cv" element={<ManageCV />} />
          <Route path="saved" element={<SavedJobs />} />
          <Route path="applied" element={<AppliedJobs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

       {/* management */}
        <Route
          path="/layoutManagement"
          element={
            <ProtectedRoute allowRoles={["company", "admin"]}>
              <MainLayoutManagement />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomeEmployer />} />

          <Route path="managementProfile" element={<ManagementProfile />}>
            <Route index element={<PersonalManagement />} />
          </Route>
        </Route>

    </Routes>
  );
}