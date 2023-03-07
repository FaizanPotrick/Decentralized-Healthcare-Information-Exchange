import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRegister from "./pages/Registration/User";
import StateProvider from "./context/StateContext";
import Report from "./pages/Registration/Report";
import PageNotFound from "./pages/PageNotFound";
import { CookiesProvider } from "react-cookie";
import { Windmill } from "@windmill/react-ui";
import Loading from "./components/Loading";
import Dashboard from "./pages/Dashboard";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Alert from "./components/Alert";
import Landing from "./pages/Landing";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/registration/patient",
    element: <UserRegister type_of_user="patient" />,
  },
  {
    path: "/registration/doctor",
    element: <UserRegister type_of_user="doctor" />,
  },
  {
    path: "/registration/buyer",
    element: <UserRegister type_of_user="buyer" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration/report",
    element: <Report />,
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
    path: "*",
    element: <PageNotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading pageLoading={true} />}>
      <Windmill usePreferences>
        <CookiesProvider>
          <StateProvider>
            <RouterProvider router={router} />
            <Loading />
            <Alert />
          </StateProvider>
        </CookiesProvider>
      </Windmill>
    </Suspense>
  </React.StrictMode>
);
