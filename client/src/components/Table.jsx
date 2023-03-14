import React, { useState } from "react";
import Price from "./Price";
import axios from "axios";

const Table = ({ head, value, setReFetched, reFetched, cookies }) => {
  const [isPrice, setIsPrice] = useState({
    isPrice: false,
    report_id: "",
  });

  const DeleteReport = async (report_id) => {
    try {
      await axios.get(`/api/registration/report/remove/${report_id}`);
      setReFetched(!reFetched);
    } catch (error) {
      console.log(error);
    }
  };

  const GetCID = async (report_id) => {
    try {
      const { data } = await axios.get(
        `/api/report/${cookies.user_type}/cid/${report_id}`
      );
      if (!data) {
        console.log("NO CID");
        return;
      }
      window.location.href = `https://ipfs.io/ipfs/${data.split("ipfs://")[1]}`;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="border-b text-center">
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
              <tr className="bg-white border-b text-center" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4 capitalize">
                  <div className="flex justify-center gap-2 capitalize">
                    <div className="bg-green-200 rounded-md px-3 text-green-700 w-fit">
                      {item.disease.split(",")[0]}
                    </div>
                    {item.disease.split(",")[1] && (
                      <div className="bg-gray-200 rounded-md px-3 text-gray-700 w-fit">
                        {item.disease.split(",")[1]}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">{item.date.substring(0, 10)}</td>
                <td className="px-6 py-4 uppercase flex justify-center">
                  <div
                    className={`rounded-md px-3 text-black w-fit ${
                      item.criticality === "low"
                        ? "bg-green-300"
                        : item.criticality === "medium"
                        ? "bg-yellow-300"
                        : item.criticality === "high"
                        ? "bg-red-200"
                        : ""
                    }`}
                  >
                    {item.criticality}
                  </div>

                  {/* <div className="bg-red-300 rounded-md px-3 text-black w-fit">
                    {item.criticality}
                  </div> */}
                </td>
                {cookies.user_type === "patient" && (
                  <td className="px-6 py-4">
                    {item.price ? `$${item.price}` : "-"}
                  </td>
                )}
                {cookies.user_type === "patient" && (
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
                )}
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => GetCID(item._id)}
                  >
                    View
                  </button>
                </td>
                {cookies.user_type === "patient" && (
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-blue-600 hover:underline"
                      onClick={() => {
                        DeleteReport(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isPrice.isPrice && (
        <Price
          setIsPrice={setIsPrice}
          isPrice={isPrice}
          setReFetched={setReFetched}
          reFetched={reFetched}
        />
      )}
    </div>
  );
};

export default Table;
