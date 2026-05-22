import { createContext, useContext, useState, ReactNode } from "react";


type User = {
  userId?: number;
  email?: string;
  role?: string;
  token?: string;
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    // SỬA KEY Ở ĐÂY: Phải là "access_token" để khớp với Login.tsx
    const token = localStorage.getItem("access_token");

    if (storedUser && token) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const login = (userData: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    // SỬA KEY Ở ĐÂY
    localStorage.setItem("access_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};