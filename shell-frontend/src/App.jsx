import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css"; 

// const UserDashboard = React.lazy(() => import('user_dashboard/UserDashboard'));
// const AdminDashboard = React.lazy(() => import('admin_dashboard/AdminDashboard'));

// const App = () => (
//   <div className="app">
//     <div>Name: shell-frontend</div>
//     <div>Framework: React</div>
//     <div>Language: JavaScript</div>
//     <div>CSS: Empty CSS</div>
//     <ErrorBoundary>
//     <Suspense fallback={<div>Loading...</div>}>
//       <hr />
//       <UserDashboard />
//       <hr />
//       <AdminDashboard />
//       <hr />
//     </Suspense>
//     </ErrorBoundary>
//   </div>
// );

import MainLayout from "./MainLayout";
import { StoreProvider } from "shell_frontend/store";
const root = createRoot(document.querySelector("#app"));
root.render(
    //providing store values to this shell application
    <StoreProvider>
        <MainLayout />
    </StoreProvider>
    );
