import React, { useState } from "react";
import "./Overview.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Overiew = () => {
    const data = [
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 300, pv: 4567, amt: 1398 },
        { name: "Page C", uv: 200, pv: 9800, amt: 9800 },
        { name: "Page D", uv: 278, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 189, pv: 4800, amt: 2181 },
      ];
      return (
        <div className="EnergyConsumption">
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
        </div>

        );
}

export default Overiew; 
          
