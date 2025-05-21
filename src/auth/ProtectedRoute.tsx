import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { wasSessionExpired } from "../config/axios.config";

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

  if (!accessToken || wasSessionExpired()) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, error: "جلسة المستخدم انتهت، سجل دخول من جديد" }}
        replace
      />
    );
  }
  

  return children;
};

export default ProtectedRoute;
