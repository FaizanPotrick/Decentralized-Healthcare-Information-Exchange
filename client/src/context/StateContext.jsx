import React, { useState, createContext } from "react";
import { useCookies } from "react-cookie";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [alert, setAlert] = useState({ isAlert: false, type: "", message: "" });
  const [cookies] = useCookies(["user_id"]);
  const [isLogin, setIsLogin] = useState(cookies.user_id ? true : false);
  const [loading, setLoading] = useState(false);

  return (
    <StateContext.Provider
      value={{
        loading,
        setLoading,
        alert,
        setAlert,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
