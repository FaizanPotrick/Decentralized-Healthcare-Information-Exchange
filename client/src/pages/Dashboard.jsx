import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import InfoCard from "../components/InfoCard";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import Header from "../components/Header";
import Table from "../components/Table";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Report from "./Registration/Report";
import axios from "axios";

const Dashboard = () => {
  const { isLogin, setAlert, setLoading } = useContext(StateContext);
  const [cookies] = useCookies(["user_id"]);
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

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
  }, [cookies.user_type]);

  return (
    <>
      {cookies.user_type === "doctor" ? (
        <Report />
      ) : (
        <div className="container mx-auto">
          <Header />
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
              "Price",
              "",
            ]}
            value={reports}
            setReports={setReports}
          />
          {/* <div className="flex flex-col w-full"> */}
          {/* <div className="my-6 text-2xl font-semibold text-gray-700 ">Charts</div> */}
          {/* <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Criticality
          </p>
          <Doughnut
            data={{
              datasets: [
                {
                  data: [33, 33, 33],
                  backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
                  label: "Dataset 1",
                },
              ],
              labels: ["High", "Medium", "Low"],
            }}
          />
          <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
            {doughnutLegends.map((legend) => {
              return (
                <div className="flex items-center" key={legend.title}>
                  <span
                    className={`inline-block w-3 h-3 mr-1 ${legend.color} rounded-full`}
                  ></span>
                  <span>{legend.title}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Revenue
          </p>
          <Line {...lineOptions} />
          <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
            {lineLegends.map((legend) => {
              return (
                <div className="flex items-center" key={legend.title}>
                  <span
                    className={`inline-block w-3 h-3 mr-1 ${legend.color} rounded-full`}
                  ></span>
                  <span>{legend.title}</span>
                </div>
              );
            })}
          </div>
        </div> *
      </div> */}
          {/* </div> */}
        </div>
      )}
    </>
  );
};

export default Dashboard;
