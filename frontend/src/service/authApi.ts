import { request } from "./axiosClient";

//     TYPES    

export type AuthResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type UserProfile = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: string;
  status: string;
};

export type LoginReq = { email: string; password: string };
export type LoginRes = { token: string; type: string; userId: number; email: string; role: string };

export type RegisterReq = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  code: string;
  role: "CANDIDATE" | "RECRUITER" | string;
  companyId?: number;
};

export type ForgotPasswordReq = { email: string };
export type ResetPasswordReq = { email: string; code: string; newPassword: string };
export type SendCodeReq = { [key: string]: string }; // Dựa trên schema { "additionalProp": "string" }
export type GoogleLoginReq = { idToken: string };

export type UpdateProfileReq = {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
};

export type UpdateRecruitmentInfoReq = {
  companyId: number;
  department: string;
  jobTitle: string;
};

//     AUTH APIs    

// LOGIN
export const login = (data: LoginReq) => request.post<AuthResponse<LoginRes>>("/api/auth/login", data);

// REGISTER
export const register = (data: RegisterReq) => request.post<AuthResponse<{ user: UserProfile }>>("/api/auth/register", data);

// LOGOUT
export const logout = () => request.post<AuthResponse<string>>("/api/auth/logout");

// FORGOT PASSWORD
export const forgotPassword = (data: ForgotPasswordReq) => request.post<AuthResponse<any>>("/api/auth/forgot-password", data);

// RESET PASSWORD
export const resetPassword = (data: ResetPasswordReq) => request.post<AuthResponse<any>>("/api/auth/reset-password", data);

// SEND VERIFY CODE
export const sendCode = (data: SendCodeReq) => request.post<AuthResponse<{ email: string }>>("/api/auth/send-code", data);

// GOOGLE LOGIN
export const loginWithGoogle = (data: GoogleLoginReq) => request.post<AuthResponse<LoginRes>>("/api/auth/google", data);

//     ME (PROFILE)    

// UPDATE PROFILE
export const updateMyProfile = (data: UpdateProfileReq) => request.patch<AuthResponse<UserProfile>>("/api/auth/me/profile", data);

// UPDATE RECRUITMENT INFO
export const updateRecruitmentInfo = (data: UpdateRecruitmentInfoReq) => request.patch<AuthResponse<UserProfile>>("/api/auth/me/recruitment-info", data);

// UPLOAD AVATAR
export const updateAvatar = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return request.patch<AuthResponse<UserProfile>>("/api/auth/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};