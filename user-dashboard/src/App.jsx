import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "shell_frontend/MainLayout";
import { StoreProvider } from "shell_frontend/store";
import { UserDashboardStoreProvider } from "./store/store";

const root = createRoot(document.querySelector("#app"));
root.render(<MainLayout />);
