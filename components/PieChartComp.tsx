"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface PieChartProps {
  appData: { statusName: string; value: number }[];
}

const PieChartComp: React.FC<PieChartProps> = ({ appData }) => {
  console.log(appData);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Tooltip />
        <Pie
          data={appData}
          dataKey="value"
          nameKey="statusName"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          stroke="#fff"
          strokeWidth={2}
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComp;
