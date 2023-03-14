import { StateContext } from "../context/StateContext";
import { useCookies } from "react-cookie";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import axios from "axios";

function Header({ setOpen }) {
  const { setIsLogin, isLogin } = useContext(StateContext);
  const [cookies] = useCookies(["user_id"]);

  const Logout = async () => {
    try {
      await axios.get("/api/logout");
      setIsLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-9 mr-3 sm:h-14" alt="logo" />
        </Link>
        <div className="flex items-center justify-between w-full md:w-auto md:order-1">
          <ul className="flex items-center p-4 rounded-lg gap-4 bg-white">
            {isLogin && (
              <Link
                to="/dashboard"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Dashboard
              </Link>
            )}
            {isLogin && cookies.user_type === "buyer" && (
              <Link
                to="/reports"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Exchange
              </Link>
            )}
            {isLogin && cookies.user_type === "buyer" && (
              <button
                className="flex rounded-full"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="h-8 w-8"
                >
                  <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                </svg>
              </button>
            )}
            {isLogin && cookies.user_type === "patient" && (
              <Link
                className="block text-white bg-purple-500 py-1.5 px-4 hover:bg-purple-600 rounded"
                to="/registration/report"
              >
                Upload Reports
              </Link>
            )}
            {!isLogin && (
              <Link
                to="/login"
                className="block text-white bg-purple-500 py-1.5 px-4 hover:bg-purple-600 rounded"
              >
                Login
              </Link>
            )}
            {isLogin && (
              <button
                onClick={Logout}
                className="block text-white bg-purple-500 py-1.5 px-4 hover:bg-purple-600 rounded"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
