import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = ({ style, posts, users }) => {
  const label = [
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
  ];

  return (
    <div className="line-chart" style={style}>
      <Line
        data={{
          labels: label,
          datasets: [
            {
              label: "Post",
              data: posts,
              borderColor: "rgb(238, 28, 109)",
              pointBackgroundColor: "rgb(255,255,255)",
            },
            {
              label: "User",
              data: users,
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
