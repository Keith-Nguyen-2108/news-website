import React from "react";
import BarChart from "./BarChart";
import "./chart.css";
import LineChart from "./LineChart";
const Chart = ({ style }) => {
  return (
    <div className="combined-chart">
      <LineChart style={style} />
      <BarChart style={style} />
    </div>
  );
};

export default Chart;
