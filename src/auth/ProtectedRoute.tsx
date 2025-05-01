import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { logout } from "../app/features/counter/authSlice";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { accessToken, loading, error } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  console.log("ProtectedRoute state:", { accessToken, loading, error, location });

  useEffect(() => {
    if (!loading && !accessToken) {
      toast.error("Your session has expired. Please log in again.", {
        className: "bg-red-600 dark:bg-red-500 text-white rounded-md shadow-lg p-4",
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
      });
      dispatch(logout());
    } else if (!loading && error) {
      toast.error(error || "Authentication error. Please log in again.", {
        className: "bg-red-600 dark:bg-red-500 text-white rounded-md shadow-lg p-4",
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
      });
      dispatch(logout());
    }
  }, [accessToken, loading, error, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!accessToken || error) {
    console.warn("No accessToken or error, redirecting to /login");
    return <Navigate to="/login" state={{ from: location, error }} replace />;
  }

  return children;
};

export default ProtectedRoute;
