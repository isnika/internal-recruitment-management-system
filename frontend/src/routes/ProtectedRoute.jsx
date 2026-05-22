import { Navigate } from "react-router-dom";
import { useAuth } from "../feature/auth/context/AuthContext";

export default function ProtectedRoute({ children, allowRoles }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  console.log("Check Role:", {
    userRole: user.role,
    allowed: allowRoles
  });

  const hasAccess = allowRoles.some(
    (role) => role.toUpperCase() === user.role?.toUpperCase()
  );

  if (allowRoles && !hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}