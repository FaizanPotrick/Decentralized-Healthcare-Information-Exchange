import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Link, useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import Report from "./Registration/Report";
import { useCookies } from "react-cookie";
import Header from "../components/Header";
import Table from "../components/Table";
import Cart from "../components/Cart";
import axios from "axios";

const Dashboard = () => {
  const { isLogin, setAlert, setLoading } = useContext(StateContext);
  const [cookies] = useCookies(["user_id"]);
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [reFetched, setReFetched] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate(-1);
    }
    if (
      cookies.user_type !== "patient" &&
      cookies.user_type !== "buyer" &&
      cookies.user_type !== "doctor"
    ) {
      navigate(-1);
    }
  }, [isLogin, cookies.user_type]);

  useEffect(() => {
    if (cookies.user_type === "patient" || cookies.user_type === "buyer") {
      (async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(`/api/report/${cookies.user_type}`);
          console.log(data);
          setReports(data);
        } catch (error) {
          console.log(error);
          setAlert({
            isAlert: true,
            type: "error",
            message: error.response.data,
          });
        }
        setLoading(false);
      })();
    }
  }, [cookies.user_type, reFetched]);

  return (
    <>
      {cookies.user_type === "doctor" ? (
        <Report />
      ) : (
        <div className="container mx-auto">
          <Header setOpen={setOpen} />
          <div className="flex justify-end">
            {cookies.user_type != "buyer" && (
              <Link
                className="btn bg-purple-500  hover:bg-purple-400 mr-4 px-2 py-2 rounded-md text-white"
                to="/registration/report"
              >
                Upload Reports
              </Link>
            )}
            {cookies.user_type == "buyer" && (
              <Link
                className="btn bg-purple-500  hover:bg-purple-400 mr-4 px-2 py-2 rounded-md text-white"
                to="/registration/report"
              >
                Go To Exchange
              </Link>
            )}
            {/* <Link className="text-purple-600 hover:underline ml-1" to="/login">
          Redeem
        </Link> */}
          </div>
          <div className="flex items-center gap-6 my-6">
            <InfoCard title="Available Reports" value="60" icon={PeopleIcon} />
            <InfoCard title="For Sale" value="5" icon={MoneyIcon} />
            <InfoCard title="Sold" value="20" icon={CartIcon} />
            <InfoCard title="Revenue" value="$64" icon={ChatIcon} />
          </div>
          <Table
            head={[
              "Report Name",
              "Disease",
              "Date",
              "Criticality",
              `${cookies.user_type === "patient" ? "Price" : ""}`,
            ]}
            value={reports}
            setReFetched={setReFetched}
            reFetched={reFetched}
            cookies={cookies}
          />
        </div>
      )}
      <Cart open={open} setOpen={setOpen} />
    </>
  );
};

export default Dashboard;
