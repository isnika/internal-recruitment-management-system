import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type User = {
  userId?: number;
  email?: string;
  role?: string;
  token?: string;
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;

  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;

  login: (
    user: User,
    token: string
  ) => void;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(() => {
      const storedUser =
        localStorage.getItem("user");

      const token =
        localStorage.getItem(
          "access_token"
        );

      if (storedUser && token) {
        try {
          return JSON.parse(storedUser);
        } catch {
          return null;
        }
      }

      return null;
    });

  const login = (userData: User, token: string) => {
    const fullUser = {
      ...userData,
      token,
    };

    localStorage.setItem("user", JSON.stringify(fullUser));
    localStorage.setItem("access_token", token);

    setUser(fullUser);
  };
  const logout = () => {
    localStorage.removeItem("user");

    localStorage.removeItem(
      "access_token"
    );

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
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};