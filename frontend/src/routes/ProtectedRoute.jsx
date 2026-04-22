import { Navigate } from "react-router-dom";
import { useAuth } from "../feature/auth/context/AuthContext";

export default function ProtectedRoute({ children, allowRoles }) {
  const { user, loading } = useAuth();

  if (loading) return null; // hoặc spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowRoles && !allowRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}