"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { placeholderMonths } from "@/lib/helper";

interface LineChartProps {
  // the sructure of the data is an array of objects with month and count
  // it will be in an array of objects where month is the key and count is the value
  /* 
  {
  'aug': 2,
  }
  */
  appData: { month: string; count: number }[];
}

const LineChartComp: React.FC<LineChartProps> = ({ appData }) => {
  return (
    <ResponsiveContainer width="100%" height={480}>
      <LineChart
        data={placeholderMonths(appData)}
        margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
      >
        <XAxis dataKey="month" style={{ fontSize: "14px" }} />
        <YAxis style={{ fontSize: "14px" }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          strokeWidth={4}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComp;
