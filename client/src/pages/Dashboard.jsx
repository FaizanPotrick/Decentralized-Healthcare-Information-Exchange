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
import revenue from "../icons/revenue.png";
import report from "../assets/report.png";
import sold from "../assets/sold.png";
import sale from "../assets/sale.png";
import revenues from "../assets/revenue.png";

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
          {/* <Link className="text-purple-600 hover:underline ml-1" to="/login">
          Redeem
        </Link> */}
          {/* <div className="flex items-center gap-6 mb-6 mt-10">
            <InfoCard title="Available Reports" value="60" icon={PeopleIcon} />
            <InfoCard title="For Sale" value="5" icon={MoneyIcon} />
            <InfoCard title="Sold" value="20" icon={CartIcon} />
            <InfoCard title="Revenue" value="₹64" icon={ChatIcon} />
            
          </div> */}

          <div className="flex items-center gap-12 mb-6 mt-10 ml-20">
           
            <div class=" w-64 p-4 bg-white border ml-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center">
              <img class="h-20 w-20  mr-4" src={report} alt="report" />
              <div>
                <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Available Reports
                </h5>
                <p>60</p>
              </div>
            </div>

            <div class=" w-64 p-4 bg-white border ml-5 border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center">
              <img class="h-20 w-20  mr-4" src={sale} alt="report" />
              <div>
                <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  For Sale
                </h5>
                <p>5</p>
              </div>
            </div>

            <div class=" w-64 p-4 bg-white border ml-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center">
              <img class="h-20 w-20  mr-4" src={sold} alt="report" />
              <div>
                <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Sold
                </h5>
                <p>20</p>
              </div>
            </div>

            <div class=" w-64 p-4 bg-white border  ml-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center">
              <img class="h-20 w-20  mr-4" src={revenues} alt="report" />
              <div>
                <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  Revenue
                </h5>
                <p>₹64</p>
              </div>
            </div>
          </div>

          <br />

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
