import React from "react";
import { Chart } from "react-chartjs-2";

export const ChartComp = ({ dropTableData, droppedTableToshow, chartType }) => {
  return (
    <div className="chart">
      <Chart
        type={chartType}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Dropped Data",
            },
          },
        }}
        data={{
          labels: dropTableData?.Name?.slice(1, 10),
          datasets: Object.keys(droppedTableToshow).map((val, index) => ({
            label: val,
            data: droppedTableToshow[val],
            borderColor: `rgb(${index}3, 362,235)`,
            backgroundColor: `rgba(${index}3, ${index}62, 235, 0.4)`,
          })),
        }}
      />
    </div>
  );
};
