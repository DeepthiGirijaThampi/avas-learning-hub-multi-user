// Import Navigate component to redirect users
import { Navigate } from "react-router";

// ProtectedRoute component
export default function ProtectedRoute({ children }) {

  // Retrieve authentication token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}