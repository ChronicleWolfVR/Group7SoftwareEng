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
  // Data for the line chart
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 4567, amt: 1398 },
    { name: "Page C", uv: 200, pv: 9800, amt: 9800 },
    { name: "Page D", uv: 278, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 189, pv: 4800, amt: 2181 },
  ];

  // Data for the pie chart
  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  // Percentage difference for energy usage
  const percentageDifference = 20 + "% lower";

  return (
    <>
      <div className="cards-container">
        {/* Card for Energy Consumption Statistic */}
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

        {/* Card for Energy Consumption Usage */}
        <div className="card">
          <h2>Energy Consumption Usage</h2>
          <PieChart width={400} height={200}>
            <Pie
              dataKey="value"
              startAngle={360}
              endAngle={0}
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            />
          </PieChart>
          <h4>Monthly energy usage</h4>
          <h2>165 kw</h2>
          <h4>Monthly Goal</h4>
          <h2>Reduce usage by 300 kw</h2>
          <h4>Progress</h4>
          <h2>45%</h2>
        </div>

        {/* Card for Current Energy Usage */}
        <div className="card">
          <h2>Current Energy Usage</h2>
          <h1>2.1kw</h1>
          <p>Your home's power draw at the moment</p>
          <h2>48kw</h2>
          <p>24-hr usage</p>
          <h2>£5.20</h2>
          <p>Estimated cost</p>
        </div>
      </div>
    </>
  );
};

export default Overview;
