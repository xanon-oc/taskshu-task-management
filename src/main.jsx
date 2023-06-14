import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes.jsx";
import AuthProvider from "./AuthProviders/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-center" reverseOrder={false} />
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
