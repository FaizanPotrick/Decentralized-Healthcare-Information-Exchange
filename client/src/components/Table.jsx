import { IconEye, IconTrash } from "@tabler/icons-react";
import { Table, Badge, ActionIcon } from "@mantine/core";
import PriceModal from "./Price";
import React from "react";
import axios from "axios";

const IsTable = ({ head, value, setReFetched, reFetched, cookies }) => {
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
      if (!data) return console.log("NO CID");
      window.open(`https://ipfs.io/ipfs/${data.split("ipfs://")[1]}`, "_blank");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        padding: "20px 10px",
        borderRadius: "12px",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
      }}
    >
      <Table>
        <thead>
          <tr>
            {head.map((item, index) => {
              if (item !== "false") {
                return <th key={index}>{item}</th>;
              }
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
                    <PriceModal
                      price={item.price}
                      report_id={item._id}
                      setReFetched={setReFetched}
                      reFetched={reFetched}
                    />
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
    </div>
  );
};

export default IsTable;
