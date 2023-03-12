import React from "react";
import ImageLight from "../assets/img/login-image.png";
import logo from "../icons/logo.png";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <header className="text-gray-600 body-font w-full flex flex-wrap justify-around items-center mt-5">
        <img className="h-20 mt-2" src={logo} />
        <div className="flex gap-4">
          <Link
            to="/login"
            className="inline-flex items-center space-x-3  text-white bg-purple-500 border-0 py-2 px-4 focus:outline-none hover:bg-purple-600 rounded-md text-base mt-4 md:mt-0"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center text-white bg-purple-500 space-x-3 border-0 py-2 px-4 focus:outline-none hover:bg-purple-600 rounded-md  text-base mt-4 md:mt-0"
          >
            SignUp
          </Link>
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
            Revoltionizing healthcare with secure and transparent data exchange
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
