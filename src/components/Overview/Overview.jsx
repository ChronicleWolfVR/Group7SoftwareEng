import React, { useState } from "react";
import "./Overview.css";
import { LineChart, Line } from "recharts";

const Overiew = () => {
    const data = [
        { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 300, pv: 4567, amt: 1398 },
        { name: "Page C", uv: 200, pv: 9800, amt: 9800 },
        { name: "Page D", uv: 278, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 189, pv: 4800, amt: 2181 },
      ];
      return (
            <LineChart width={400} height={400} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>

        );
}

export default Overiew; 
          
