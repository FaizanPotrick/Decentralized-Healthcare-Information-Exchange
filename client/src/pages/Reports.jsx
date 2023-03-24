import { TextInput, Text, Container, Group } from "@mantine/core";
import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import ReportCard from "../components/ReportCard";
import { IconSearch } from "@tabler/icons-react";
import Header from "../components/Header";

const Reports = () => {
  const { reports } = useContext(StateContext);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    setSearch(reports);
  }, [reports]);

  return (
    <>
      <Header />
      <Container size="xl">
        <Group position="apart" mt={30}>
          <Text weight={500} size={30}>
            Exchange
          </Text>
          <TextInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            size="md"
            sx={{
              maxWidth: 500,
              width: "100%",
            }}
            onChange={(e) => {
              const { value } = e.target;
              setSearch(
                reports.filter((report) => {
                  return (
                    report.name.toLowerCase().includes(value.toLowerCase()) ||
                    report.patient.name
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    report.patient_age.toString().includes(value) ||
                    report.disease
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    report.type.toLowerCase().includes(value.toLowerCase()) ||
                    report.criticality
                      .toLowerCase()
                      .includes(value.toLowerCase()) ||
                    report.date.toLowerCase().includes(value.toLowerCase()) ||
                    report.price.toString().includes(value)
                  );
                })
              );
            }}
            placeholder="Search for Reports ..."
          />
        </Group>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "start",
            marginTop: "20px",
          }}
        >
          {search.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Reports;
