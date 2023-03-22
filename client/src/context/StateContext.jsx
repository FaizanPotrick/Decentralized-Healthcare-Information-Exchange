import React, { useState, useEffect, createContext } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    isAlert: false,
    type: "",
    message: "",
  });
  const [cookies] = useCookies(["user_id"]);
  const [isLogin, setIsLogin] = useState(cookies.user_id ? true : false);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/report/all");
        setReports(data);
      } catch (err) {
        console.log(err);
        setAlert({
          isAlert: true,
          type: err.response.data.type,
          message: err.response.data.message,
        });
      }
      setLoading(false);
    })();
  }, []);

  const Logout = async () => {
    await axios.get("/api/logout");
    setIsLogin(false);
  };

  return (
    <StateContext.Provider
      value={{
        loading,
        setLoading,
        alert,
        setAlert,
        isLogin,
        setIsLogin,
        reports,
        setReports,
        Logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
