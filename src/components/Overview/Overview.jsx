import React from "react";
import "./Overview.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";

const Overview = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 4567, amt: 1398 },
    { name: "Page C", uv: 200, pv: 9800, amt: 9800 },
    { name: "Page D", uv: 278, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 189, pv: 4800, amt: 2181 },
  ];

  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  const percentageDifference = 20 + "% lower";

  return (
    <>
      <div className="cards-container">
        <div className="card">
          <h2>Energy Consumption Statistic</h2>
          <LineChart
            width={300}
            height={200}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
          <p>The energy usage is {percentageDifference} than last week</p>
          <button>View More</button>
        </div>
        <div className="card">
          <h2>Energy Consumption Usage</h2>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
          </PieChart>
        </div>
        <div className="card">
          <h2>Current Energy Usage</h2>
          {/* Add content for the third card here */}
        </div>
      </div>
    </>
  );
};

export default Overview;
