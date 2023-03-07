import React from "react";

const Table = ({ head, value }) => {
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
                  Chest X-ray
                </th>
                <td className="px-6 py-4">Tuberculosis</td>
                <td className="px-6 py-4">January 15, 2022</td>
                <td className="px-6 py-4">
                  <button className="btn bg-red-300 rounded-md px-3 text-black text-center">
                    High
                  </button>
                </td>
                <td className="px-6 py-4">$7</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Download
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Delete
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
