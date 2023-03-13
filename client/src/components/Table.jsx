import React, { useState } from "react";
import download from "../icons/download.png";
import Price from "./Price";
import axios from "axios";

const Table = ({ head, value, setReports }) => {
  const [isPrice, setIsPrice] = useState({
    isPrice: false,
    report_id: "",
  });

  const DeleteReport = async (report_id) => {
    try {
      await axios.get(`/api/registration/report/${report_id}`);
      setReports(value.filter((item) => item._id !== report_id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {head.map((item, index) => {
              return (
                <th scope="col" className="px-6 py-3" key={index}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {value.map((item, index) => {
            return (
              <tr className="bg-white border-b" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowra"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4 capitalize">{item.disease}</td>
                <td className="px-6 py-4">{item.date.substring(0, 10)}</td>
                <td className="px-6 py-4 uppercase">
                  <div className="bg-red-300 rounded-md px-3 text-black text-center w-fit">
                    {item.criticality}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.price ? `$${item.price}` : "-"}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => {
                      setIsPrice({
                        isPrice: true,
                        report_id: item._id,
                      });
                    }}
                  >
                    Update Price
                  </button>
                </td>
                <td className="px-6 py-4">
                  <img className="w-5 h-5 cursor-pointer" src={download} />
                </td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={DeleteReport(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isPrice.isPrice && <Price setIsPrice={setIsPrice} isPrice={isPrice} />}
    </div>
  );
};

export default Table;
