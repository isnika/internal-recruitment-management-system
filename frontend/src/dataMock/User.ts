export type UserRole = "candidate" | "company" | "admin";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  role: UserRole;
}

export const users: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@gmail.com",
    password: "123456",
    phone: "0900000001",
    fullName: "Admin User",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    email: "user@gmail.com",
    password: "123456",
    phone: "0900000002",
    fullName: "Nguyễn Trần Phương Ly",
    role: "candidate",
  },
];