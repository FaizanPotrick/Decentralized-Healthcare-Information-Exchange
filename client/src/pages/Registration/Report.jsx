import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "../../components/Header";
import axios from "axios";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Paper,
  Button,
  Title,
  Stack,
  Container,
  Select,
  FileInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

const Report = () => {
  const navigate = useNavigate();
  const { isLogin, setAlert, setLoading } = useContext(StateContext);
  const [cookies] = useCookies(["user_id"]);
  const [type_of_user] = useState(cookies.user_type);
  const form = useForm({
    initialValues: {
      patient_id: "",
      name: "",
      description: "",
      patient_age: "",
      type: "",
      disease: "",
      criticality: "",
      date: "",
      price: "",
    },
  });
  const [reportFile, setReportFile] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      navigate(-1);
      return;
    }
    if (cookies.user_type !== "patient" && cookies.user_type !== "doctor") {
      navigate(-1);
      return;
    }
  }, [isLogin]);

  useEffect(() => {
    if (type_of_user === "doctor") {
      (async () => {
        setLoading(true);
        try {
          const { data } = await axios.get("/api/patient");
          setPatients(data);
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
  }, [type_of_user]);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          minHeight: "92.7vh",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Container my="auto">
          <Paper
            radius="md"
            p="xl"
            withBorder
            w={"34rem"}
            sx={(theme) => {
              return {
                [theme.fn.smallerThan("xs")]: {
                  width: 340,
                },
              };
            }}
          >
            <Title
              align="center"
              mb={20}
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 600,
              })}
            >
              Report
            </Title>
            <form
              onSubmit={form.onSubmit(async (val) => {
                setLoading(true);
                const formData = new FormData();
                formData.append("patient_id", val.patient_id);
                formData.append("name", val.name);
                formData.append("description", val.description);
                formData.append("patient_age", val.patient_age);
                formData.append("type", val.type);
                formData.append("disease", val.disease);
                formData.append("criticality", val.criticality);
                formData.append("date", val.date);
                formData.append("price", val.price);
                formData.append("report", reportFile);
                try {
                  const { data } = await axios.post(
                    `/api/registration/report/${type_of_user}`,
                    formData
                  );
                  form.reset();
                  setReportFile(null);
                  setAlert({
                    isAlert: true,
                    type: "success",
                    message: data,
                  });
                  navigate("/dashboard");
                } catch (error) {
                  setAlert({
                    isAlert: true,
                    type: "error",
                    message: error.response.data,
                  });
                }
                setLoading(false);
              })}
            >
              <Stack
                sx={(theme) => ({
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  [theme.fn.smallerThan("xs")]: {
                    gridTemplateColumns: "1fr",
                  },
                })}
              >
                {type_of_user === "doctor" && (
                  <Select
                    label="Patient ID"
                    placeholder="Patient ID"
                    data={patients.map((patient) => {
                      return { value: patient._id, label: patient.name };
                    })}
                    value={form.values.patient_id}
                    onChange={(event) =>
                      form.setFieldValue("patient_id", event)
                    }
                    required
                  />
                )}
                <TextInput
                  placeholder="Report Name"
                  label="Report Name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  required
                />
                <TextInput
                  placeholder="Description"
                  label="Description"
                  value={form.values.description}
                  onChange={(event) =>
                    form.setFieldValue("description", event.currentTarget.value)
                  }
                  required
                />
                <TextInput
                  placeholder="Patient Age"
                  label="Patient Age"
                  value={form.values.patient_age}
                  onChange={(event) =>
                    form.setFieldValue("patient_age", event.currentTarget.value)
                  }
                  required
                />
                <Select
                  label="Type of Report"
                  placeholder="Select Type of Report"
                  disabled
                  data={[
                    { value: "pdf", label: "PDF" },
                    { value: "image", label: "Image" },
                  ]}
                  value={form.values.type}
                  onChange={(event) => form.setFieldValue("type", event)}
                  required
                />
                <TextInput
                  placeholder="Disease"
                  label="Disease"
                  value={form.values.disease}
                  onChange={(event) =>
                    form.setFieldValue("disease", event.currentTarget.value)
                  }
                  required
                />
                <Select
                  label="Criticality"
                  placeholder="Select Criticality Level"
                  data={[
                    { value: "high", label: "High" },
                    { value: "medium", label: "Medium" },
                    { value: "low", label: "Low" },
                  ]}
                  value={form.values.criticality}
                  onChange={(event) => form.setFieldValue("criticality", event)}
                  required
                />
                {type_of_user === "patient" && (
                  <TextInput
                    placeholder="Price"
                    label="Price"
                    value={form.values.price}
                    onChange={(event) =>
                      form.setFieldValue("price", event.currentTarget.value)
                    }
                    required
                  />
                )}
                <DateInput
                  valueFormat="YYYY MMM DD"
                  label="Date"
                  placeholder="Date"
                  value={form.values.date}
                  onChange={(event) => form.setFieldValue("date", event)}
                  required
                />
                <FileInput
                  label="Upload Report"
                  placeholder="Upload Report"
                  value={reportFile}
                  onChange={(event) => {
                    if (event.type === "application/pdf") {
                      form.setFieldValue("type", "pdf");
                    } else {
                      form.setFieldValue("type", "image");
                    }
                    setReportFile(event);
                  }}
                  accept="image/*, application/pdf"
                  required
                />
              </Stack>
              <Button type="submit" radius="md" fullWidth color="cyan" mt={20}>
                Upload Report
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Report;
