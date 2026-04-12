import { users } from "../dataMock/User";
import type { User } from "../dataMock/User";

export const loginApi = (
  account: string,
  password: string
): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) =>
          (u.email === account || u.username === account) &&
          u.password === password
      );

      if (!user) {
        reject(new Error("Sai tài khoản hoặc mật khẩu"));
        return;
      }

      resolve({
        user,
        token: "mock_token_" + user.id + "_" + Date.now(),
      });
    }, 700);
  });
};

// REGISTER MOCK (optional)
export const registerApi = (data: any) => {
  return new Promise<{ user: User; token: string }>((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: users.length + 1,
        ...data,
      };

      users.push(newUser);

      resolve({
        user: newUser,
        token: "mock_token_" + newUser.id + "_" + Date.now(),
      });
    }, 700);
  });
};