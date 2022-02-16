import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// const state = {
//   labels: ["January", "February", "March", "April", "May"],
//   datasets: [
//     {
//       label: "Rainfall",
//       backgroundColor: "rgba(75,192,192,1)",
//       borderColor: "rgba(0,0,0,1)",
//       borderWidth: 2,
//       data: [65, 59, 80, 81, 56],
//     },
//   ],
// };
const LineChart = ({ style }) => {
  return (
    <div className="line-chart" style={style}>
      <Line
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "test",
              data: [2, 4, 10, 8, 5, 7, 15, 3, 12, 19, 13, 9],
              borderColor: "rgb(238, 28, 109)",
              pointBackgroundColor: "rgb(255,255,255)",
            },
            {
              label: "test1",
              data: [5, 2, 8, 15, 7, 10, 9, 4, 12, 3, 16, 6],
              borderColor: "rgb(252, 140, 49)",
              backgroundColor: "rgba(252, 140, 49, 0.3)",
              pointBackgroundColor: "rgb(255,255,255)",
              fill: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          tension: 0.5,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Monthly chart",
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
          scales: {
            x: {
              ticks: {
                color: style.color,
              },
              grid: {
                drawBorder: false,
                color: "transparent",
              },
            },
            y: {
              ticks: {
                color: style.color,
              },
              grid: {
                drawBorder: false,
                color: style.color,
              },
            },
          },
          animation: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
};

export default LineChart;
