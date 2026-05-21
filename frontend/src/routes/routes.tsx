import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import MainLayoutUser from "../layout/layoutUser/MainLayoutUser/MainLayoutUser";
import AuthLayout from "../layout/layoutAuth/layoutAuth";
import MainLayoutManagement from "../layout/layoutManagement/MainLayoutManagement/MainLayoutManagement";

import Home from "../feature/home/pages/Home/Home";
import Login from "../feature/auth/pages/Login/Login";
import Register from "../feature/auth/pages/Register/Register";
import Companies from"../feature/companies/pages/companiesPage";

import JobDetail from "../feature/job/pages/JobDetail/JobDetail";

import Profile from "../feature/userProfile/pages/userProfile/Profile";
import PersonalProfile from "../feature/userProfile/components/PersonalProfile/PersonalProfile";
import ManageCV from "../feature/userProfile/components/CVManagement/CVManagement";
import SavedJobs from "../feature/userProfile/components/SavedJob/SavedJob";
import AppliedJobs from "../feature/userProfile/components/AppliedJob/AppliedJob";
import Settings from "../feature/userProfile/components/Settings/Settings";

import SearchPage from "../feature/Search/pages/SearchPage/SearchPage";

/* management */
import HomeEmployer from "../feature/employer/home/pages/HomeEmployer/homeEmployer";

import RecruitmentPage from "../feature/employer/RecruitmentManagement/pages/recruitmentManagement";
import CandidatesPage from "../feature/admin/CandidateManagement/pages/candidatesManagement";
import InterviewPage from "../feature/employer/InterviewManagement/pages/interviewManagement";
import ApplyManagement from "../feature/employer/applyManagement/pages/ApplyManagement";
/* admin */
import HomeAdmin from "../feature/admin/home/pages/HomeAdmin/homeAdmin";

export default function AppRoutes() {
  return (
    <Routes>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* USER */}
      <Route path="/" element={<MainLayoutUser />}>
        <Route index element={<Home />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="companies" element={<Companies/>} />
        <Route path="profile" element={<Profile />}>
          <Route index element={<PersonalProfile />} />
          <Route path="cv" element={<ManageCV />} />
          <Route path="saved" element={<SavedJobs />} />
          <Route path="applied" element={<AppliedJobs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* MANAGEMENT */}
      <Route
        path="/layoutManagement"
        element={
          <ProtectedRoute allowRoles={["company", "admin"]}>
            <MainLayoutManagement />
          </ProtectedRoute>
        }
      >

        {/* redirect default */}
        <Route index element={<Navigate to="employer" replace />} />

        {/* EMPLOYER DASHBOARD */}
        <Route path="employer" element={<HomeEmployer />}>

          <Route index element={<Navigate to="recruitmentManagement" replace />} />
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="recruitmentManagement" element={<RecruitmentPage />} />
          <Route path="applyManagement" element={<ApplyManagement />} />
          <Route path="candidatesManagement" element={<CandidatesPage />} />
          <Route path="interviewManagement" element={<InterviewPage />} />
          <Route path="cv" element={<div>CV Review</div>} />
          <Route path="company" element={<div>Company Profile</div>} />
          <Route path="settings" element={<div>Settings</div>} />

        </Route>

        {/* ADMIN PANEL */}
        <Route path="admin" element={<HomeAdmin />} />

        {/* PROFILE MANAGEMENT */}


      </Route>

    </Routes>
  );
}