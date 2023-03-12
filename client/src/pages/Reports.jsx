import React, { useState, useContext } from "react";
import { StateContext } from "../context/StateContext";
import ReportCard from "../components/ReportCard";
import Header from "../components/Header";
import Cart from "../components/Cart";

const Reports = () => {
  const { reports, setReports } = useContext(StateContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header setOpen={setOpen} setReports={setReports} />
      <div className="flex justify-center items-center flex-col mx-2 md:mx-5 lg:mx-8">
        <div className="flex justify-around items-center w-full mb-5">
          <div className="text-3xl font-semibold">Exchange</div>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-8 h-8 text-[#00553a]/50 dark:text-[#00553a]/50 hover:text-[#00553a]/100 dark:hover:text-[#00553a]/100 transition-colors duration-200 ease-in-out cursor-pointer"
          >
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"></path>
          </svg>
        </div>
        <div className="flex justify-center flex-wrap gap-4 w-full">
          {reports.map((report) => (
            <ReportCard
              key={report._id}
              report={report}
              age={report.age}
              image={report.image}
            />
          ))}
        </div>
        <Cart open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Reports;
