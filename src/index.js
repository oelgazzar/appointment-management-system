import React from "react";
import ReactDOM from "react-dom/client";

import AuthProvider from "./components/auth/AuthProvider";
import AppointmentProvider from "./components/appointments/AppointmentProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import rootRoutes from "./routes/root";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter(rootRoutes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppointmentProvider>
        <RouterProvider router={router} />
      </AppointmentProvider>
    </AuthProvider>
  </React.StrictMode>
);
