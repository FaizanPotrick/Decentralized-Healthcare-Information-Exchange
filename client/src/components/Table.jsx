import React, { useState } from "react";
import Price from "./Price";
import axios from "axios";
import { Table, Badge, ActionIcon } from "@mantine/core";
import { IconEye, IconTrash, IconCoinRupee } from "@tabler/icons-react";

const IsTable = ({ head, value, setReFetched, reFetched, cookies }) => {
  const [isPrice, setIsPrice] = useState({
    isPrice: false,
    report_id: "",
  });

  const DeleteReport = async (report_id) => {
    try {
      await axios.get(`/api/registration/report/remove/${report_id}`);
      setReFetched(!reFetched);
    } catch (error) {
      console.log(error);
    }
  };

  const GetCID = async (report_id) => {
    try {
      const { data } = await axios.get(
        `/api/report/${cookies.user_type}/cid/${report_id}`
      );
      if (!data) {
        console.log("NO CID");
        return;
      }
      window.location.href = `https://ipfs.io/ipfs/${data.split("ipfs://")[1]}`;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        padding: "20px 10px",
        borderRadius: "15px",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
      }}
    >
      <Table>
        <thead>
          <tr>
            {head.map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {value.map((item, index) => {
            return (
              <tr key={index}>
                <th>{item.name}</th>
                <td>
                  <Badge c="cyan">{item.disease.split(",")[0]}</Badge>
                  {item.disease.split(",")[1] && (
                    <Badge c="cyan" ml={10}>
                      {item.disease.split(",")[1]}
                    </Badge>
                  )}
                </td>
                <td>{item.date.substring(0, 10)}</td>
                <td>
                  <Badge
                    c={
                      item.criticality === "low"
                        ? "green"
                        : item.criticality === "medium"
                        ? "yellow"
                        : item.criticality === "high"
                        ? "red"
                        : ""
                    }
                    color={
                      item.criticality === "low"
                        ? "green"
                        : item.criticality === "medium"
                        ? "yellow"
                        : item.criticality === "high"
                        ? "red"
                        : ""
                    }
                  >
                    {item.criticality}
                  </Badge>
                </td>
                {cookies.user_type === "patient" && (
                  <td>{item.price ? `₹${item.price}` : "-"}</td>
                )}
                {cookies.user_type === "patient" && (
                  <td>
                    <ActionIcon
                      color="teal"
                      onClick={() =>
                        setIsPrice({
                          isPrice: true,
                          report_id: item._id,
                        })
                      }
                    >
                      <IconCoinRupee />
                    </ActionIcon>
                  </td>
                )}
                <td>
                  <ActionIcon onClick={() => GetCID(item._id)}>
                    <IconEye />
                  </ActionIcon>
                </td>
                {cookies.user_type === "patient" && (
                  <td>
                    <ActionIcon
                      color="red"
                      onClick={() => DeleteReport(item._id)}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {isPrice.isPrice && (
        <Price
          setIsPrice={setIsPrice}
          isPrice={isPrice}
          setReFetched={setReFetched}
          reFetched={reFetched}
        />
      )}
    </div>
  );
};

export default IsTable;
