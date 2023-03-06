import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./assets/css/tailwind.output.css";
import Landing from "./pages/Landing";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Windmill } from "@windmill/react-ui";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="w-full h-screen p-6 text-lg font-medium text-gray-600">
          Loading...
        </div>
      }
    >
      <Windmill usePreferences>
        <RouterProvider router={router} />
      </Windmill>
    </Suspense>
  </React.StrictMode>
);
