import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { Alert } from "@mantine/core";

const IsAlert = () => {
  const { alert, setAlert } = useContext(StateContext);

  return (
    alert.isAlert && (
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          zIndex: "9999",
          marginBottom: "1rem",
          marginLeft: "1rem",
        }}
      >
        <Alert
          color={alert.type === "error" ? "red" : "green"}
          sx={{
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          }}
          w={200}
          withCloseButton
          onClose={() => setAlert({ isAlert: false, type: "", message: "" })}
        >
          {alert.message}
        </Alert>
      </div>
    )
  );
};

export default IsAlert;
