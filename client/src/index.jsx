import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StateProvider from "./context/StateContext";
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
import Register from "./pages/Registeration/User";
import PageNotFound from "./pages/PageNotFound";
import "./index.css";

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
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <PageNotFound />, // done
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
