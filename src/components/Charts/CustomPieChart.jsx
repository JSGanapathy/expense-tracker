/*
 * File         : CustomPieChart.jsx
 * Author       : Ganapathy
 * Description  : CustomPieChart component displays a pie chart with custom tooltip.
 */

import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegent from "./CustomLegent";

// CustomPieChart component
const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey={"amount"}
          nameKey={"name"}
          cx={"50%"}
          cy={"50%"}
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell_${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegent} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize={"14px"}
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize={"24px"}
              fontWeight={"semi-bold"}
            >
              {label}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

// export the CustomPieChart component
export default CustomPieChart;
