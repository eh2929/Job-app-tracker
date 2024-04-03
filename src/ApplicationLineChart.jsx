import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

function ApplicationLineChart({ data }) {
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="No Reply" stroke="#8884d8" />
      <Line type="monotone" dataKey="Interview" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Offer" stroke="#ffc658" />
      <Line type="monotone" dataKey="Accepted" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Rejected" stroke="#ffc658" />
    </LineChart>
  );
}

export default ApplicationLineChart;
