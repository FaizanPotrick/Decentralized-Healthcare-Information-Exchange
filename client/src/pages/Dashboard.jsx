import React from "react";
import InfoCard from "../components/InfoCard";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, EditIcon } from "../icons";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Badge,
} from "@windmill/react-ui";
import RoundIcon from "../components/RoundIcon";
import download from "../icons/download.png";
import { Doughnut, Line } from "react-chartjs-2";

function Dashboard() {
  const doughnutLegends = [
    { title: "High", color: "bg-blue-500" },
    { title: "Medium", color: "bg-teal-600" },
    { title: "Low", color: "bg-purple-600" },
  ];

  const lineLegends = [
    { title: "2022", color: "bg-teal-600" },
    { title: "2021", color: "bg-purple-600" },
  ];
  const doughnutOptions = {
    data: {
      datasets: [
        {
          data: [33, 33, 33],
          backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
          label: "Dataset 1",
        },
      ],
      labels: ["High", "Medium", "Low"],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };
  const lineOptions = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "High",
          backgroundColor: "#0694a2",
          borderColor: "#0694a2",
          data: [43, 48, 40, 54, 67, 73, 70],
          fill: false,
        },
        {
          label: "Low",
          fill: false,
          backgroundColor: "#7e3af2",
          borderColor: "#7e3af2",
          data: [24, 50, 64, 74, 52, 51, 65],
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
        },
      },
    },
    legend: {
      display: false,
    },
  };
  return (
    <>
      <div className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        WELCOME <span className="text-purple-600"> PREET</span>
      </div>
      <div className="flex justify-end items-end mb-2">
        <button className="btn bg-purple-500 mr-4 px-2 py-2 rounded-md text-white">
          Upload Reports
        </button>
        <button className="btn bg-purple-500 px-2 py-2 rounded-md text-white">
          Go To Exchange
        </button>
        <br />
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Available Reports" value="60">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="For Sale" value="5">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Sold" value="20">
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Revenue" value="$64">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
          <button className="btn  bg-blue-400 px-2 py-2 items-end justify-end mr-12 rounded-md">
            Redeem
          </button>
        </InfoCard>
        <div className="items-end justify-end mr-12"></div>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Purchased Reports" value="20">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Amount Spent" value="$64">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Report Details</TableCell>
              <TableCell>Disease</TableCell>
              <TableCell>Report ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Criticality</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <span className="text-sm">Chest X-ray</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">Tuberculosis</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">345676</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">January 15, 2022</span>
              </TableCell>
              <TableCell>
                <button className="btn bg-red-300 rounded-md px-3 text-black text-center">
                  High
                </button>
              </TableCell>
              <TableCell>
                <span className="text-sm">$7</span>
              </TableCell>
              <TableCell>
                <button layout="link" size="icon" aria-label="Edit">
                  <EditIcon className="w-5 h-5 mt-4" aria-hidden="true" />
                </button>
              </TableCell>
              <TableCell>
                <img className="w-6 h-6 mt-2" src={download} />
                <Badge type></Badge>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="text-sm">Brain MRI</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">Sroke</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">345678</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">February 25, 2022</span>
              </TableCell>
              <TableCell>
                <button className="btn bg-yellow-200  text-black rounded-md px-3 text-center">
                  Medium
                </button>
              </TableCell>
              <TableCell>
                <span className="text-sm">$5</span>
              </TableCell>
              <TableCell>
                <button layout="link" size="icon" aria-label="Edit">
                  <EditIcon className="w-5 h-5 mt-3" aria-hidden="true" />
                </button>
              </TableCell>
              <TableCell>
                <img className="w-6 h-6 mt-2" src={download} />
                <Badge type></Badge>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="text-sm">Stomach Sonography</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">Typoid</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">345680</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">February 30, 2022</span>
              </TableCell>
              <TableCell>
                <button className="btn bg-green-400 text-black rounded-md px-3 text-center">
                  Low
                </button>
              </TableCell>
              <TableCell>
                <span className="text-sm">$5</span>
              </TableCell>
              <TableCell>
                <button layout="link" size="icon" aria-label="Edit">
                  <EditIcon className="w-5 h-5 mt-4" aria-hidden="true" />
                </button>
              </TableCell>
              <TableCell>
                <img className="w-6 h-6 mt-2 mr-10" src={download} />
                <Badge type></Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm"></span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Charts
      </div>
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
    </>
  );
}

export default Dashboard;
