import React, { useState } from "react";
import ReportCard from "../components/ReportCard";
import reportsJSON from "../json/reports.json";
import Cart from "../components/Cart";
import Header from "../components/Header";

const Reports = () => {
  const [reports, setReports] = useState(reportsJSON);
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
              key={report.disease}
              report_name={report.report_name}
              patient_name={report.patient_name}
              age={report.age}
              disease={report.disease}
              report_cost={report.report_cost}
              report_type={report.report_type}
              image={report.image}
              severity={report.severity}
            />
          ))}
        </div>
        <Cart open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Reports;
