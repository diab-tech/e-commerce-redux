import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";
import store from "./app/store.ts";
import ThemeInitializer from "./components/ThemeInitializer.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeInitializer />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "rounded-md shadow-lg p-4",
          style: {
            borderRadius: "8px",
            // padding: "16px",
            fontSize: "16px",
          },
          duration: 3000,
          success: {
            className: "bg-green-500 text-white",
          },
          error: {
            className: "bg-red-500 dark:bg-red-400 text-white",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>,
);
