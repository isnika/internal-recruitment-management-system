import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import MainLayoutUser from "../layout/layoutUser/MainLayoutUser/MainLayoutUser";
import AuthLayout from "../layout/layoutAuth/layoutAuth";
import MainLayoutManagement from "../layout/layoutManagement/MainLayoutManagement/MainLayoutManagement";

import Home from "../feature/home/pages/Home/Home";
import Login from "../feature/auth/pages/Login/Login";
import Register from "../feature/auth/pages/Register/Register";
import ForgotPassW from "../feature/auth/pages/ForgotPassW/ForgotPassW";
import Companies from"../feature/companies/pages/companiesPage";
import JobPage from "../feature/jobPage/pages/JobPage";
import SalaryGuidePage from "../feature/salaryGuidePage/pages/SalaryGuidePage";
import BlogPage from "../feature/blog/pages/BlogPage";

import JobDetail from "../feature/job/pages/JobDetail/JobDetail";

import Profile from "../feature/userProfile/pages/userProfile/Profile";
import PersonalProfile from "../feature/userProfile/components/PersonalProfile/PersonalProfile";
import ManageCV from "../feature/userProfile/components/CVManagement/CVManagement";
import SavedJobs from "../feature/userProfile/components/SavedJob/SavedJob";
import AppliedJobs from "../feature/userProfile/components/AppliedJob/AppliedJob";
import InterviewMe from "../feature/userProfile/components/Interview/pages/InterviewMe"
import Settings from "../feature/userProfile/components/Settings/Settings";
import ApplyJobPage from "../feature/apply-job/ApplyJobPage";
import SearchPage from "../feature/Search/pages/SearchPage/SearchPage";
import RecruitmentHelpCenter from "../feature/userProfile/components/Help/RecruitmentHelpCenter";

/* management */
import HomeEmployer from "../feature/employer/home/pages/HomeEmployer/homeEmployer";

import RecruitmentPage from "../feature/employer/RecruitmentManagement/pages/recruitmentManagement";
import InterviewPage from "../feature/employer/InterviewManagement/pages/interviewManagement";
import ApplicationsPage from "../feature/employer/applyManagement/pages/ApplicationsPage";
import DashboardPage from "../feature/employer/dashBoardManagement/pages/dashboardPage";
import SettingManagement from "../feature/employer/settingManagement/pages/settingManagement";
import ExperienceLevelManagement from "../feature/employer/ExperienceLevelManagement/pages/ExperienceLevelManagement";
import DepartmentManagement from "../feature/employer/DepartmentManagement/pages/DepartmentManagement";
import SkillManagement from "../feature/employer/skillManagement/pages/SkillManagement";
import CompanyManagementEmployer from "../feature/employer/CompanyManagement/pages/CompanyManagement";

/* admin */
import HomeAdmin from "../feature/admin/home/pages/HomeAdmin/homeAdmin";
import Dashboard from "../feature/admin/Dashboard/pages/Dashboard";
import UserManagement from "../feature/admin/UserAccountManagement/pages/UserManagement";
import JobApproval from "../feature/admin/JobApproval/pages/JobApproval";
import CompanyManagement from "../feature/admin/CompanyManagement/pages/CompanyManagement";
import ApplicationMonitoring from "../feature/admin/ApplicationMonitoring/pages/ApplicationMonitoring";
import RolePermission from "../feature/admin/RolePermission/pages/RolePermission";
import StatisticalReport from "../feature/admin/StatisticalReport/pages/StatisticalReport";
import SystemSettings from "../feature/admin/SystemSettings/pages/SystemSettings";


export default function AppRoutes() {
  return (
    <Routes>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassW" element={<ForgotPassW/>} />
      </Route>

      {/* USER */}
      <Route path="/" element={<MainLayoutUser />}>
        <Route index element={<Home />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="jobPage" element={<JobPage />} />
        <Route path="/apply-job/:jobId" element ={<ApplyJobPage/>} />
        <Route path="companies" element={<Companies/>} />
        <Route path="salary-guide" element={<SalaryGuidePage/>} />
        <Route path="blog" element={<BlogPage/>} />
        <Route path="profile" element={<Profile />}>
          <Route index element={<PersonalProfile />} />
          <Route path="cv" element={<ManageCV />} />
          <Route path="saved" element={<SavedJobs />} />
          <Route path="applied" element={<AppliedJobs />} />
          <Route path="interviewMe" element={<InterviewMe/>} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<RecruitmentHelpCenter/>} />
        </Route>
      </Route>

      {/* MANAGEMENT */}
      <Route
        path="/layoutmanagement"
        element={
          <ProtectedRoute allowRoles={["RECRUITER", "ADMIN"]}>
            <MainLayoutManagement />
          </ProtectedRoute>
        }
      >

        {/* redirect default */}
        <Route index element={<Navigate to="employer" replace />} />

        {/* EMPLOYER DASHBOARD */}
        <Route path="employer" element={<HomeEmployer />}>
          <Route index element={<Navigate to="dashboardManagement" replace />} />
          <Route path="dashboardManagement" element={<DashboardPage/>} />
          <Route path="recruitmentManagement" element={<RecruitmentPage />} />
          <Route path="applyManagement" element={<ApplicationsPage />} />
          <Route path="interviewManagement" element={<InterviewPage />} />
          <Route path="settingManagement" element={<SettingManagement/>} />
          <Route path="skillManagement" element={<SkillManagement/>} />
          <Route path="departmentManagement" element={<DepartmentManagement/>} />
          <Route path="experienceLevelManagement" element={<ExperienceLevelManagement/>} />
          <Route path="companyManagementEmployer" element={<CompanyManagementEmployer/>}/>

        </Route>

        {/* ADMIN PANEL */}
        <Route path="admin" element={<HomeAdmin />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="job-approval" element={<JobApproval />} />
          <Route path="companies" element={<CompanyManagement />} />
          <Route path="applications" element={<ApplicationMonitoring />} />
          <Route path="roles" element={<RolePermission />} />
          <Route path="reports" element={<StatisticalReport />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>

        {/* PROFILE MANAGEMENT */}


      </Route>

    </Routes>
  );
}