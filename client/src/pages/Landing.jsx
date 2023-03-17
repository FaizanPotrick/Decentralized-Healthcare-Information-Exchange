import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import ImageLight from "../assets/login-image.png";
import { Link } from "react-router-dom";
import homelogo from "../assets/logo2.png"
import "../index.css";
const Landing = () => {
  const { isLogin } = useContext(StateContext);
  return (
    <div>
      <header className="text-gray-600 body-font w-full flex flex-wrap justify-around items-center mt-5">
        <img className="h-20 mt-2" src={homelogo} />
        <div className="flex gap-4">
          {isLogin && (
            <Link
              to="/dashboard"
              className="inline-flex items-center text-white bg-purple-500 space-x-3 border-0 py-2 px-4 focus:outline-none hover:bg-purple-600 rounded-md  text-base mt-4 md:mt-0"
            >
              Dashboard
            </Link>
          )}
          {/* <Link
            to="/login"
            className="inline-flex items-center space-x-3  text-white bg-purple-500 border-0 py-2 px-4 focus:outline-none hover:bg-purple-600 rounded-md text-base mt-4 md:mt-0"
          >
            Login
          </Link> */}
        </div>

        <div class="p-10 space-x-3">
          <div class="dropdown inline-block relative">
            <button class="bg-purple-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-1">Sign Up</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>
            </button>

            <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
              <li class="">
                <a
                  class="rounded-t bg-purple-200 hover:bg-purple-300 text-black py-2 px-4 block whitespace-no-wrap"
                  href="/registration/doctor"
                >
                  Doctor
                </a>
              </li>
              <li class="">
                <a
                  class="bg-purple-200 hover:bg-purple-300 py-2 px-4  text-black block whitespace-no-wrap"
                  href="/registration/patient"
                >
                  Patient
                </a>
              </li>
              <li class="">
                <a
                  class="rounded-b bg-purple-200 hover:bg-purple-300 text-black py-2 px-4 block whitespace-no-wrap"
                  href="/registration/buyer"
                >
                  Buyer
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown inline-block relative ">
            <button class="bg-purple-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
              <a href="/login">
                <span class="mr-1">Login</span>
              </a>
            </button>
          </div>
        </div>
      </header>
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center max-h-screen overflow-hidden">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 overflow-hidden">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            width={400}
            height={100}
            src={ImageLight}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center overflow-hidden">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Revolutionizing healthcare with secure and transparent data exchange
          </h1>
          <div className="flex w-full md:justify-start justify-center items-end">
            <Link
              to="/reports"
              className="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg"
            >
              Go To Exchange
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
