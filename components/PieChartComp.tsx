"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

interface PieChartProps {
  appData: { statusName: string; value: number }[];
}

const COLORS = {
  applied: "#8884d8",
  interview: "#82ca9d",
  offer: "#ffc658",
  rejected: "#ff4d4f",
  pending: "#a4de6c",
};

const PieChartComp: React.FC<PieChartProps> = ({ appData }) => {

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
          stroke="#fff"
          strokeWidth={1}
          label
        >
          {appData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.statusName] || COLORS.pending}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComp;
