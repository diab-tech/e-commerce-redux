import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken, loading, error } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  console.log("ProtectedRoute state:", { accessToken, loading, error, location });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!accessToken) {
    console.warn("No accessToken, redirecting to /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (error) {
    console.error("Auth error, redirecting to /login:", error);
    return <Navigate to="/login" state={{ from: location, error }} replace />;
  }

  return children;
};

export default ProtectedRoute;
