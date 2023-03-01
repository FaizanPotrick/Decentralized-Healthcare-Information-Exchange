import React from "react";

const ReportCard = ({
  report_name,
  patient_name,
  age,
  disease,
  report_cost,
  report_type,
  severity,
}) => {
  return (
    <div className="flex flex-col justify-around w-full max-w-md border-2 border-[#0e8f66]/20 shadow-lg rounded-lg bg-[#0e8f66]/[0.15] p-3 md:p-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="relative text-[#00553a] text-xl md:text-2xl font-semibold">
            {report_name}
            <span className="uppercase absolute bottom-3 text-xs font-semibold px-1.5 rounded shadow bg-blue-200 text-blue-800 ml-1">
              {report_type}
            </span>
          </div>
          <div className="text-sm md:text-base text-[#00553a]/70 font-medium">
            {patient_name} - {age}
          </div>
        </div>
        <img className="rounded-t-lg w-20 h-20" src="x-ray.png" alt="product" />
      </div>
      <div className="flex gap-2 my-2 md:my-2.5 font-semibold">
        <div className="bg-green-200 rounded-lg shadow text-xs md:text-sm px-3.5 py-1 text-green-700">
          {disease.split(",")[0]}
        </div>
        {disease.split(",")[1] && (
          <div className="bg-gray-200 rounded-lg shadow text-xs md:text-sm px-3.5 py-1 text-gray-700">
            {disease.split(",")[1]}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xl md:text-2xl font-bold text-[#00553a]">
          ${report_cost}
        </div>
        <div className="bg-red-200 rounded-lg shadow text-xs md:text-sm font-medium px-3.5 py-0.5 text-red-700">
          {severity}
        </div>
        <button className="bg-yellow-100/40 rounded-lg shadow px-3.5 py-0.5 font-medium">
          Add to Cart
        </button>
      </div>
      <div className="text-xs text-[#00553a]/70 font-medium">
        {Date().substring(0, 15)}
      </div>
    </div>
  );
};

export default ReportCard;
