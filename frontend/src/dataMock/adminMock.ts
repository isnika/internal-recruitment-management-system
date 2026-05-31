export interface CompanyMock {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Pending" | "Approved" | "Blocked";
  verified: boolean;
  industry: string;
}

export interface ApplicationMock {
  id: number;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  date: string;
  cvFileName: string;
  status: "Pending" | "Shortlisted" | "Interviewed" | "Rejected";
  citizenId: string;
  taxId: string;
  bankAccount: string;
  socialLink: string;
}

export interface SystemLog {
  id: number;
  timestamp: string;
  actor: string;
  action: string;
  ip: string;
}

export interface RolePermissions {
  role: string;
  permissions: {
    // Admin
    manageSystem: boolean;
    manageUsers: boolean;
    approveJobs: boolean;
    manageCompanies: boolean;
    viewSystemReports: boolean;
    
    // Employer
    postJobs: boolean;
    editOwnJobs: boolean;
    manageApplications: boolean;
    scheduleInterviews: boolean;
    manageCompanyProfile: boolean;
    searchCandidates: boolean;

    // Candidate
    applyForJobs: boolean;
    manageOwnCVs: boolean;
    trackApplications: boolean;
    manageCandidateProfile: boolean;
  };
}

export const initialCompanies: CompanyMock[] = [
  {
    id: 1,
    name: "Công ty Công nghệ HKKQ",
    email: "contact@hkkq.vn",
    phone: "0243999999",
    address: "Hà Nội",
    status: "Approved",
    verified: true,
    industry: "Information Technology",
  },
  {
    id: 2,
    name: "Công ty ABC Solutions",
    email: "recruitment@abc.com",
    phone: "0283888888",
    address: "TP. Hồ Chí Minh",
    status: "Pending",
    verified: false,
    industry: "Marketing & Sales",
  },
  {
    id: 3,
    name: "Công ty XYZ Logistics",
    email: "hr@xyz.com",
    phone: "02363777777",
    address: "Đà Nẵng",
    status: "Blocked",
    verified: false,
    industry: "Administration",
  },
  {
    id: 4,
    name: "Tập đoàn Vingroup",
    email: "jobs@vingroup.net",
    phone: "0243111222",
    address: "Hà Nội",
    status: "Approved",
    verified: true,
    industry: "Multidisciplinary",
  },
];

export const initialApplications: ApplicationMock[] = [
  {
    id: 1,
    candidateName: "Nguyễn Trần Phương Ly",
    jobTitle: "Senior React Developer",
    companyName: "Công ty Công nghệ HKKQ",
    date: "2026-05-19",
    cvFileName: "LyNguyen_CV_React.pdf",
    status: "Pending",
    citizenId: "079999999123",
    taxId: "1234567890",
    bankAccount: "Vietcombank - 1234567890",
    socialLink: "linkedin.com/in/lynguyen",
  },
  {
    id: 2,
    candidateName: "Nguyễn Trần Phương Tuấn",
    jobTitle: "Marketing Manager",
    companyName: "Công ty ABC Solutions",
    date: "2026-05-18",
    cvFileName: "TuanNguyen_Marketing.pdf",
    status: "Shortlisted",
    citizenId: "012345678456",
    taxId: "9876543210",
    bankAccount: "ACB - 654321098",
    socialLink: "facebook.com/tuannguyen",
  },
  {
    id: 3,
    candidateName: "Phạm Minh Hoàng",
    jobTitle: "UI/UX Designer",
    companyName: "Tập đoàn Vingroup",
    date: "2026-05-15",
    cvFileName: "HoangPham_Portfolio.pdf",
    status: "Interviewed",
    citizenId: "030099988776",
    taxId: "4567890123",
    bankAccount: "Techcombank - 1903333333",
    socialLink: "behance.net/hoangpham",
  },
];

export const initialLogs: SystemLog[] = [
  {
    id: 1,
    timestamp: "2026-05-21 19:30:12",
    actor: "Admin (admin@gmail.com)",
    action: "Blocked candidate 'Nguyễn Trần Phương Tuấn' due to spam activity.",
    ip: "192.168.1.10",
  },
  {
    id: 2,
    timestamp: "2026-05-21 19:28:45",
    actor: "Admin (admin@gmail.com)",
    action: "Approved job listing 'Senior React Developer' from HKKQ.",
    ip: "192.168.1.10",
  },
  {
    id: 3,
    timestamp: "2026-05-21 19:15:33",
    actor: "Employer (company1@gmail.com)",
    action: "Submitted new job posting 'Junior Frontend Engineer' for approval.",
    ip: "113.161.44.89",
  },
];

export const initialRolePermissions: RolePermissions[] = [
  {
    role: "Admin",
    permissions: {
      manageSystem: true,
      manageUsers: true,
      approveJobs: true,
      manageCompanies: true,
      viewSystemReports: true,
      
      postJobs: false,
      editOwnJobs: false,
      manageApplications: false,
      scheduleInterviews: false,
      manageCompanyProfile: false,
      searchCandidates: false,

      applyForJobs: false,
      manageOwnCVs: false,
      trackApplications: false,
      manageCandidateProfile: true, // Admin can usually edit profiles
    },
  },
  {
    role: "Employer",
    permissions: {
      manageSystem: false,
      manageUsers: false,
      approveJobs: false,
      manageCompanies: false,
      viewSystemReports: false,
      
      postJobs: true,
      editOwnJobs: true,
      manageApplications: true,
      scheduleInterviews: true,
      manageCompanyProfile: true,
      searchCandidates: true,

      applyForJobs: false,
      manageOwnCVs: false,
      trackApplications: false,
      manageCandidateProfile: false,
    },
  },
  {
    role: "Candidate",
    permissions: {
      manageSystem: false,
      manageUsers: false,
      approveJobs: false,
      manageCompanies: false,
      viewSystemReports: false,
      
      postJobs: false,
      editOwnJobs: false,
      manageApplications: false,
      scheduleInterviews: false,
      manageCompanyProfile: false,
      searchCandidates: false,

      applyForJobs: true,
      manageOwnCVs: true,
      trackApplications: true,
      manageCandidateProfile: true,
    },
  },
];
