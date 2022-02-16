import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
const BarChart = ({ style }) => {
  return (
    <div className="bar-chart" style={style}>
      <Bar
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "test",
              data: [2, 4, 10, 8, 5, 7, 15],
              borderColor: "rgb(238, 28, 109)",
              backgroundColor: "rgba(238, 28, 109, 1)",
            },
            {
              label: "test1",
              data: [5, 1, 8, 12, 7, 10, 9],
              borderColor: "rgb(252, 140, 49)",
              backgroundColor: "rgba(252, 140, 49, 1)",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Weeky chart",
              color: style.color,
              font: {
                size: 18,
              },
            },
            legend: {
              display: true,
              labels: {
                color: style.color,
                font: {
                  size: 14,
                },
              },
            },
          },
          stacked: false,
          animation: {
            duration: 3000,
          },
          scales: {
            x: {
              ticks: {
                color: style.color,
              },
              grid: {
                color: "transparent",
                borderColor: style.color,
              },
            },
            y: {
              ticks: {
                color: style.color,
              },
              grid: {
                color: "transparent",
                borderColor: style.color,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
