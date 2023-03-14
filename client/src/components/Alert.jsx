import React, { useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";

const Alert = () => {
  const { alert, setAlert } = useContext(StateContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ isAlert: false, type: "", message: "" });
    }, 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    alert.isAlert && (
      <div
        className={`z-50 fixed bottom-4 left-4 flex p-4 text-sm ${
          alert.type === "error" ? "text-red-800" : "text-green-800"
        } border ${
          alert.type === "error" ? "border-red-300" : "border-green-300"
        } rounded-lg ${alert.type === "error" ? "bg-red-50" : "bg-green-50"}`}
      >
        <div>{alert.message}</div>
      </div>
    )
  );
};

export default Alert;
