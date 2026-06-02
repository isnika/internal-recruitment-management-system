import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type AuthUser = {
  userId?: number;
  email?: string;
  role?: string;
  token?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");

    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser) as AuthUser;

        return {
          ...parsed,
          token, // đảm bảo token luôn sync
        };
      } catch {
        return null;
      }
    }

    return null;
  });

  const login = (userData: AuthUser, token: string) => {
    const fullUser: AuthUser = {
      ...userData,
      token,
    };

    localStorage.setItem("user", JSON.stringify(fullUser));
    localStorage.setItem("access_token", token);

    setUser(fullUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
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