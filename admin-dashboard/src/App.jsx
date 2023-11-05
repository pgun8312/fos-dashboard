import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import MainLayout from "shell_frontend/MainLayout";

const root = createRoot(document.querySelector("#app"));
root.render(<MainLayout />)
