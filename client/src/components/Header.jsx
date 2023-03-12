import { StateContext } from "../context/StateContext";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header({ setOpen }) {
  const { setLoading, setAlert, setIsLogin, isLogin, reports, setReports } =
    useContext(StateContext);
  const [isProfileMenu, setIsProfileMenu] = useState(false);

  const Logout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/logout");
      setIsLogin(false);
    } catch (error) {
      console.log(error);
      setAlert({
        isAlert: true,
        type: error.response.data.type,
        message: error.response.data.message,
      });
    }
    setLoading(false);
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <img src="logo.jpg" className="h-9 mr-3 sm:h-14" alt="logo" />
        </Link>
        {isLogin && (
          <div className="relative flex items-center md:order-2">
            <button
              className="flex rounded-full mr-3"
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
            <button
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0"
              onClick={() => {
                setIsProfileMenu(!isProfileMenu);
              }}
            >
              <img className="w-8 h-8 rounded-full" alt="user photo" />
            </button>
            {isProfileMenu && (
              <div className="absolute top-6 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow border">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900">
                    Bonnie Green
                  </span>
                  <span className="block text-sm font-medium text-gray-500 truncate">
                    name@flowbite.com
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </a>
                  </li>
                  <li
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={Logout}
                  >
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="relative hidden md:block w-full max-w-xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-blue-500 focus:outline-none w-full"
            placeholder="Search for Reports ..."
            onChange={(e) => {
              const searchQuery = e.target.value;
              setReports(
                reports.filter((report) => {
                  return (
                    report.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    report.patient.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    report.disease
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    report.type
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    report.criticality
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  );
                })
              );
            }}
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
