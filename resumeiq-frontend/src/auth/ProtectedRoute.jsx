import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuth, loading } = useAuth();

  // ⏳ Wait until auth state is resolved
  if (loading) {
    return <div>Loading...</div>;
  }

  // 🔒 Not authenticated → login
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authenticated → allow page
  return children;
}
