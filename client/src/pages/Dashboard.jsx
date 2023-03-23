import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../context/StateContext";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import Report from "./Registration/Report";
import { useCookies } from "react-cookie";
import { Container } from "@mantine/core";
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
        <div
          style={{
            minHeight: "100vh",
          }}
        >
          <Header setOpen={setOpen} />
          <Container size="lg" className="mt-20">
            {/* <Link className="text-purple-600 hover:underline ml-1" to="/login">
          Redeem
        </Link> */}
            <InfoCard
              data={[
                {
                  title: "Available Reports",
                  value: reports.length,
                  icon: "report",
                },
                {
                  title: "Total Report For Sale",
                  value: reports.filter((item) => item.price).length,
                  icon: "sale",
                },
                {
                  title: "Total Report Sold",
                  value: "0",
                  icon: "exchange",
                },
                {
                  title: "Revenue",
                  value: "0",
                  icon: "coin",
                },
              ]}
            />
            <Table
              head={[
                "Report Name",
                "Disease",
                "Date",
                "Criticality",
                `${cookies.user_type === "patient" ? "Price" : ""}`,
                `${cookies.user_type === "patient" && ""}`,
                `${cookies.user_type === "patient" && ""}`,
                `${cookies.user_type === "patient" && ""}`,
              ]}
              value={reports}
              setReFetched={setReFetched}
              reFetched={reFetched}
              cookies={cookies}
            />
          </Container>
        </div>
      )}
      <Cart open={open} setOpen={setOpen} />
    </>
  );
};

export default Dashboard;
