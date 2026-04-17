export type UserRole = "candidate" | "company" | "admin";
export type Gender = "male" | "female" | "other";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  role: UserRole;
  address: string;
  dob: string;
  gender: Gender;
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
    address: "Hà Nội",
    dob: "1990-01-01",
    gender: "male",
  },
  {
    id: 2,
    username: "user",
    email: "user@gmail.com",
    password: "123456",
    phone: "0900000002",
    fullName: "Nguyễn Trần Phương Ly",
    role: "candidate",
    address: "TP. Hồ Chí Minh",
    dob: "2002-05-20",
    gender: "female",
  },
  {
    id: 3,
    username: "user",
    email: "user1@gmail.com",
    password: "123456",
    phone: "0800000001",
    fullName: "Nguyễn Trần Phương Tuấn",
    role: "candidate",
    address: "Thủ Đức, TP. Hồ Chí Minh",
    dob: "2005-01-01",
    gender: "male",
  },
];