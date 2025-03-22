import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Access restricted! Please log in to continue.");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/user-dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
