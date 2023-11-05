import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import MainLayout from "shell_frontend/MainLayout";


const App = () => (
  <div className="user">
    <div>Name: user-dashboard</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);

const root = createRoot(document.querySelector("#app"));
root.render(<MainLayout />)
