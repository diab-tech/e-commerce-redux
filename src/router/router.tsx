import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ProtectedRoute from "../auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: async () => {
          try {
            const { default: Home } = await import("../pages/index");
            return {
              Component: () => (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              ),
            };
          } catch (error) {
            console.error("Failed to load Home:", error);
            throw error;
          }
        },
      },
      {
        path: "cart",
        lazy: async () => {
          try {
            const { default: Cart } = await import("../components/Cart");
            return {
              Component: () => (
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              ),
            };
          } catch (error) {
            console.error("Failed to load Cart:", error);
            throw error;
          }
        },
      },
      {
        path: "login",
        lazy: async () => {
          try {
            const { default: LoginForm } = await import("../pages/Login");
            return { Component: LoginForm };
          } catch (error) {
            console.error("Failed to load Login:", error);
            throw error;
          }
        },
      },
      {
        path: "register",
        lazy: async () => {
          try {
            const { default: Register } = await import("../pages/Register");
            return { Component: Register };
          } catch (error) {
            console.error("Failed to load Register:", error);
            throw error;
          }
        },
      },
    ],
  },
]);

export default router;
