import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "./MainLayout";

const root = createRoot(document.querySelector("#app"));
root.render(<MainLayout />);
