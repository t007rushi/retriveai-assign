import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
   

export const Vizualization = ({dropTableData}) => {
  console.log(dropTableData)
  return <div>
      Vizualization
      <Bar options={{
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Whom'st let the dogs out",
        },
      },
    }} data={{
        labels: dropTableData?.Name?.slice(1,5),
        datasets: [
          {
            label: "Whom'st let the dogs out",
            data: dropTableData?.OrderQty?.slice(1,5),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.4)",
          },
        ],
      }} />
      </div>;
};

