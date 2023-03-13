import React, { useState } from "react";
import axios from "axios";

function Price({ setIsPrice, isPrice }) {
  const [price, setPrice] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/registration/report/price/${isPrice.report_id}`, {
        price,
      });
      setPrice(0);
      setIsPrice({
        isPrice: false,
        report_id: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white/90
       z-[9999] w-full p-4"
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow border">
          <button
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => {
              setIsPrice({
                isPrice: false,
                report_id: "",
              });
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Update Price
            </h3>
            <form className="space-y-6" onSubmit={onSubmit}>
              <input
                type="number"
                className="input_field"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                required
              />
              <button type="submit" className="input_button">
                Update Price
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Price;
