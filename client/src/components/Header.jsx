import React from "react";
import { SearchIcon } from "../icons";
import reportsJSON from "../json/reports.json";

function Header({ setOpen, setReports }) {
  return (
    <header className="flex items-center justify-around py-4 bg-white shadow-bottom px-10">
      <img src="logo.jpg" alt="" className="h-16" />
      <form className="px-2.5 py-1.5 flex justify-between items-center w-full max-w-xl my-5 border-2 border-[#0e8f66]/50 rounded-lg overflow-hidden">
        <SearchIcon className="w-4 h-4" aria-hidden="true" />
        <input
          type="text"
          className="w-full ml-2.5 text-xs md:text-sm text-[#00553a]/50 bg-[#0e8f66]/[0.02] dark:placeholder-[#00553a]/50 font-medium focus:outline-none"
          placeholder="Search for Reports ..."
          onChange={(e) => {
            const searchQuery = e.target.value;
            setReports(
              reportsJSON.filter((report) => {
                return (
                  report.report_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  report.patient_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  report.disease
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  report.report_type
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  report.severity
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                );
              })
            );
          }}
        />
      </form>
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className="w-8 h-8 text-[#00553a]/50 dark:text-[#00553a]/50 hover:text-[#00553a]/100 dark:hover:text-[#00553a]/100 transition-colors duration-200 ease-in-out cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
      </svg>
    </header>
  );
}

export default Header;
