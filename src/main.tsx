import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";
import store from "./app/store.ts";
import ThemeInitializer from "./components/ThemeInitializer.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeInitializer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>,
);
