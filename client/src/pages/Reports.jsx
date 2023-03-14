import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import ReportCard from "../components/ReportCard";
import Header from "../components/Header";
import Cart from "../components/Cart";

const Reports = () => {
  const { reports } = useContext(StateContext);
  const [search, setSearch] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSearch(reports);
  }, [reports]);

  return (
    <>
      <Header setOpen={setOpen} />
      <div className="flex justify-center items-center flex-col mx-2 md:mx-5 lg:mx-8">
        <div className="mx-auto max-w-[86rem] w-full">
          <div className="flex justify-between items-center w-full mt-10 mb-5">
            <div className="text-3xl font-semibold">Exchange</div>
            <div className="flex gap-2">
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
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none w-full"
                  placeholder="Search for Reports ..."
                  onChange={(e) => {
                    const { value } = e.target;
                    setSearch(
                      reports.filter((report) => {
                        return (
                          report.name
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                          report.disease
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                          report.type
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                          report.criticality
                            .toLowerCase()
                            .includes(value.toLowerCase())
                        );
                      })
                    );
                  }}
                />
              </div>
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-10 h-10 text-slate-500 hover:text-slate-700 transition-colors duration-200 ease-in-out cursor-pointer"
              >
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-start flex-wrap gap-4 w-full">
            {search.map((report) => (
              <ReportCard
                key={report._id}
                report={report}
                age={report.age}
                image={report.image}
              />
            ))}
          </div>
        </div>
        <Cart open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Reports;
