import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, Register, DoctorReport} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      {/* <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border border-b-[#e6ebf4]"> */}
      <header className="w-full border-b-[#e6ebf4] flex flex-row space-x-4 sm:px-8 px-4 py-4 justify-start">

        <Link to="/">
          <img src={logo} className="w-28 object-contain" />
        </Link>

        <div className="flex flex-row space-x-4 justify-end items-end w-full"> 
        <Link
          to="/register"
          className="font-intern font-medium bg-[#0e8f66]/80 hover:bg-green-700/90 text-white px-4 py-2 rounded-md justify-end items-end"
        >
          Register
        </Link>

        <Link
          to="/login"
          className="font-intern font-medium bg-[#0e8f66]/80 hover:bg-green-700/90 text-white px-4 py-2 rounded-md items-end"
        >
          Login
        </Link>
        </div>
    
      </header>
      
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/doctorreport" element={<DoctorReport />}></Route>
       
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
