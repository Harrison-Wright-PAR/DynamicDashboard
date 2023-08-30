import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import Box from "@mui/material/Box";

const data = [
  { name: "Rating 1", value: 100 },
  { name: "Rating 2", value: 200 },
  { name: "Rating 3", value: 200 },
  { name: "Rating 4", value: 300 },
  { name: "Rating 5", value: 400 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF3042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function CustomerRatingsReport() {
  return (
    <Box sx={{ width: "700px" }}>
      <h1>Customer Ratings</h1>
      <PieChart width={600} height={600}>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </Box>
  );
}