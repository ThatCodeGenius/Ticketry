import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/auth";

export default function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    // unauthorized
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}
