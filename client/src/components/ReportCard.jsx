import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { useCookies } from "react-cookie";
import axios from "axios";

const ReportCard = ({
  report: {
    _id,
    name,
    patient: { name: patient_name },
    patient_age,
    disease,
    criticality,
    price,
    type,
    date,
  },
}) => {
  const { isLogin, setAlert } = useContext(StateContext);
  const [cookies] = useCookies(["user_id"]);
  const AddToCart = async () => {
    try {
      await axios.get(`/api/registration/cart/add/${_id}`);
    } catch (err) {
      console.log(err);
      setAlert({
        isAlert: true,
        type: "error",
        message: err.response.data.message,
      });
    }
  };
  return (
    <div className="flex flex-col justify-around h-full w-full max-w-md border border-gray-200/80 shadow-lg rounded-lg p-3 md:p-4 bg-white">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="relative text-slate-900 text-xl md:text-2xl font-semibold">
            {name}
            <span className="uppercase absolute bottom-3 text-xs font-semibold px-1.5 rounded shadow bg-blue-200 text-blue-800 ml-1">
              {type}
            </span>
          </div>
          <div className="text-sm md:text-base text-slate-500/70">
            {patient_name} - {patient_age}
          </div>
        </div>
        <img
          className="rounded-t-lg w-20 h-20"
          src={type == "pdf" ? "x-ray.png" : "checkup.png"}
          alt="product"
        />
      </div>
      <div className="flex gap-2 my-2 md:my-2.5 font-semibold capitalize">
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
        <div className="text-xl md:text-2xl font-bold text-gray-900">
          ${price}
        </div>
        <div className="bg-red-200 rounded-lg shadow text-xs md:text-sm font-medium px-3.5 py-0.5 text-red-700 uppercase">
          {criticality}
        </div>
        {cookies.user_type == "buyer" && isLogin && (
          <button
            onClick={AddToCart}
            className="bg-yellow-100/40 rounded-lg shadow px-3.5 py-0.5 font-medium"
          >
            Add to Cart
          </button>
        )}
      </div>
      <div className="text-xs text-slate-500/70">{date.substring(0, 10)}</div>
    </div>
  );
};

export default ReportCard;
