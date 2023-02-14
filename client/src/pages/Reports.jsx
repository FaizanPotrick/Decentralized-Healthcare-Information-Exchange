import React, { useState } from "react";
import ReportCard from "../components/ReportCard";
import reportsJSON from "../json/reports.json";

const Reports = () => {
  const [reports, setReports] = useState(reportsJSON);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex justify-center items-center flex-col mx-2 md:mx-5 lg:mx-8">
      <div className="relative flex justify-center items-center w-full my-5">
        <input
          type="search"
          className="w-full p-3 md:p-3.5 text-xs md:text-sm text-[#00553a]/50 border-2 border-[#0e8f66]/50 bg-[#0e8f66]/[0.02] rounded-xl dark:placeholder-[#00553a]/50 font-medium"
          placeholder="Search for Reports ..."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button
          className="text-white absolute right-2.5 bg-[#0e8f66]/80 hover:bg-[#0e8f66] duration-300 focus:outline-none font-semibold rounded-xl text-sm md:text-base px-5 py-1.5"
          onClick={() => {
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
        >
          Search
        </button>
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
            severity={report.severity}
          />
        ))}
      </div>
    </div>
  );
};

export default Reports;
