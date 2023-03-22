import { StateContext } from "../context/StateContext";
import React, { useContext } from "react";
import { Loader } from "@mantine/core";

const Loading = ({ pageLoading }) => {
  const { loading } = useContext(StateContext);
  return (
    (loading || pageLoading) && (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
          position: "fixed",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "9999",
        }}
      >
        <Loader color="cyan" variant="bars" />
      </div>
    )
  );
};

export default Loading;
